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
    	<button class="btn btn-success mb-3" onclick="addBook()">➕Add a new Book</button>
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
                            <button class="btn btn-primary" onclick="fetchReviews(${book.book_id})">👀View Reviews of this Book</button>
			    <button class="btn btn-warning" onclick="updateBook(${book.book_id})">🔄Update the Book</button>
                            <button class="btn btn-danger" onclick="deleteBook(${book.book_id})">✖️Delete the Book</button>
                            <button class="btn btn-success" onclick="addReview(${book.book_id})">➕Add a Review for this Book</button>
                        </td>
                    </tr>`).join('')}
            </tbody>
        </table>
    `;
}

// Add a Book :

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


// Update a book :

async function updateBook(bookId) {
    try {
        const response = await fetch(`${API_BASE_URL}/books/${bookId}`);
        if (!response.ok) throw new Error('Failed to fetch book details');
        const book = await response.json();

        const content = document.getElementById('content');
        content.innerHTML = `
            <h3>Update the Book</h3>
            <form onsubmit="submitUpdateBook(event, ${bookId})">
                <input type="text" id="title" value="${book.title}" required />
                <input type="text" id="author" value="${book.author}" required />
                <input type="number" id="year" value="${book.publication_year}" required />
                <input type="text" id="description" value="${book.description}" required />
                <input type="text" id="category" value="${book.category_name}" required />
                <input type="text" id="isbn" value="${book.isbn}" required />
                <button class="btn btn-primary" type="submit">Submit</button>
            </form>
        `;
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch book details');
    }
}

async function submitUpdateBook(event, bookId) {
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
        const response = await fetch(`${API_BASE_URL}/books/${bookId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        });
        if (!response.ok) throw new Error('Failed to update the book');
        fetchBooks();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to the update book');
    }
}

// Delete a book :

async function deleteBook(bookId) {
    if (!confirm('So.. are you really sure you want to delete this book?')) return;
    try {
        const response = await fetch(`${API_BASE_URL}/books/${bookId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete the book');
        fetchBooks();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to delete the book');
    }
}

// Add a review :

function addReview(bookId) {
    const content = document.getElementById('reviews-content');
    content.innerHTML = `
        <h3>Add a new Review according to the Book ID: ${bookId}</h3>
        <form onsubmit="submitAddReview(event, ${bookId})">
            <input type="text" id="username" placeholder="Username" required />
            <input type="text" id="rating" placeholder="Rating" required />
            <textarea id="comment" placeholder="Comment" required></textarea>
            <input type="date" id="date" required />
            <button class="btn btn-primary" type="submit">Submit</button>
        </form>
    `;
}

async function submitAddReview(event, bookId) {
    event.preventDefault();
    const review = {
        username: document.getElementById('username').value,
        rating: document.getElementById('rating').value,
        comment: document.getElementById('comment').value,
        date: document.getElementById('date').value,
        reviewed_book: { book_id: bookId }
    };

    try {
        const response = await fetch(`${API_BASE_URL}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        });
        if (!response.ok) throw new Error('Failed to add a review');
        fetchReviews(bookId); // Reload reviews for the book
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to add a review');
    }
}


// Fetch reviews :

async function fetchReviews(bookId) {
    try {
        const response = await fetch(`${API_BASE_URL}/reviews/book/${bookId}`);
        if (!response.ok) throw new Error('No review added for this book :(');
        const reviews = await response.json();
	console.log('Fetched Reviews:', reviews);
        displayReviews(bookId, reviews);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('reviews-content').innerHTML = `
            <div class="alert alert-danger">No review added for this book :(</div>`;
    }
}

function displayReviews(bookId, reviews) {
    const content = document.getElementById('reviews-content');
    content.innerHTML = `
        <h3>⬇Reviews of the Selected Book⬇</h3>
        <table class="table">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Date</th>
		    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${reviews.map(review => `
                    <tr>
                        <td>${review.username}</td>
                        <td>${review.rating}</td>
                        <td>${review.comment}</td>
                        <td>${review.date}</td>
			<td>
                            <button class="btn btn-danger btn-sm" onclick="deleteReview(${review.review_id}, ${bookId})">✖️Delete the Review</button>
			</td>
                    </tr>`).join('')}
            </tbody>
        </table>
    `;
}


// Delete a review :

async function deleteReview(reviewId, bookId) {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete review');
        alert('Review deleted successfully');
        fetchReviews(bookId);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to delete review');
    }
}

fetchBooks();                    
