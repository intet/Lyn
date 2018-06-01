package com.intetm.security.service;

import com.intetm.model.User;
import com.intetm.security.model.UserRequest;

import java.util.List;

public interface UserService {
  void resetCredentials();

  User findById(Long id);

  User findByUsername(String username);

  List<User> findAll();

  User save(UserRequest user);
}
