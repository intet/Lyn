package com.intetm.trainer.service;

import com.intetm.model.Dictionary;
import com.intetm.repository.DictionaryRepository;
import com.intetm.util.entity.ResponsePagingWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DictionaryService {

    @Autowired
    DictionaryRepository dictionaryRepository;

    public ResponsePagingWrapper<Dictionary> getAll(String username) {
        long total = dictionaryRepository.countByUserName(username);
        List<Dictionary> rows = dictionaryRepository.findByUserName(username);
        return new ResponsePagingWrapper<>(rows, total);
    }
}
