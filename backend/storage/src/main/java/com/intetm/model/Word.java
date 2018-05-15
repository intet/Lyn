package com.intetm.model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "WORD")
public class Word {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column
    public String text;

    @Column
    public String ltext;

    @ManyToOne
    @JoinColumn(name = "language", referencedColumnName = "id")
    public Language language;

    @ManyToOne
    @JoinColumn(name = "dictionary", referencedColumnName = "id")
    public Dictionary dictionary;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "from")
    public List<WordLink> from;
    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "to")
    public List<WordLink> to;
    @Column(name = "count_attempts")
    public int countAttempts;
    @Column(name = "count_success")
    public int countSuccess;
    @Column(name = "count_fail")
    public int countFail;
    @Column(name = "created")
    public Date created;
    @Column(name = "last_attempt")
    public Date lastAttempt;
    @Column(name = "last_success")
    public Date lastSuccess;

    public Word() {
    }

    public Word(Long id) {
        this.id = id;
    }

}
