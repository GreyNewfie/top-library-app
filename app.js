const submitBook = document.getElementById("submit-book");
const bookTitleField = document.getElementById("book-title");
const bookAuthorField = document.getElementById("book-author");
const bookLengthField = document.getElementById("book-pages");
const bookReadField = document.getElementById("book-read");
const formElem = document.querySelector("form");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
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
});