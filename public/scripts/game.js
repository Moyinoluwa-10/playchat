let socket = io();

const createbtn = document.querySelector(".btn-create");
const createjoin = document.querySelector(".btn-join");
const left = document.querySelector(".left");

createbtn.addEventListener("click", () => {});

socket.on("create game", function (msg) {
  console.log("server_says: " + msg);
  var item = document.createElement("button");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
