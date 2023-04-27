const listPanel = document.getElementById("list-panel");
const listUl = document.getElementById("list");
const showPanel = document.getElementById("show-panel");
const myUser = {
  id: 20,
  username: "carlos",
};
document.addEventListener("DOMContentLoaded", function () {
  fetchBooks();
});
const fetchBooks = () => {
  fetch("http://localhost:3000/books")
    .then((res) => res.json())
    .then(renderBookTitles);
};

function renderBookTitles(data) {
  data.forEach((book) => {
    const li = document.createElement("li");
    li.textContent = book.title;
    listUl.appendChild(li);
    li.addEventListener("click", () => showBookDetails(book));
  });
}
function showBookDetails(book) {
  showPanel.innerHTML = "";
  const bookImage = document.createElement("img");
  bookImage.src = book.img_url;
  bookImage.alt = book.title;

  const title = document.createElement("h2");
  title.textcontent = book.title;

  const author = document.createElement("h2");
  author.textcontent = book.author;

  const subtitle = document.createElement("h2");
  subtitle.textContent = book.subtitle;

  const description = document.createElement("p");
  description.textcontent = book.description;

  const usersDiv = document.createElement("div");
  const userLi = book.users;

  userLi.forEach((user) => {
    const userLi = document.createElement("li");
    userLi.textContent = user.username;
    usersDiv.appendChild(userLi);
  });

  const likeButton = document.createElement("button");
  likeButton.textContent = usersDiv.innerHTML.includes(myUser.username)
    ? "unlike"
    : "like";

  likeButton.setAttribute("id", book.id);
  likeButton.addEventListener("click", (event) => {
    event.preventDefault();
    likeBook(book);
  });

  showPanel.append(
    bookImage,
    title,
    author,
    subtitle,
    description,
    usersDiv,
    likeButton
  );
}

function likeBook(book) {
  const likeButton = document.getElementById(book.id);
  const likers = [];
  book.users.forEach((user) => likers.push(user));
  const userExist = likers.filter((user) => {
    return user.username == myUser.username;
  });
  console.log(userExist);
  if (userExist.length >= 1) {
    likers.pop();
    likeButton.textContent = "like";
  } else {
    likers.push(myUser);
    likeButton.textContent = "unlike";
  }
}

const options = {
  method: "PATCH",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify({
    users: likers,
  }),
};

fetch(`http://localhost:3000/books/${book.id}`, options);
then((res) => res.json());
then((book) => {
  listUl.innerHTML = "";
  showBookDetails(book);
  fetchBooks();
});
