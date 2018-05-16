package com.intetm.util.entity;

import java.util.Map;

public class EditResult<T> {
    public T id;
    public boolean success;
    public String error;
    public Map<T, EditResult<T>> subResult;

    public EditResult() {
    }

    public EditResult(T id) {
        this.id = id;
        this.success = true;
    }
}
