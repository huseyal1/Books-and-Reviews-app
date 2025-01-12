package ctu.fit.tjv.semester_work.model ;

import jakarta.persistence.* ;

@Entity
public class Review {

    /* Fields : */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long review_id ;

    private String rating ;
    private String comment ;
    private String date ;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book reviewed_book ;

    /* Constructors : */

    public Review() {
        // Default constructor.
    }

    public Review(String rating, String comment, String date, Book reviewed_book) {
        this.comment = comment ;
        this.date = date ;
        this.reviewed_book = reviewed_book ;
        this.rating = rating ;
    }

    /* Getters and Setters */

    public Long getReview_id() {
        return review_id ;
    }

    public void setReview_id(Long newReview_id) {
        this.review_id = newReview_id ;
    }

    public String getComment() {
        return comment ;
    }

    public void setComment(String newComment) {
        this.comment = newComment ;
    }

    public String getRating() {
        return rating ;
    }

    public void setRating(String newRating) {
        this.rating = newRating ;
    }

    public String getDate() {
        return date ;
    }

    public void setDate(String newDate) {
        this.date = newDate ;
    }

    public Book getReviewed_book() {
        return reviewed_book ;
    }

    public void setReviewed_book(Book newReviewed_book) {
        this.reviewed_book = newReviewed_book ;
    }

}