package com.intetm.comics.model;

import javax.persistence.*;

@Entity
@Table(name = "comic_page")
public class Page {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne()
    @JoinColumn(name = "comic", referencedColumnName = "id")
    public Comic comic;

    @Column(name = "index")
    public int index;

    @Column(name = "url")
    public String url;


    public Page() {
    }

    public Page(Long id) {
        this.id = id;
    }
}
