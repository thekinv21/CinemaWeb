const ticketContainer = document.querySelector(".ticket-bilgileri-container");
const ticketSearch = document.querySelector(".search");
const inputFirstname = document.getElementById("name");
const inputLastname = document.getElementById("surname");

//--------------------------Take ticket details--------------------------//
const fullName = document.querySelector(".fullname");
const moviePath = document.querySelector(".movie-Path-image");
const movieTitle = document.querySelector(".movieTitle");
const movieLanguage = document.querySelector(".movieLanguage");
const movieRating = document.querySelector(".movieRating");
const movieReleaseDate = document.querySelector(".release-date");

//--------------------------Get ticket information------------------------//
let ticket = localStorage.getItem("myTicket");
ticket = JSON.parse(ticket);

//-----------------Çıkış yapıldıgında gösterilecek alert----------//
const logOut = () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: true,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",

      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Exit Now!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
    })
    .then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/Web/Pages/Login/Sign-İn/Sign-in.html";
      } else result.dismiss === Swal.DismissReason.cancel;
    });
};

//------------------Get myTicket information on localeStorage--------------//

ticketSearch.addEventListener("click", (event) => {
  event.preventDefault();

  if (inputFirstname.value === "" || inputLastname.value === "") {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Alanları Doldurunuz!",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    if (
      inputFirstname.value === ticket.firstName &&
      inputLastname.value === ticket.lastName
    ) {
      ticketContainer.style.display = "block";

      moviePath.setAttribute("src", ticket.movieİnfo.moviePath);
      fullName.innerText = ticket.firstName + " " + ticket.lastName;
      movieTitle.innerText = ticket.movieİnfo.movieName;
      movieLanguage.innerText = ticket.movieİnfo.movieLanguage;
      movieReleaseDate.innerText = ticket.movieİnfo.movieReleaseDate;
      movieRating.innerText = ticket.movieİnfo.movieRating;
    } else {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Bilet Bulunamadi!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  inputFirstname.value = "";
  inputLastname.value = "";
});
