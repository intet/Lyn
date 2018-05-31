package com.intetm.comics.resolver;

import com.intetm.comics.model.Comic;
import com.intetm.comics.model.Page;
import com.intetm.comics.repository.ComicRepository;
import com.intetm.comics.repository.PageRepository;
import org.apache.commons.io.IOUtils;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.cookie.BasicClientCookie;
import org.apache.http.message.BasicNameValuePair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.Response;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;


@Service
public class ComicsPageUrlResolver {


    public static final String URL = "https://acomics.ru/comics?categories=&ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3&ratings%5B%5D=4&ratings%5B%5D=5&ratings%5B%5D=6&type=0&updatable=0&subscribe=0&issue_count=2&sort=last_update";
    public static final int MAX_DEPTH = 1500;
    public static final int PAGE_SIZE = 10;

    Logger LOG = LoggerFactory.getLogger(ComicsPageUrlResolver.class);

    @Autowired
    ComicRepository comicRepository;

    @Autowired
    PageRepository pageRepository;


    public void updatePageUrls() throws Exception {
        BasicCookieStore cookieStore = new BasicCookieStore();
        BasicClientCookie cookie = new BasicClientCookie("1", "1");
        cookie.setDomain("acomics.ru");
        cookie.setAttribute("ageRestrict", "17");
        cookieStore.addCookie(cookie);
        try (CloseableHttpClient httpClient = HttpClientBuilder.create().setDefaultCookieStore(cookieStore).build()) {
            List<Comic> list = comicRepository.findAll();
            for (Comic comic : list) {
                if (comic.expectedCount != comic.pageCount) {
                    loadAllPage(comic, httpClient);
                }
            }
        }
    }

    private void loadAllPage(Comic comic, CloseableHttpClient httpClient) throws Exception {
        if (comic.expectedCount > comic.pageCount) {
            LOG.info("Загружаем страницы комикса {} с {} по {}", comic.name, comic.pageCount, comic.expectedCount);
            for (int i = comic.pageCount; i < comic.expectedCount; i++) {
                String pageHtml = loadPage(comic.url, i, httpClient);
                parsePage(comic, i, pageHtml);

                if (i % 50 == 0) {
                    int time = ThreadLocalRandom.current().nextInt(2, 8);
                    LOG.info("Загружено {} страниц комикса {}. Спим {} секунд", i, comic.name, time);
                    Thread.sleep(time);
                }
            }
            comic.pageCount = comic.expectedCount;
            comicRepository.save(comic);
        }
    }

    private String loadPage(String url, int pageIndex, CloseableHttpClient httpClient) throws Exception {
        url = url + "/" + (pageIndex + 1);
        URI uri = new URIBuilder(url).build();
        HttpGet get = new HttpGet(uri);
        try (CloseableHttpResponse response = httpClient.execute(get)) {
            if (Response.Status.OK.getStatusCode() != response.getStatusLine().getStatusCode()) {
                throw new Exception("Не закончились страницы");
            }
            String string = IOUtils.toString(response.getEntity().getContent(), "UTF-8");

            if (string.indexOf("mainImage") != -1)
                return string;
        }

        HttpPost post = new HttpPost(uri);
        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("ageRestrict", "17"));
        post.setEntity(new UrlEncodedFormEntity(params));
        try (CloseableHttpResponse response = httpClient.execute(post)) {
            if (Response.Status.OK.getStatusCode() != response.getStatusLine().getStatusCode()) {
                throw new Exception("Не закончились страницы");
            }
            return IOUtils.toString(response.getEntity().getContent(), "UTF-8");

        }

    }

    private void parsePage(Comic comic, int i, String pageHtml) {
        pageHtml = pageHtml.substring(pageHtml.indexOf("mainImage"));
        pageHtml = pageHtml.substring(pageHtml.indexOf("src=\"") + 5);
        String imgUrl = pageHtml.substring(0, pageHtml.indexOf("\""));


        Page page = pageRepository.findByIndexAndComic(i, comic);
        if (page == null) {
            page = new Page();
            page.index = i;
            page.comic = comic;
        }
        page.url = imgUrl;
        pageRepository.save(page);
    }

}
