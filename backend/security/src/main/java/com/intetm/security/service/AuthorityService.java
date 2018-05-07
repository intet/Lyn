package com.intetm.security.service;

import com.intetm.model.Authority;

import java.util.List;

public interface AuthorityService {
  List<Authority> findById(Long id);

  List<Authority> findByname(String name);

}
