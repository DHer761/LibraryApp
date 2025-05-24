const myLibrary = [];

// Book function to create a new book
function Book(bookID, bookTitle, bookAuthor){
    this.bookID = bookID;
    this.bookTitle = bookTitle;
    this.bookAuthor = bookAuthor;
}


// Add Book to Library array function
function AddBookToLibrary(bookTitle, bookAuthor){
    this.bookTitle = bookTitle;
    this.bookAuthor = bookAuthor;
    bookID = crypto.randomUUID();
    const book = new Book(bookID, this.bookTitle, this.bookAuthor);
    myLibrary.push(book);
}

// Displays books to the frontend as a new div element
function DisplayBooks(){
    bookInfoDiv.innerHTML = '';

    for (let i = 0; i < myLibrary.length; i++){
        const createBookInfo = document.createElement('div');
        createBookInfo.textContent = (myLibrary[i].bookTitle + " by " + myLibrary[i].bookAuthor + " | " + "Book ID: " + myLibrary[i].bookID);
        bookInfoDiv.appendChild(createBookInfo);
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
DisplayBooks();