package com.intetm.trainer.rest;

import com.intetm.model.Dictionary;
import com.intetm.trainer.rest.wrapper.LinkRequest;
import com.intetm.trainer.service.DictionaryService;
import com.intetm.util.entity.ResponsePagingWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Created by fan.jin on 2016-10-15.
 */

@RestController
@RequestMapping(value = "/api/trainer", produces = MediaType.APPLICATION_JSON_VALUE)
public class TrainerController {

    @Autowired
    private DictionaryService dictionaryService;
/*

  @RequestMapping(method = GET, value = "/user/{userId}")
  public User loadById(@PathVariable Long userId) {
    return this.userService.findById(userId);
  }*/


    @RequestMapping(method = POST, value = "/dictionary")
    public ResponsePagingWrapper<Dictionary> addUser(UserDetails userDetails, UriComponentsBuilder ucBuilder) {
        return dictionaryService.getAll(userDetails.getUsername());
/*    User existUser = this.userService.findByUsername(userRequest.getUsername());
    if (existUser != null) {
      throw new ResourceConflictException(userRequest.getId(), "Username already exists");
    }
    User user = this.userService.save(userRequest);
    HttpHeaders headers = new HttpHeaders();
    headers.setLocation(ucBuilder.path("/api/user/{userId}").buildAndExpand(user.getId()).toUri());
    return new ResponseEntity<User>(user, HttpStatus.CREATED);*/
    }

    @RequestMapping(method = POST, value = "/saveLinks")
    public void saveLinks(@RequestBody LinkRequest[] linkRequests) {
        System.out.print(linkRequests.length);
    }
}
