package ctu.fit.tjv.semester_work.controller ;

import ctu.fit.tjv.semester_work.model.Book ;
import ctu.fit.tjv.semester_work.service.BookService ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.* ;
import java.util.List ;
import java.util.Optional ;

@RestController
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookService bookService ;

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks() ;
    }

    @GetMapping("/{id}")
    public Optional<Book> getBookById(@PathVariable Long id) {
        return bookService.getBookById(id) ;
    }

    @PostMapping
    public Book createBook(@RequestBody Book book) {
        return bookService.createBook(book) ;
    }

    @PutMapping("/{id}")
    public Optional<Book> updateBook(@PathVariable Long id, @RequestBody Book book) {
        return bookService.updateBook(id, book) ;
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id) ;
    }

}