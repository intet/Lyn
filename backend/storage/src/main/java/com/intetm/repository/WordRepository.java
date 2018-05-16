package com.intetm.repository;

import com.intetm.model.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface WordRepository extends JpaRepository<Word, Long> {
    @Query("select w from Word w where w.language.id = :language and w.dictionary.id = :dictionary " +
            " and w.ltext = :text")
    Word find(@Param("dictionary") Long dictionary, @Param("language") Long language, @Param("text") String lText);
}

