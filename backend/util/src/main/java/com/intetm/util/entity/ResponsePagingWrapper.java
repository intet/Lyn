package com.intetm.util.entity;

import java.util.List;

public class ResponsePagingWrapper<T> {
    long total;
    List<T> rows;

    public ResponsePagingWrapper(List<T> rows, long total) {
        this.rows = rows;
        this.total = total;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public List<T> getRows() {
        return rows;
    }

    public void setRows(List<T> rows) {
        this.rows = rows;
    }
}
