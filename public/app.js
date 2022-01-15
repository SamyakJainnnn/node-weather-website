console.log("js is working");

const weatherForm = document.querySelector("form");

const message1 = document.getElementById("message-1");
const message2 = document.getElementById("message-2");

const search = document.querySelector("input");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  message1.textContent = "Loading...";
  message2.textContent = "";
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
          message1.textContent = data.error;
        } else {
          message1.textContent = data.location;
          message2.textContent = data.forecast;
        }
      });
    }
  );
});
