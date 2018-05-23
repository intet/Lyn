package com.intetm.trainer.service;

import com.intetm.model.WordType;
import com.intetm.trainer.service.yandex.YandexDictionaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TranslateService {
    @Autowired
    private YandexDictionaryService yandexDictionaryService;

    public Map<WordType, List<String>> translate(String from, String userName) throws Exception {
        return yandexDictionaryService.translate(from);
    }
}
