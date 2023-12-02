"use strict";

const contributions = document.querySelector(".contributions"),
  newBookBtn = document.querySelector(".new-book-btn"),
  submitBtn = document.querySelector(".submit-btn"),
  deleteBtn = document.querySelector(".delete-btn"),
  bookList = document.querySelector(".book-list"),
  loginForm = document.getElementById("loginForm"),
  overLay = document.querySelector(".over-lay"),
  readBtn = document.querySelectorAll(".read"),
  form = document.querySelector("form");

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

function displayBooks() {
  bookList.textContent = "";

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    const bookName = document.createElement("h3");
    const authorName = document.createElement("h4");
    const pages = document.createElement("p");
    const status = document.createElement("button");
    const deleteBtn = document.createElement("button");

    bookName.textContent = book.title;
    authorName.textContent = book.author;
    pages.textContent = `Pages: ${book.pages}`;
    status.textContent = book.read;
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn", "btn");

    card.classList.add("card");
    status.classList.add("read");
    card.append(bookName, authorName, pages, status, deleteBtn);

    bookList.append(card);

    status.addEventListener("click", () => {
      book.read = book.read === "Read" ? "Not Read" : "Read";
      displayBooks();
    });

    deleteBtn.addEventListener("click", () => {
      const bookIndex = myLibrary.indexOf(book);
      if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        displayBooks();
      }
    });
  });
}

function toggleModal() {
  form.classList.toggle("modal");
  overLay.classList.toggle("hidden");
}

newBookBtn.addEventListener("click", toggleModal);

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let bookname = document.getElementById("book");
  let author = document.getElementById("author");
  let pages = document.getElementById("pages");
  let status = document.getElementById("read");
  let read = status.checked ? "Read" : "Not Read";

  if (bookname.value == "" || author.value == "") {
    alert("Ensure you input a value in input fields!");
  } else {
    let newBook = new Book(bookname.value, author.value, pages.value, read);
    addBookToLibrary(newBook);

    displayBooks();
    toggleModal();

    bookname.value = "";
    author.value = "";
    pages.value = "";
    status.checked = false;
  }
});

overLay.addEventListener("click", toggleModal);

readBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.textContent = btn.textContent === "Read" ? "Not Read" : "Read";
  });
});

deleteBtn.addEventListener("click", () => {
  myLibrary.pop();
  displayBooks();
});
