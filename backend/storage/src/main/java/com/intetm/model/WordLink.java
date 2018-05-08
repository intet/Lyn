package com.intetm.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "word_link")
public class WordLink {
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "word_link_from",
            joinColumns = @JoinColumn(name = "link_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "word_id", referencedColumnName = "id"))
    public List<Word> from;
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "word_link_to",
            joinColumns = @JoinColumn(name = "link_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "word_id", referencedColumnName = "id"))
    public List<Word> to;
    @Column(name = "type")
    public WordType type;
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
