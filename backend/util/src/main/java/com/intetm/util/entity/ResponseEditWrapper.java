package com.intetm.util.entity;

import java.util.HashMap;
import java.util.Map;

public class ResponseEditWrapper<T> {
    Map<T, EditResult<T>> rows = new HashMap<>();

    public void putSuccess(T externalKey, T internalKey) {
        putSuccess(externalKey, internalKey, null);
    }

    public void putSuccess(T externalKey, T internalKey, Map<T, EditResult<T>> subResult) {
        EditResult<T> result = new EditResult<T>();
        result.id = internalKey;
        result.success = true;
        result.subResult = subResult;
        rows.put(externalKey, result);
    }

    public void putError(T externalKey, String error) {
        EditResult<T> result = new EditResult<T>();
        result.error = error;
        result.success = false;
        rows.put(externalKey, result);
    }
}
