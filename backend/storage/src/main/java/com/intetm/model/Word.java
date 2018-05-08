package com.intetm.model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "WORD")
public class Word {
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
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "language", referencedColumnName = "id")
    private Language language;
    @Column
    private String text;
}
