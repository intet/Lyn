package com.intetm.comics.rest;

import com.intetm.comics.resolver.ComicsPageUrlResolver;
import com.intetm.comics.resolver.ComicsUrlResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Created by fan.jin on 2016-10-15.
 */

@RestController
@RequestMapping(value = "/api/comics", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
public class ComicController {
    private static final Logger LOG = LoggerFactory.getLogger(ComicController.class);
    @Autowired
    private ComicsUrlResolver comicsUrlResolver;
    @Autowired
    private ComicsPageUrlResolver comicsPageUrlResolver;

    @RequestMapping(method = POST, value = "/updateUrls")
    @PreAuthorize("hasRole('ADMIN')")
    public String updateUrls() throws Exception {
        comicsUrlResolver.updateUrls();
        comicsPageUrlResolver.updatePageUrls();
        return null;
    }

}
