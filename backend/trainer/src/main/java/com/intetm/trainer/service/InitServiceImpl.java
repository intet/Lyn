package com.intetm.trainer.service;

import com.intetm.model.Dictionary;
import com.intetm.model.LanguageCode;
import com.intetm.model.User;
import com.intetm.repository.DictionaryRepository;
import com.intetm.repository.LanguageRepository;
import com.intetm.security.rest.InitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InitServiceImpl implements InitService {
    @Autowired
    private DictionaryRepository dictionaryRepository;

    @Autowired
    private LanguageRepository languageRepository;

    @Override
    public void initUser(User user) {
        Dictionary dictionary = new Dictionary();
        dictionary.user = user;
        dictionary.name = "Общий";
        dictionary.languageFrom = languageRepository.findByCode(LanguageCode.RUS.name());
        dictionary.languageTo = languageRepository.findByCode(LanguageCode.ENG.name());
        dictionaryRepository.save(dictionary);
    }
}
