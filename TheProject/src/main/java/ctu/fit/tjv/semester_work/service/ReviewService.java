package ctu.fit.tjv.semester_work.service ;

import ctu.fit.tjv.semester_work.model.Review ;
import ctu.fit.tjv.semester_work.repository.ReviewRepository ;
import org.springframework.beans.factory.annotation.Autowired ;
import org.springframework.stereotype.Service ;
import java.util.List ;
import java.util.Optional ;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepo ;

    public List<Review> getAllReviews() {
        return reviewRepo.findAll() ;
    }

    public Optional<Review> getReviewById(Long review_id) {
        return reviewRepo.findById(review_id) ;
    }

    public Review createBook(Review newReview) {
        return reviewRepo.save(newReview) ;
    }

    public Optional<Review> updateReview(Long review_id, Review newReview) {
        return reviewRepo.findById(review_id).map(presentReview -> {
            presentReview.setReview_id(newReview.getReview_id()) ;
            presentReview.setComment(newReview.getComment()) ;
            presentReview.setUsername(newReview.getUsername()) ;
            presentReview.setDate(newReview.getDate()) ;
            presentReview.setRating(newReview.getRating()) ;
            presentReview.setReviewed_book(newReview.getReviewed_book()) ;
            return reviewRepo.save(presentReview) ;
        });
    }

    public void deleteReview(Long review_id) {
        reviewRepo.deleteById(review_id) ;
    }

}