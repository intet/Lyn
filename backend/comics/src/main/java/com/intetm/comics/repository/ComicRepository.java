package com.intetm.comics.repository;

import com.intetm.comics.model.Comic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComicRepository extends JpaRepository<Comic, Long> {
    Comic findByName(String name);
}

