//--------------------------------Sign-in and Sign-Up----------------------------------//
const sign_up = document.getElementById("sign-up");
const sign_in = document.getElementById("sign-in");
//------------------------------------Show password------------------------------------//
const showPassword = document.getElementById("showPassword");
const password = document.querySelector("#password");

//----------------------------Go sign-up page when i click-----------------------------//
sign_up.addEventListener("click", () => {
  window.location.href = "/Web/Pages/Login/Sign-Up/Sign-Up.html";
});

//-------------------------Go sign-in page when i click--------------------------------//
sign_in.addEventListener("click", () => {
  window.location.href = "/Web/Pages/Login/Sign-İn/Sign-in.html";
});

//--------------------Show password when i click eye Başlangiç-------------------------//
showPassword.addEventListener("click", () => {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  //----------------Göze bastığında gösterir Eğer zaten gösterili ise gizler-------------//
  password.classList.toggle("fa-eye-slash");
});

//-----------------------------Show password when i click eye  Bitiş-------------------//

//---------------------------Sign İn Control Start-------------------------------------//

const loginBtn = document.querySelector(".submit");
const inputUsername = document.querySelector("#username");
const inputPassword = document.querySelector("#password");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  fetch("/Web/Data/Users.json")
    .then((response) => {
      return response.json();
    })
    .then((Accounts) => {
      Accounts.Users.find((element) => {
        if (inputUsername.value === "" || inputPassword.value === "") {
          //--------------------Alert when is inputs null------------------//

          Swal.fire(
            "Warning!",
            "Usename ve Password Alanı Boş Bırakilmaz!",
            "warning"
          );
        } else {
          if (
            element.userUsername === inputUsername.value &&
            element.userPassword === inputPassword.value
          ) {
            window.location.href = "/Web/Pages/Home/Home.html";
          } else {
            Swal.fire("Error!", "Usename veya Password Yanliş!", "error");
          }
        }
      });

      inputUsername.value = "";
      inputPassword.value = "";
    });
});
