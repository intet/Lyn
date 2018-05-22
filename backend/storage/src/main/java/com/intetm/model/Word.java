package com.intetm.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.annotations.Expose;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "WORD")
public class Word {

    @Id
    @Expose
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column
    @Expose
    public String text;

    @JsonIgnore
    @Column
    public String ltext;

    @ManyToOne
    @JoinColumn(name = "language", referencedColumnName = "id")
    public Language language;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "dictionary", referencedColumnName = "id")
    public Dictionary dictionary;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "from")
    public List<WordLink> from;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "to")
    public List<WordLink> to;
    @Column(name = "count_attempts")
    @Expose
    public int countAttempts;
    @Column(name = "count_success")
    @Expose
    public int countSuccess;
    @Column(name = "count_fail")
    @Expose
    public int countFail;
    @Column(name = "created")
    @Expose
    public Date created;
    @Column(name = "last_attempt")
    @Expose
    public Date lastAttempt;
    @Column(name = "last_success")
    @Expose
    public Date lastSuccess;

    public Word() {
    }

    public Word(Long id) {
        this.id = id;
    }

}
