"use strict";

const elements = {
  contributions: document.querySelector(".contributions"),
  newBookBtn: document.querySelector(".new-book-btn"),
  submitBtn: document.querySelector(".submit-btn"),
  deleteBtn: document.querySelector(".delete-btn"),
  bookList: document.querySelector(".book-list"),
  loginForm: document.getElementById("loginForm"),
  overLay: document.querySelector(".over-lay"),
  readBtn: document.querySelectorAll(".read"),
  form: document.querySelector("form"),
};

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${read}`;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function createCard(book) {
  const card = document.createElement("div");
  card.classList.add("card");

  const elements = {
    bookName: createAndAppend("h3", book.title, card),
    authorName: createAndAppend("h4", book.author, card),
    pages: createAndAppend("p", `Pages: ${book.pages}`, card),
    status: createAndAppend("button", book.read, card, ["read"]),
    deleteBtn: createAndAppend("button", "Delete", card, ["delete-btn", "btn"]),
  };

  elements.status.addEventListener("click", () => {
    book.read = book.read === "Read" ? "Not Read" : "Read";
    displayBooks();
  });

  elements.deleteBtn.addEventListener("click", () => {
    const bookIndex = myLibrary.indexOf(book);
    if (bookIndex !== -1) {
      myLibrary.splice(bookIndex, 1);
      displayBooks();
    }
  });

  return card;
}

function createAndAppend(tag, text, parent, classes = []) {
  const element = document.createElement(tag);
  element.textContent = text;
  classes.forEach((className) => element.classList.add(className));
  parent.appendChild(element);
  return element;
}

function displayBooks() {
  elements.bookList.innerHTML = "";
  myLibrary.forEach((book) => {
    const card = createCard(book);
    elements.bookList.appendChild(card);
  });
}

function toggleModal() {
  elements.form.classList.toggle("modal");
  elements.overLay.classList.toggle("hidden");
}

elements.newBookBtn.addEventListener("click", toggleModal);

elements.loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const bookname = document.getElementById("book");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const status = document.getElementById("read");
  const read = status.checked ? "Read" : "Not Read";

  if (bookname.value === "" || author.value === "") {
    alert("Ensure you input a value in input fields!");
  } else {
    const newBook = new Book(bookname.value, author.value, pages.value, read);
    addBookToLibrary(newBook);

    displayBooks();
    toggleModal();

    bookname.value = "";
    author.value = "";
    pages.value = "";
    status.checked = false;
  }
});

elements.overLay.addEventListener("click", toggleModal);

elements.readBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.textContent = btn.textContent === "Read" ? "Not Read" : "Read";
  });
});

elements.deleteBtn.addEventListener("click", () => {
  myLibrary.pop();
  displayBooks();
});
