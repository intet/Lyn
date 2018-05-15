package com.intetm.repository;

import com.intetm.model.Dictionary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DictionaryRepository extends JpaRepository<Dictionary, Long> {
    @Query("select count(1) from Dictionary d join d.user u where u.username = :name")
    long countByUserName(@Param("name") String userName);

    @Query("select d from Dictionary d join d.user u where u.username = :name")
    List<Dictionary> findByUserName(@Param("name") String userName);

    @Query("select count(d.id)> 0 from Dictionary d join d.user u where u.username = :user and d.id = :dict ")
    boolean existByUserAndId(@Param("user") String userName, @Param("dict") Long id);
}

