package com.intetm.model;

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

    @ManyToOne
    @JoinColumn(name = "user", referencedColumnName = "id")
    public User user;

    @ManyToOne
    @JoinColumn(name = "from_language", referencedColumnName = "id")
    public Language languageFrom;

    @ManyToOne
    @JoinColumn(name = "to_language", referencedColumnName = "id")
    public Language languageTo;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "word_link_dictionary",
            joinColumns = @JoinColumn(name = "dictionary_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "link_id", referencedColumnName = "id"))
    public List<WordLink> words;
}