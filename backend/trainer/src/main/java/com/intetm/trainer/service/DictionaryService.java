package com.intetm.trainer.service;

import com.intetm.model.Dictionary;
import com.intetm.model.Word;
import com.intetm.repository.DictionaryRepository;
import com.intetm.trainer.dao.WordDao;
import com.intetm.trainer.rest.wrapper.AttemptRequest;
import com.intetm.trainer.rest.wrapper.LinkRequest;
import com.intetm.trainer.rest.wrapper.WordRequest;
import com.intetm.util.entity.EditResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
public class DictionaryService {
    @Autowired
    public WordDao wordDao;

    @Autowired
    public DictionaryRepository dictionaryRepository;

    public Map<Long, EditResult<Long, Object>> addLink(LinkRequest linkRequest) {
        Map<Long, EditResult<Long, Object>> wordResult = new HashMap<>();
        for (WordRequest word : linkRequest.from) {
            word.id = wordDao.saveWord(linkRequest.dictionary, word);
            wordResult.put(word.transportId, new EditResult<>(word.id));
        }
        for (WordRequest word : linkRequest.to) {
            word.id = wordDao.saveWord(linkRequest.dictionary, word);
            wordResult.put(word.transportId, new EditResult<>(word.id));
        }

        linkRequest.id = wordDao.saveLink(linkRequest);
        return wordResult;
    }

    public Dictionary getDefaultDictionary(String username) {
        return dictionaryRepository.findByUserName(username).get(0);
    }

    public Word syncAttempts(AttemptRequest attemptRequest, String userName) {
        return wordDao.syncAttempts(attemptRequest.id, attemptRequest.countSuccess, attemptRequest.countFail, userName);
    }
}
