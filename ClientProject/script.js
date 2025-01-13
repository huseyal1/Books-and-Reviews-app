const API_BASE_URL = 'http://localhost:8080';

async function fetchBooks() {
    try {
        const response = await fetch(`${API_BASE_URL}/books`);
        if (!response.ok) throw new Error('Failed to fetch books e, yoldash');
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('content').innerHTML = `
            <div class="alert alert-danger">Failed to load books e, yoldash</div>`;
    }
}

function displayBooks(books) {
    const content = document.getElementById('content');
    content.innerHTML = `
    	<button class="btn btn-success mb-3" onclick="addBook()">Add Book</button>
        <table class="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Year</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>ISBN</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${books.map(book => `
                    <tr>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.publication_year}</td>
                        <td>${book.description}</td>
                        <td>${book.category_name}</td>
                        <td>${book.isbn}</td>
                        <td>
                            <button class="btn btn-primary" onclick="fetchReviews(${book.book_id})">View Reviews of this Book</button>
			    <button class="btn btn-warning" onclick="updateBook(${book.book_id})">Update</button>
                            i<button class="btn btn-danger" onclick="deleteBook(${book.book_id})">Delete</button>
                            <button class="btn btn-success" onclick="addReview(${book.book_id})">Add Review</button>
                        </td>
                    </tr>`).join('')}
            </tbody>
        </table>
    `;
}

function addBook() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h3>Add a new Book</h3>
        <form onsubmit="submitAddBook(event)">
            <input type="text" id="title" placeholder="Title" required />
            <input type="text" id="author" placeholder="Author" required />
            <input type="number" id="year" placeholder="Year" required />
            <input type="text" id="description" placeholder="Description" required />
            <input type="text" id="category" placeholder="Category" required />
            <input type="text" id="isbn" placeholder="ISBN" required />
            <button class="btn btn-primary" type="submit">Submit</button>
        </form>
    `;
}

async function submitAddBook(event) {
    event.preventDefault();
    const book = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        publication_year: parseInt(document.getElementById('year').value),
        description: document.getElementById('description').value,
        category_name: document.getElementById('category').value,
        isbn: document.getElementById('isbn').value
    };


	try {
        const response = await fetch(`${API_BASE_URL}/books`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        });
        if (!response.ok) throw new Error('Failed to add a book');
        fetchBooks();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to add a book');
    }
}


async function fetchReviews(bookId) {
    try {
        const response = await fetch(`${API_BASE_URL}/reviews/book/${bookId}`);
        if (!response.ok) throw new Error('No review added for this book :(');
        const reviews = await response.json();
        displayReviews(reviews);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('reviews-content').innerHTML = `
            <div class="alert alert-danger">No review added for this book :(</div>`;
    }
}

function displayReviews(reviews) {
    const content = document.getElementById('reviews-content');
    content.innerHTML = `
        <h3>Reviews</h3>
        <table class="table">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                ${reviews.map(review => `
                    <tr>
                        <td>${review.username}</td>
                        <td>${review.rating}</td>
                        <td>${review.comment}</td>
                        <td>${review.date}</td>
                    </tr>`).join('')}
            </tbody>
        </table>
    `;
}

fetchBooks();                    
