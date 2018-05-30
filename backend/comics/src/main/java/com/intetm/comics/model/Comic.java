package com.intetm.comics.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "comic")
public class Comic {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "name")
    public String name;

    @Column(name = "url")
    public String url;

    @Column(name = "page_count")
    public int pageCount;

    @OneToMany(mappedBy = "comic")
    public List<Page> pages;

    public Comic() {
    }

    public Comic(Long id) {
        this.id = id;
    }
}
