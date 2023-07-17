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

function addBookToLibrary(book) {
    library.push(book);
    sessionStorage.setItem("books", JSON.stringify(library));
}

function showBooksInLibrary(library) {
    library.forEach(book => {
        const divNode = document.createElement("div");
        divNode.setAttribute("class", "book");
    
        const titleNode = document.createElement("h4");
        let titleContent = document.createTextNode(`${book.title}`);
        titleNode.appendChild(titleContent);
        divNode.appendChild(titleNode);
    
        const authorNode = document.createElement("p");
        let authorContent = document.createTextNode(`Written by ${book.author}`);
        authorNode.appendChild(authorContent);
        divNode.appendChild(authorNode);
    
        const pagesNode = document.createElement("p");
        let pagesContent = document.createTextNode(`${book.pages}`);
        pagesNode.appendChild(pagesContent);
        divNode.appendChild(pagesNode);
    
        const readNode = document.createElement("p");
        let readContent = document.createTextNode(`${book.read}`);
        readNode.appendChild(readContent);
        divNode.appendChild(readNode);
    
        booksSection.appendChild(divNode); 
        console.log(titleContent);
        console.log(authorContent);
    });
}

Book.prototype.info = function () {
    return (`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
}

let newBookTitle = "";
let newBookAuthor = "";
let newBookLength = 0;
let newBook = {};

submitBook.addEventListener("click", (e) => {
    // e.preventDefault();
    newBookTitle = bookTitleField.value;
    newBookAuthor = bookAuthorField.value;
    newBookLength = bookLengthField.value;
    newBookRead = bookReadField.value;

    newBook = new Book(newBookTitle, newBookAuthor, newBookLength, newBookRead);
    addBookToLibrary(newBook);
});

showBooksInLibrary(library);