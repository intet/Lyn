package com.intetm.model;

import javax.persistence.*;

@Entity
@Table(name = "Language")
public class Language {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "code")
    public String code;

    @Column(name = "name")
    public String name;
}
