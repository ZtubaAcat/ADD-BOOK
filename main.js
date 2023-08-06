var title = document.querySelector("#title");
var author = document.querySelector("#author");
var isbn = document.querySelector("#ISBN");
var booklist = document.querySelector("#book-list");
var form = document.getElementById("form");
var book = [];
//input alma

//Form event listener
form.addEventListener("submit", function (e) {
  e.preventDefault();
  var data = new FormData(form);

  var title = data.get("title");
  var author = data.get("author");
  var isbn = data.get("isbn");
  if (title != "" && author != "" && isbn != "") {
    book.push(title, author, isbn);
    addBookToList(book);
    e.target.reset();
    alert("success");
  } else {
    alert("error");
  }
});

//AddBook-removeBook part start
function addBookToList(book) {
  var list = document.querySelector("#book-list");

  var row = document.createElement("tr");
  row.innerHTML = `
        <td>${book[0]}</td>
        <td>${book[1]}</td>
        <td>${book[2]}</td>
        <td><a href="#" class="button">X</a></td>
    `;

  list.appendChild(row);
}

function removeBookToList(book) {
  var list = document.querySelector("#book-list");
  var row = document.documentElement.remove("tr");
  row.innerHTML.remove = `
    <td>${book[0]}</td>
    <td>${book[1]}</td>
    <td>${book[2]}</td>
    <td><a href="#" class="button">X</a></td>
`;
}
form.addEventListener("button", function () {
  removeBookToList(book);
});

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
}

//Warning Part end
