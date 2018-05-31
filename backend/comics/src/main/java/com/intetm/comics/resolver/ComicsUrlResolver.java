package com.intetm.comics.resolver;

import com.intetm.comics.model.Comic;
import com.intetm.comics.repository.ComicRepository;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.Response;
import java.net.URI;


@Service
public class ComicsUrlResolver {


    public static final String URL = "https://acomics.ru/comics?categories=&ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3&ratings%5B%5D=4&ratings%5B%5D=5&ratings%5B%5D=6&type=0&updatable=0&subscribe=0&issue_count=2&sort=last_update";
    public static final int MAX_DEPTH = 1500;
    public static final int PAGE_SIZE = 10;

    @Autowired
    ComicRepository comicRepository;

    public String updateUrls() throws Exception {
        updateAll();
        return null;
    }

    public String updateAll() throws Exception {
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            loadAllComics(httpClient);
        }
        return null;
    }

    private void loadAllComics(CloseableHttpClient httpClient) throws Exception {
        for (int i = 0; (i * PAGE_SIZE) < MAX_DEPTH; i++) {
            String content = loadPage(httpClient, i);
            while (content.indexOf("catalog-elem list-loadable") != -1) {
                content = content.substring(content.indexOf("<table class=\"catalog-elem list-loadable\">"));
                int finishIndex = content.indexOf("</table>") + 8;
                String comicPage = content.substring(0, finishIndex);
                Comic comic = parsePage(comicPage);
                comicRepository.save(comic);
                content = content.substring(finishIndex);
            }
        }
    }


    private String loadPage(CloseableHttpClient httpClient, int pageIndex) throws Exception {
        URI uri = new URIBuilder(URL)
                .addParameter("skip", Integer.toString(pageIndex * 10))
                .build();
        HttpPost put = new HttpPost(uri);
        CloseableHttpResponse response = httpClient.execute(put);
        if (Response.Status.OK.getStatusCode() != response.getStatusLine().getStatusCode()) {
            throw new Exception("Не ожиданно закончились комиксы");
        }
        return org.apache.commons.io.IOUtils.toString(response.getEntity().getContent(), "UTF-8");
    }

    private Comic parsePage(String comicPage) {
        comicPage = comicPage.substring(comicPage.indexOf("src=\"") + 5);
        String imgUrl = comicPage.substring(0, comicPage.indexOf("\""));
        comicPage = comicPage.substring(comicPage.indexOf("href=\"") + 6);
        String url = comicPage.substring(0, comicPage.indexOf("\""));
        comicPage = comicPage.substring(comicPage.indexOf("title=\"") + 7);
        comicPage = comicPage.substring(comicPage.indexOf(">") + 1);
        String name = comicPage.substring(0, comicPage.indexOf("<"));
        comicPage = comicPage.substring(comicPage.indexOf("\"about\">") + 8);
        String about = comicPage.substring(0, comicPage.indexOf("</div>")).trim();

        comicPage = comicPage.substring(comicPage.indexOf("\"total\">") + 8);
        String expectedCount = comicPage.substring(0, comicPage.indexOf(" "));


        Comic comic = comicRepository.findByName(name);
        if (comic == null) {
            comic = new Comic();
            comic.name = name;
            comic.pageCount = 0;
        }
        comic.about = about;
        comic.url = url;
        comic.imgUrl = imgUrl;
        comic.expectedCount = Integer.getInteger(expectedCount);
        return comic;
    }

}
