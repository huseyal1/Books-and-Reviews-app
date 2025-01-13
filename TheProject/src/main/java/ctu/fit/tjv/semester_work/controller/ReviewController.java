package ctu.fit.tjv.semester_work.controller ;

import ctu.fit.tjv.semester_work.model.Review ;
import ctu.fit.tjv.semester_work.service.ReviewService ;
import org.springframework.beans.factory.annotation.Autowired ;
import org.springframework.web.bind.annotation.* ;
import java.util.List ;
import java.util.Optional ;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService ;

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews() ;
    }

    @GetMapping("/{id}")
    public Optional<Review> getReviewById(@PathVariable Long id) {
        return reviewService.getReviewById(id) ;
    }

    @GetMapping("/book/{book_id}")
    public List<Review> getReviewByBookId(@PathVariable Long book_id) {
        return reviewService.getReviewByBookId(book_id) ;
    }

    @PostMapping
    public Review createReview(@RequestBody Review review) {
        return reviewService.createReview(review) ;
    }

    @PutMapping("/{id}")
    public Optional<Review> updateReview(@PathVariable Long id, @RequestBody Review review) {
        return reviewService.updateReview(id, review) ;
    }

    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id) ;
    }

}