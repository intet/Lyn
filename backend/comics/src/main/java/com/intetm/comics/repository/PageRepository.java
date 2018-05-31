package com.intetm.comics.repository;

import com.intetm.comics.model.Comic;
import com.intetm.comics.model.Page;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PageRepository extends JpaRepository<Page, Long> {

    Page findByIndexAndComic(int index, Comic comic);
}

