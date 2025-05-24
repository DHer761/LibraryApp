const myLibrary = [];

// Book function to create a new book
function Book(bookID, bookTitle, bookAuthor, bookRead){
    this.bookID = bookID;
    this.bookTitle = bookTitle;
    this.bookAuthor = bookAuthor;
    this.bookRead = bookRead;
}
Book.prototype.toggleRead = function() {
    this.bookRead = !this.bookRead;
}

// Add Book to Library array function
function AddBookToLibrary(bookTitle, bookAuthor){
    const bookID = crypto.randomUUID();
    const bookRead = false;
    const book = new Book(bookID, bookTitle, bookAuthor, bookRead);
    myLibrary.push(book);
}

// Displays books to the frontend as a new div element
function DisplayBooks(){
    bookInfoDiv.innerHTML = '';

    for (let i = 0; i < myLibrary.length; i++){
        const createBookInfoDiv = document.createElement('div');
        bookInfoDiv.appendChild(createBookInfoDiv);

        createBookInfoDiv.classList.add("createBookInfoDiv");

        // Title
        const createBookInfoTitle = document.createElement('div');
        createBookInfoTitle.textContent = ("Title: " + myLibrary[i].bookTitle);
        createBookInfoDiv.appendChild(createBookInfoTitle);

        // Author
        const createBookInfoAuthor = document.createElement('div');
        createBookInfoAuthor.textContent = ("Author: " + myLibrary[i].bookAuthor);
        createBookInfoDiv.appendChild(createBookInfoAuthor);

        // ID
        const createBookInfoID = document.createElement('div');
        createBookInfoID.textContent = ("Book ID: " + myLibrary[i].bookID);
        createBookInfoDiv.appendChild(createBookInfoID);

        // Status div
        const bookStatusDiv = document.createElement('div');
        bookStatusDiv.classList.add("bookStatus");
        if (myLibrary[i].bookRead){
            bookStatusDiv.textContent = "Read";
            bookStatusDiv.classList.remove('notRead');
            bookStatusDiv.classList.add('read');
            }
        else {
                bookStatusDiv.textContent = "Not read";
                bookStatusDiv.classList.remove('read');
                bookStatusDiv.classList.add('notRead');
            }
        createBookInfoDiv.appendChild(bookStatusDiv);

        // Delete Button
        const deleteBookButton = document.createElement('button');
        deleteBookButton.classList.add("deleteBookButton");
        deleteBookButton.id = i;
        deleteBookButton.textContent = "Delete Book";
        createBookInfoDiv.appendChild(deleteBookButton);

        deleteBookButton.addEventListener('click', function deleteBookFromLibrary(){
            myLibrary.splice(i, 1);
            DisplayBooks();
        });


        // Mark as Read Button        
        const markAsReadButton = document.createElement('button');
        markAsReadButton.classList.add("markAsReadButton");
        markAsReadButton.id = `readButton-${i}`;
        markAsReadButton.textContent = "Toggle Read";
        createBookInfoDiv.appendChild(markAsReadButton);

        // Toggle Read Status
        markAsReadButton.addEventListener('click', function (){
            myLibrary[i].toggleRead();
            if (myLibrary[i].bookRead){
                bookStatusDiv.textContent = "Read";
                bookStatusDiv.classList.remove('notRead');
                bookStatusDiv.classList.add('read');
                }
            else {
                    bookStatusDiv.textContent = "Not read";
                    bookStatusDiv.classList.remove('read');
                    bookStatusDiv.classList.add('notRead');
            }
        });
    }
}


// Fetch parent div that will contain newly created book objects
const bookInfoDiv = document.getElementById('bookInfo');

// Fetch book creation button
const newBookButton = document.getElementById('newBookButton');
// Fetch dialog element
const newBookDialog = document.getElementById('newBookDialog');
// Fetch close dialog button
const closeNewBookDialogButton = document.getElementById('closeNewBookDialogButton');

// Display form from clicking on "Add New Book" button
newBookButton.addEventListener('click', DisplayNewBookDialog);

// Closes dialog when clicking closeNewBookDialog button
closeNewBookDialogButton.addEventListener('click', CloseNewBookDialog);

// Function to open modal
function DisplayNewBookDialog(){
    newBookDialog.showModal();
}

// Function to close modal
function CloseNewBookDialog(){
    newBookDialog.close();
}

// Submit New Book Button
const newBookSubmitButton = document.getElementById('submitNewBook');

newBookSubmitButton.addEventListener('click', AddBookToLibraryFromDialog)

function AddBookToLibraryFromDialog(event){
    event.preventDefault();
    const newBookTitle = document.getElementById('BookTitle').value;
    const newBookAuthor = document.getElementById('BookAuthor').value;
    AddBookToLibrary(newBookTitle, newBookAuthor);
    newBookDialog.close();
    DisplayBooks();
}


AddBookToLibrary("To Kill A Mockingbird", "Harper Lee");
AddBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald");

for (let i = 0; i < 7; i++){
    AddBookToLibrary(`Book ${i}`, `Author ${i}`);
}
DisplayBooks();