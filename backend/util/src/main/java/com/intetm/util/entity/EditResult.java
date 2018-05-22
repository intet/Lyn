package com.intetm.util.entity;

import com.google.gson.annotations.Expose;

import java.util.Map;

public class EditResult<T, P> {
    @Expose
    public T id;
    @Expose
    public boolean success;
    @Expose
    public String error;
    @Expose
    public Map<T, EditResult<T, P>> subResult;
    @Expose
    public P info;

    public EditResult() {
    }

    public EditResult(T id) {
        this.id = id;
        this.success = true;
    }
}
