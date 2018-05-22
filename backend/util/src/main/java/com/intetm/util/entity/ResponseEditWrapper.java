package com.intetm.util.entity;

import java.util.HashMap;
import java.util.Map;

public class ResponseEditWrapper<T, P> {
    Map<T, EditResult<T, P>> rows = new HashMap<>();

    public void putSuccess(T externalKey, T internalKey) {
        putSuccess(externalKey, internalKey, null, null);
    }

    public void putSuccess(T externalKey, T internalKey, P info) {
        putSuccess(externalKey, internalKey, info, null);
    }

    public void putSuccess(T externalKey, T internalKey, P info, Map<T, EditResult<T, P>> subResult) {
        EditResult<T, P> result = new EditResult<>();
        result.id = internalKey;
        result.success = true;
        result.subResult = subResult;
        result.info = info;
        rows.put(externalKey, result);
    }

    public void putError(T externalKey, String error) {
        EditResult<T, P> result = new EditResult<>();
        result.error = error;
        result.success = false;
        rows.put(externalKey, result);
    }
}
