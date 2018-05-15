package com.intetm.trainer.rest;

import com.intetm.model.Dictionary;
import com.intetm.trainer.rest.wrapper.LinkRequest;
import com.intetm.trainer.service.DictionaryService;
import com.intetm.util.entity.EditMode;
import com.intetm.util.entity.EditResult;
import com.intetm.util.entity.ResponseEditWrapper;
import com.intetm.util.entity.ResponsePagingWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

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
    public ResponsePagingWrapper<Dictionary> dictionary(UserDetails userDetails, UriComponentsBuilder ucBuilder) {
        return null;
        //   return dictionaryService.getAll(userDetails.getUsername());
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
    public ResponseEditWrapper<Long> saveLinks(@RequestBody LinkRequest[] linkRequests) {
        ResponseEditWrapper<Long> response = new ResponseEditWrapper<>();
        for (LinkRequest linkRequest : linkRequests) {
            try {
                if (linkRequest.mode == EditMode.ADD || linkRequest.mode == EditMode.EDIT) {
                    Map<Long, EditResult<Long>> wordResult = dictionaryService.addLink(linkRequest);
                    response.putSuccess(linkRequest.transportId, linkRequest.id, wordResult);
                }
            } catch (Exception ex) {
                response.putError(linkRequest.id, ex.getMessage());
            }
        }
        return response;
    }
}
