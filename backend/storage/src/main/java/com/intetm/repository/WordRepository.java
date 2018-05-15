package com.intetm.repository;

import com.intetm.model.Word;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordRepository extends JpaRepository<Word, Long> {
  /*  @Query("select w from Word w where w.language.id = :language and w.dictionary.id = :dictionary " +
            " and w.ltext = :text")*/
  Word findByDictionaryAndLanguageAndLtext(Long dictionary, Long language, String lText);
}

