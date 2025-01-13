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
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
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
                        <td>${book.book_id}</td>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.publication_year}</td>
                        <td>${book.description}</td>
                        <td>${book.category_name}</td>
                        <td>${book.isbn}</td>
                        <td>
                            <button class="btn btn-primary" onclick="fetchReviews(${book.book_id})">View Reviews of this Book</button>
                        </td>
                    </tr>`).join('')}
            </tbody>
        </table>
    `;
}

async function fetchReviews(bookId) {
    try {
        const response = await fetch(`${API_BASE_URL}/reviews/book/${book_id}`);
        if (!response.ok) throw new Error('Failed to fetch reviews e, yoldash');
        const reviews = await response.json();
        displayReviews(reviews);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('reviews-content').innerHTML = `
            <div class="alert alert-danger">Failed to load reviews e, yoldash.</div>`;
    }
}

function displayReviews(reviews) {
    const content = document.getElementById('reviews-content');
    content.innerHTML = `
        <h3>Reviews</h3>
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                ${reviews.map(review => `
                    <tr>
                        <td>${review.review_id}</td>
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
