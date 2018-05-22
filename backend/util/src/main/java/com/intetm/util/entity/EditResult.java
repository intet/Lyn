package com.intetm.util.entity;

import java.util.Map;

public class EditResult<T, P> {
    public T id;
    public boolean success;
    public String error;
    public Map<T, EditResult<T, P>> subResult;
    public P info;

    public EditResult() {
    }

    public EditResult(T id) {
        this.id = id;
        this.success = true;
    }
}
