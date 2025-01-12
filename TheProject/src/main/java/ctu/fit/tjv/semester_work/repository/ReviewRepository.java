package ctu.fit.tjv.semester_work.repository ;

import ctu.fit.tjv.semester_work.model.* ;
import org.springframework.data.jpa.repository.JpaRepository ;
import org.springframework.data.jpa.repository.Query ;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository ;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>{
    @Query("SELECT r FROM Review r WHERE r.reviewed_book.book_id = :bookId")
    List<Review> findByBook_Id(@Param("book_id") Long book_id) ;
}