var socket = io();

//       var form = document.getElementById("form");
//       var input = document.getElementById("input");

//       input.addEventListener("focus", function (e) {
//         console.log("item is focused");
//         socket.emit("typing", "user is typing");
//       });

//       form.addEventListener("submit", function (e) {
//         e.preventDefault();
//         var item = document.createElement("li");
//         item.textContent = input.value;
//         messages.appendChild(item);
//         window.scrollTo(0, document.body.scrollHeight);
//         if (input.value) {
//           console.log("chat_message: " + input.value);
//           socket.emit("chat message", input.value);
//           input.value = "";
//         }
//       });
const overlay = document.querySelector(".overlay");
const form = document.querySelector(".overlay-form");
const input = document.querySelector(".overlay-input");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    overlay.classList.add("hidden");
  }
});

//       socket.on("chat message", function (msg) {
//         console.log("server_says: " + msg);
//         var item = document.createElement("li");
//         item.textContent = msg;
//         messages.appendChild(item);
//         window.scrollTo(0, document.body.scrollHeight);
//       });

console.log("Hello");
