const submitBook = document.getElementById("submit-book");
const bookTitleField = document.getElementById("book-title");
const bookAuthorField = document.getElementById("book-author");
const bookLengthField = document.getElementById("book-pages");
const bookReadField = document.getElementById("book-read");
const formElem = document.querySelector("form");
const booksSection = document.getElementById("books-section");

// Get books from local storage
if (sessionStorage.getItem('books') === null) {
    library = [];
  } else {
    const booksFromStorage = JSON.parse(sessionStorage.getItem('books'));
    library = booksFromStorage;
  }

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addToLibrary(book) {
    library.push(book);
    storeLibrary(library);
}

// Add library to session storage
function storeLibrary(library) {
    sessionStorage.setItem("books", JSON.stringify(library));
}

function showBooksInLibrary(library) {
    let i = 0;
    library.forEach(book => {
        const divNode = document.createElement("div");
        divNode.setAttribute("class", "book");
    
        const titleNode = document.createElement("h4");
        let titleContent = document.createTextNode(`${book.title}`);
        titleNode.appendChild(titleContent);
    
        const authorNode = document.createElement("p");
        let authorContent = document.createTextNode(`Written by ${book.author}`);
        authorNode.appendChild(authorContent);
    
        const pagesNode = document.createElement("p");
        let pagesContent = document.createTextNode(`${book.pages} pages`);
        pagesNode.appendChild(pagesContent);
    
        const statusNode = document.createElement("p");
        statusNode.setAttribute("class", "book-status");
        let readContent = document.createTextNode("Status: ");
        statusNode.appendChild(readContent);
        const bookStatusBtn = document.createElement("button");
        bookStatusBtn.setAttribute("class", "book-status-btn");
        const bookStatusBtnContent = document.createTextNode(`${book.read}`);
        bookStatusBtn.appendChild(bookStatusBtnContent);
        statusNode.appendChild(bookStatusBtn);
        bookStatusBtn.addEventListener("click", (e) => {
            updateBookStatus(e.target);
            console.log("e.target is " + e.target);
            console.log(e.target.innerText);
        });    

        const deleteButtonNode = document.createElement("button");
        deleteButtonNode.setAttribute("class", "delete-book-btn");
        const deleteButtonIcon = document.createElement("i");
        deleteButtonIcon.setAttribute("class", "material-symbols-outlined");
        let deletebuttonContent = document.createTextNode("delete")
        deleteButtonIcon.appendChild(deletebuttonContent);
        deleteButtonNode.appendChild(deleteButtonIcon);
        deleteButtonNode.addEventListener("click", (e) => removeBookFromLibrary(e));
    
        deleteButtonNode.setAttribute("data-array-location", i);
        i++;

        divNode.append(titleNode, authorNode, pagesNode, statusNode, deleteButtonNode);
        booksSection.appendChild(divNode); 
    });
}

function removeBookFromLibrary(e) {
    let bookLocation = e.currentTarget.getAttribute("data-array-location");
    library.splice(bookLocation, 1);
    clearDisplayedBooks();
    sessionStorage.clear();
    storeLibrary(library);
    showBooksInLibrary(library);
}

function clearDisplayedBooks() {
    let displayedBooks = document.querySelectorAll(".book");
    displayedBooks.forEach(book => {
        book.remove();
    })
}

function updateBookStatus (statusButton) {
    let currentStatus = statusButton.innerText;
    console.log(`Status is ${currentStatus}`);
    if (currentStatus === "Not read") {
        statusButton.innerText = "Reading";
    } else if (currentStatus === "Reading") {
        statusButton.innerText = "Read";
    } else if (currentStatus === "Read") {
        statusButton.innerText = "Not read";
    }
}

Book.prototype.info = function () {
    return (`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
}

let newBookTitle = "";
let newBookAuthor = "";
let newBookLength = 0;
let newBook = {};

submitBook.addEventListener("click", (e) => {
    newBookTitle = bookTitleField.value;
    newBookAuthor = bookAuthorField.value;
    newBookLength = bookLengthField.value;
    newBookRead = bookReadField.value;

    newBook = new Book(newBookTitle, newBookAuthor, newBookLength, newBookRead);
    addToLibrary(newBook);
});

showBooksInLibrary(library);