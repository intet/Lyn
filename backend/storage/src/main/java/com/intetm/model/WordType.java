package com.intetm.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum WordType {
    NOUN,//Существительное
    VERB,//Глагол
    ADJECTIVE, //Прилагательное
    ADVERB, //Наречие
    PRONOUN, //Местоимение
    NUMERAL, //Числительное
    PARTICIPLE; //Причастие

    @JsonCreator
    public static WordType fromString(String key) {
        return key == null
                ? null
                : WordType.valueOf(key.toUpperCase());
    }

    @JsonValue
    public String getKey() {
        return this.name().toLowerCase();
    }
}
