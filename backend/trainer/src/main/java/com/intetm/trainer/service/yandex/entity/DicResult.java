package com.intetm.trainer.service.yandex.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DicResult {
    public Def[] def;
}
