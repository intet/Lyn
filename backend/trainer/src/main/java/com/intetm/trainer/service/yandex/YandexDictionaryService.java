package com.intetm.trainer.service.yandex;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.intetm.model.WordType;
import com.intetm.trainer.service.yandex.entity.Def;
import com.intetm.trainer.service.yandex.entity.DicResult;
import com.intetm.trainer.service.yandex.entity.Tr;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.Response;
import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service

public class YandexDictionaryService {
    private static final String API_URL = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup";
    @Value("${yandex.dictionary.key}")
    private String key;

    public Map<WordType, List<String>> translate(String from) throws Exception {
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {

            URI uri = new URIBuilder(API_URL)
                    .addParameter("key", key)
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
            DicResult dicResult = mapper.readValue(response.getEntity().getContent(), DicResult.class);

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

    }
}
