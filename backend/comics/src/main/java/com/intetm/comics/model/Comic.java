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

    @Column(name = "name", nullable = false)
    public String name;

    @Column(name = "about", nullable = false)
    public String about;

    @Column(name = "url", nullable = false)
    public String url;

    @Column(name = "img_url", nullable = false)
    public String imgUrl;

    @Column(name = "page_count", nullable = false)
    public int pageCount;

    @Column(name = "expected_count", nullable = false)
    public int expectedCount;

    @OneToMany(mappedBy = "comic", fetch = FetchType.LAZY)
    public List<Page> pages;

    public Comic() {
    }

    public Comic(Long id) {
        this.id = id;
    }
}
