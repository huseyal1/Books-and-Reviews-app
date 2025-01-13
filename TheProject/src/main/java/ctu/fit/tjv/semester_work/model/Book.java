package ctu.fit.tjv.semester_work.model ;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Book {

    /* Fields : */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long book_id ;

    private String title ;
    private String author ;
    private Integer publication_year ;
    private String description ;
    private String category_name ;

    @Column(unique = true)
    private Long ISBN ;

    @OneToMany(mappedBy = "reviewed_book", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviewList = new ArrayList<>() ;

    /* Constructors : */

    public Book() {
        // Default constructor.
    }

    public Book(String title, String author, Integer publication_year,
                String description, String category_name, Long ISBN, List<Review> reviewList) {

        this.title = title ;
        this.author = author ;
        this.publication_year = publication_year ;
        this.description = description ;
        this.category_name = category_name ;
        this.ISBN = ISBN ;
        this.reviewList = reviewList ;
    }

    /* Getters and Setters for each field : */

    public Long getBook_id() {
        return book_id ;
    }

    public void setBook_id(Long newBook_id) {
        this.book_id = newBook_id ;
    }

    public String getTitle() {
        return title ;
    }

    public void setTitle(String newTitle) {
        this.title = newTitle ;
    }

    public String getAuthor() {
        return author ;
    }

    public void setAuthor(String newAuthor) {
        this.author = newAuthor ;
    }

    public Integer getPublication_year() {
        return publication_year ;
    }

    public void setPublication_year(Integer newPublication_year) {
        this.publication_year = newPublication_year ;
    }


    public String getDescription() {
        return description ;
    }

    public void setDescription(String newDescription) {
        this.description = newDescription ;
    }

    public String getCategory_name() {
        return category_name ;
    }

    public void setCategory_name(String newCategory_name) {
        this.category_name = newCategory_name ;
    }

    public Long getISBN() {
        return ISBN ;
    }

    public void setISBN(Long newISBN) {
        this.ISBN = newISBN ;
    }

    public List<Review> getReviewList() {
        return reviewList;
    }

    public void setReviewList(List<Review> newReviewList) {
        this.reviewList = newReviewList;
    }
}