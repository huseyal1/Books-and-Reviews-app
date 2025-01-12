package ctu.fit.tjv.semester_work.repository ;

import ctu.fit.tjv.semester_work.model.Book ;
import org.springframework.data.jpa.repository.JpaRepository ;
import org.springframework.stereotype.Repository ;

@Repository
public interface BookRepository extends JpaRepository<Book, Long>{
}