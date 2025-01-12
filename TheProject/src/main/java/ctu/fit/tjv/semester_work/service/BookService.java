package ctu.fit.tjv.semester_work.service ;

import ctu.fit.tjv.semester_work.model.Book ;
import ctu.fit.tjv.semester_work.repository.BookRepository ;
import org.springframework.beans.factory.annotation.Autowired ;
import org.springframework.stereotype.Service ;
import java.util.List ;
import java.util.Optional ;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepo ;

    public List<Book> getAllBooks() {
        return bookRepo.findAll() ;
    }

    public Optional<Book> getBookById(Long book_id) {
        return bookRepo.findById(book_id) ;
    }

    public Book createBook(Book newBook) {
        return bookRepo.save(newBook) ;
    }

    public Optional<Book> updateBook(Long book_id, Book newBook) {
        return bookRepo.findById(book_id).map(presentBook -> {
            presentBook.setAuthor(newBook.getAuthor()) ;
            presentBook.setISBN(newBook.getISBN()) ;
            presentBook.setDescription(newBook.getDescription()) ;
            presentBook.setTitle(newBook.getTitle()) ;
            presentBook.setCategory_name(newBook.getCategory_name()) ;
            presentBook.setPublication_year(newBook.getPublication_year()) ;
            return bookRepo.save(presentBook) ;
        });
    }

    public void deleteBook(Long book_id) {
        bookRepo.deleteById(book_id) ;
    }

}