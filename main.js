class Book {
  constructor(title, author, isbn) {
    (this.title = title), (this.author = author), (this.isbn = isbn);
  }
  title = document.getElementById("title");
  author = document.getElementById("author");
  isbn = document.getElementById("isbn");
}

let title = document.querySelector("#title");
let author = document.querySelector("#author");
let isbn = document.querySelector("#ISBN");
let booklist = document.querySelector("#book-list");
let form = document.getElementById("form");
let books = [];
let bookL = new Book(title, author, isbn);

//input alma

//Form event listener
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let data = new FormData(form);
  let title = data.get("title");
  let author = data.get("author");
  let isbn = data.get("isbn");

  if (title != "" && author != "" && isbn != "") {
    var book = {
      title: title,
      author: author,
      isbn: isbn,
    };
    //addBookToList(book);
    books.push(book);
    Store.addbook(book);
    console.log(books);
    drawList();
    e.target.reset();
    alert("success");
  } else {
    alert("error");
  }
});
document.addEventListener("DOMContentLoaded", function () {
  books = Store.getBook();

  drawList();
});
//Tabloyu her işlemden sonra çizdirmek için kullanılır. Silme işleminden ve ekleme işleminden sonra çağırılacaktır.
const drawList = () => {
  let list = document.querySelector("#book-list");
  list.innerHTML = "";
  books.forEach((bookItem) => {
    console.log(bookItem);
    let row = document.createElement("tr");
    title = document.createElement("td");
    author = document.createElement("td");
    isbn = document.createElement("td");
    let deleteButton = document.createElement("td");
    title.textContent = bookItem.title;
    author.textContent = bookItem.author;
    isbn.textContent = bookItem.isbn;
    deleteButton.textContent = "X";

    list.appendChild(row);
    row.appendChild(title);
    row.appendChild(author);
    row.appendChild(isbn);
    row.appendChild(deleteButton);

    deleteButton.addEventListener("click", function (e) {
      console.log("tiklandi");
      let row = e.target.parentNode;
      let index = Array.prototype.indexOf.call(row.parentNode.children, row);
      deleterow(row, index);
      Store.removeBook(book);
    });
  });
};

//AddBook-removeBook part end

//warning part start
const alert = (msj) => {
  if (msj == "error") {
    let alertdiv = document.getElementById("alert");
    let p = document.createElement("p");
    p.className = "error";
    p.innerText = "Please fill in all fields";
    alertdiv.appendChild(p);
    setTimeout(function () {
      document.querySelector(".error").remove();
    }, 3e3);
  }
  if (msj == "success") {
    let alertdiv = document.getElementById("alert");
    let p = document.createElement("p");
    p.className = "success";
    p.innerText = "Book Added!";
    alertdiv.appendChild(p);
    setTimeout(function () {
      document.querySelector(".success").remove();
    }, 3e3);
  }
  if (msj == "delete") {
    var alertdiv = document.getElementById("alert");
    var p = document.createElement("p");
    p.className = "success";
    p.innerText = "Book Removed!";
    alertdiv.appendChild(p);
    setTimeout(function () {
      document.querySelector(".success").remove();
    }, 3e3);
  }
};

//Warning Part end

function deleterow(row, index) {
  row.parentNode.removeChild(row);
  if (index > -1) {
    books.splice(index, 1);
    alert("delete");
  }
}
class Store {
  static getBook() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addbook(book) {
    const books = Store.getBook();
    books.push(book);
    console.log(books);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBook();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}
