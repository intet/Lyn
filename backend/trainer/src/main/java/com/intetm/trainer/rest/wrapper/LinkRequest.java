package com.intetm.trainer.rest.wrapper;

import com.intetm.util.entity.EditMode;

public class LinkRequest extends EntityRequest {
    public EditMode mode;
    public Long dictionary;
    public WordRequest[] from;
    public WordRequest[] to;
    public LinkRequest() {

    }
}
