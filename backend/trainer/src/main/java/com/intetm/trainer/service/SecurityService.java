package com.intetm.trainer.service;

import com.intetm.repository.DictionaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SecurityService {
    @Autowired
    public DictionaryRepository dictionaryRepository;

    public boolean checkAccess(String username, Long dicId) {
        return dictionaryRepository.existByUserAndId(username, dicId);
    }
}
