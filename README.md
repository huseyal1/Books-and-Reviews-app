# Book Reviews
`User` will be able to add, review (via `Review`) and categorize (via `Category`) `Book`s.

## Schema
![Schema](diagram.png)

## Query
#### Formulation:
Retrieve a list of `User`s who have not reviewed a specified `Book`.

#### Use
When adding a new reviewer to a `Book`, it is necessary to display only the `User`s who have not yet reviewed the specified `Book`. This ensures that `User`s are not assigned to review the same `Book` more than once.

## Complex Operations
#### Description
Within the application, it is necessary to ensure that each book added to the system has a unique ISBN to avoid duplication.

#### Progress
When a user attempts to add a new book, the client first sends a request to the API to check if the ISBN already exists in the database. If the ISBN is found in the database, a message is displayed to the user indicating that the book already exists, and the addition is not performed. If the ISBN is not found, the client proceeds to send a request to the API to add the new book to the database. Upon successful addition, the user receives confirmation that the book has been added.