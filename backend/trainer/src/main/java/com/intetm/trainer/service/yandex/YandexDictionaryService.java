package com.intetm.trainer.service.yandex;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.intetm.model.WordType;
import com.intetm.trainer.service.yandex.entity.Def;
import com.intetm.trainer.service.yandex.entity.DicResult;
import com.intetm.trainer.service.yandex.entity.Tr;
import com.intetm.trainer.service.yandex.entity.TranslateResult;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.Response;
import java.net.URI;
import java.util.*;

@Service

public class YandexDictionaryService {
    private static final String API_URL_D = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup";
    private static final String API_URL_T = "https://translate.yandex.net/api/v1.5/tr.json/translate";
    @Value("${yandex.dictionary.key}")
    private String keyD;

    @Value("${yandex.translate.key}")
    private String keyT;

    public Map<WordType, List<String>> translate(String from) throws Exception {
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {

            DicResult dicResult = getDict(from, httpClient);
            if (dicResult.def.length > 0)
                return convertDictResult(dicResult);
            else {
                return getTranslate(from, httpClient);
            }
        }

    }


    private DicResult getDict(String from, CloseableHttpClient httpClient) throws Exception {
        URI uri = new URIBuilder(API_URL_D)
                .addParameter("key", keyD)
                .addParameter("lang", "en-ru")
                .addParameter("text", from)
                .build();
        HttpPost put = new HttpPost(uri);
        CloseableHttpResponse response = httpClient.execute(put);
        if (Response.Status.OK.getStatusCode() != response.getStatusLine().getStatusCode()) {
            throw new Exception("Не удалось получить слово");
        }
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return mapper.readValue(response.getEntity().getContent(), DicResult.class);
    }

    private Map<WordType, List<String>> convertDictResult(DicResult dicResult) {
        Map<WordType, List<String>> result = new HashMap<>();
        for (Def def : dicResult.def) {
            if (def.pos == null) continue;
            List<String> words = result.get(def.pos);
            if (words == null) {
                words = new ArrayList<>();
                result.put(def.pos, words);
            }
            for (Tr tr : def.tr) {
                words.add(tr.text);
            }
        }
        return result;
    }

    private Map<WordType, List<String>> getTranslate(String from, CloseableHttpClient httpClient) throws Exception {
        URI uri = new URIBuilder(API_URL_T)
                .addParameter("key", keyT)
                .addParameter("lang", "en-ru")
                .addParameter("text", from)
                .build();
        HttpPost put = new HttpPost(uri);
        CloseableHttpResponse response = httpClient.execute(put);
        if (Response.Status.OK.getStatusCode() != response.getStatusLine().getStatusCode()) {
            throw new Exception("Не удалось получить слово");
        }
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        TranslateResult tr = mapper.readValue(response.getEntity().getContent(), TranslateResult.class);
        Map<WordType, List<String>> result = new HashMap<>();
        result.put(WordType.NOUN, Arrays.asList(tr.text));
        return result;
    }
}
