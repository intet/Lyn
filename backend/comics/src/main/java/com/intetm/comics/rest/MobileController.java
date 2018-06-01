package com.intetm.comics.rest;

import com.intetm.comics.model.Comic;
import com.intetm.comics.repository.ComicRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping(value = "/mobile/api/comics", produces = MediaType.APPLICATION_JSON_VALUE)
public class MobileController {
    private static final Logger LOG = LoggerFactory.getLogger(MobileController.class);
    @Autowired
    private ComicRepository comicRepository;

    @RequestMapping(method = GET, value = "/comics")
    public List<Comic> comics() throws Exception {
        return comicRepository.findAll();
    }


}
