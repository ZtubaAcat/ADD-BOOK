var title = document.querySelector("#title");
var author = document.querySelector("#author");
var isbn = document.querySelector("#ISBN");
var booklist = document.querySelector("#book-list");
var form = document.getElementById("form");
var books = [];
//input alma

//Form event listener
form.addEventListener("submit", function (e) {
  e.preventDefault();
  var data = new FormData(form);

  var title = data.get("title");
  var author = data.get("author");
  var isbn = data.get("isbn");

  if (title != "" && author != "" && isbn != "") {
    var book = {
      title: title,
      author: author,
      isbn: isbn,
    };
    //addBookToList(book);
    books.push(book);
    console.log(books);
    drawList();
    e.target.reset();
    alert("success");
  } else {
    alert("error");
  }
});

//Tabloyu her işlemden sonra çizdirmek için kullanılır. Silme işleminden ve ekleme işleminden sonra çağırılacaktır.
function drawList() {
  var list = document.querySelector("#book-list");
  list.innerHTML = "";
  books.forEach((book) => {
    var row = document.createElement("tr");
    var title = document.createElement("td");
    var author = document.createElement("td");
    var isbn = document.createElement("td");
    var deleteButton = document.createElement("td");
    title.textContent = book.title;
    author.textContent = book.author;
    isbn.textContent = book.isbn;
    deleteButton.textContent = "X";

    list.appendChild(row);
    row.appendChild(title);
    row.appendChild(author);
    row.appendChild(isbn);
    row.appendChild(deleteButton);

    deleteButton.addEventListener("click", function (e) {
      console.log("tiklandi");
      var row = e.target.parentNode;
      var index = Array.prototype.indexOf.call(row.parentNode.children, row);
      deleterow(row, index);
    });
  });
}

//AddBook-removeBook part end

//warning part start
function alert(msj) {
  if (msj == "error") {
    var alertdiv = document.getElementById("alert");
    var p = document.createElement("p");
    p.className = "error";
    p.innerText = "Please fill in all fields";
    alertdiv.appendChild(p);
    setTimeout(function () {
      document.querySelector(".error").remove();
    }, 3e3);
  }
  if (msj == "success") {
    var alertdiv = document.getElementById("alert");
    var p = document.createElement("p");
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
}

//Warning Part end

function deleterow(row, index) {
  row.parentNode.removeChild(row);
  if (index > -1) {
    books.splice(index, 1);
    alert("delete");
  }
}
