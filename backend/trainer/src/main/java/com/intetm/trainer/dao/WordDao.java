package com.intetm.trainer.dao;

import com.intetm.model.*;
import com.intetm.repository.DictionaryRepository;
import com.intetm.repository.WordLinkRepository;
import com.intetm.repository.WordRepository;
import com.intetm.trainer.rest.wrapper.LinkRequest;
import com.intetm.trainer.rest.wrapper.WordRequest;
import com.intetm.util.entity.ResponsePagingWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WordDao {

    @Autowired
    DictionaryRepository dictionaryRepository;

    @Autowired
    WordRepository wordRepository;

    @Autowired
    WordLinkRepository wordLinkRepository;

    public ResponsePagingWrapper<Dictionary> getAll(String username) {
        long total = dictionaryRepository.countByUserName(username);
        List<Dictionary> rows = dictionaryRepository.findByUserName(username);
        return new ResponsePagingWrapper<>(rows, total);
    }

    public Long saveWord(Long dictionary, WordRequest request) {
        String text = request.text.trim();
        String lText = text.toLowerCase();
        Word word = wordRepository.find(dictionary, request.language, lText);
        if (word != null) {
            if (word.text.equals(text)) {
                return word.id;
            } else {
                word.text = text;
                return wordRepository.save(word).id;
            }
        }
        word = new Word();
        word.text = text;
        word.ltext = lText;

        word.language = new Language();
        word.language.id = request.language;

        word.dictionary = new Dictionary();
        word.dictionary.id = dictionary;

        word.created = new Date();

        return wordRepository.save(word).id;
    }

    public Long saveLink(LinkRequest linkRequest) {
        WordLink link;
        if (linkRequest.id != null) {
            link = wordLinkRepository.findOne(linkRequest.id);
        } else {
            link = new WordLink();
            link.type = WordType.NOUN;
        }
        link.from = new ArrayList<>();
        link.to = new ArrayList<>();
        for (WordRequest w : linkRequest.from) {
            link.from.add(new Word(w.id));
        }
        for (WordRequest w : linkRequest.to) {
            link.to.add(new Word(w.id));
        }
        link.dictionary = new Dictionary(linkRequest.dictionary);
        return wordLinkRepository.save(link).id;
    }
}
