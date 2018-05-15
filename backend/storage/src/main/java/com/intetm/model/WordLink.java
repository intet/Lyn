package com.intetm.model;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "word_link")
public class WordLink {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToMany(fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    @JoinTable(name = "word_link_to",
            joinColumns = @JoinColumn(name = "link_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "word_id", referencedColumnName = "id"))
    public List<Word> to;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "word_link_from",
            joinColumns = @JoinColumn(name = "link_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "word_id", referencedColumnName = "id"))
    public List<Word> from;

    @Column(name = "type")
    public WordType type;
}
