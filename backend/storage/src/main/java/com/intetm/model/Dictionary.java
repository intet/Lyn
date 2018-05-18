package com.intetm.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "dictionary")
public class Dictionary {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "name")
    public String name;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user", referencedColumnName = "id")
    @Fetch(FetchMode.SELECT)
    public User user;

    @ManyToOne
    @JoinColumn(name = "from_language", referencedColumnName = "id")
    public Language languageFrom;

    @ManyToOne
    @JoinColumn(name = "to_language", referencedColumnName = "id")
    public Language languageTo;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "dictionary")
    public List<WordLink> words;

    public Dictionary() {
    }

    public Dictionary(Long id) {
        this.id = id;
    }
}
