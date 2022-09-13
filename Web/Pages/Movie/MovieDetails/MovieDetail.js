const Container = document.querySelector(".container");
//-------------Selected Movie information----------------//
let selectedMovie = localStorage.getItem("selectedMovie");
selectedMovie = JSON.parse(selectedMovie);

//-------------------Fragman Almak için kullanacaz-----------------//
const myApi_key = "api_key=7b7fc4b328c6b537bb96b26a23377e89";
const myBase_url = "https://api.themoviedb.org/3";
const overlayContent = document.querySelector(".overlay-content");
//------------------Create movie path---------------------//

const moviePathBlock = document.createElement("div");
moviePathBlock.classList.add("poster");

const image_url = "https://image.tmdb.org/t/p/w500";
const moviePoster = image_url + selectedMovie.poster_path;

const moviePath = document.createElement("img");
moviePath.classList.add("path");

moviePath.setAttribute("src", moviePoster);
moviePathBlock.appendChild(moviePath);

//----------------Create details container------------------//

const movieDetail = document.createElement("div");
movieDetail.classList.add("details");

//-----------------Create movie title----------------------//

const movieTitleBlock = document.createElement("div");
movieTitleBlock.classList.add("movie-title");

const span1 = document.createElement("span");
span1.classList.add("title");
span1.innerText = "Movie";

const movieTitle = document.createElement("h2");
movieTitle.innerText = selectedMovie.title;

movieTitleBlock.append(span1, movieTitle);
movieDetail.append(movieTitleBlock);

//---------------Create movie release date------------------//

const movieReleaseBlock = document.createElement("div");
movieReleaseBlock.classList.add("release-date");

const span2 = document.createElement("span");
span2.classList.add("title");
span2.innerText = "Release Date";

const movieReleaseDate = document.createElement("p");
movieReleaseDate.innerText = selectedMovie.release_date;

movieReleaseBlock.append(span2, movieReleaseDate);
movieDetail.append(movieReleaseBlock);

//---------------------Create vote average-------------------//

const movieRatingBlock = document.createElement("div");
movieRatingBlock.classList.add("vote_average");

const span3 = document.createElement("span");
span3.classList.add("title");
span3.innerText = "Rating";

const movieRating = document.createElement("p");
movieRating.innerText = selectedMovie.vote_average;

movieRatingBlock.append(span3, movieRating);
movieDetail.append(movieRatingBlock);

//---------------------Create movie language--------------------//

const movieLanguageBlock = document.createElement("div");
movieLanguageBlock.classList.add("sure");

const span4 = document.createElement("span");
span4.classList.add("title");
span4.innerText = "Language";

const movieLanguage = document.createElement("p");
movieLanguage.innerText = selectedMovie.original_language.toUpperCase();

movieLanguageBlock.append(span4, movieLanguage);
movieDetail.append(movieLanguageBlock);

//---------------------Create movie overview--------------------//

const movieOverviewBlock = document.createElement("div");
movieOverviewBlock.classList.add("overview");

const span5 = document.createElement("span");
span5.classList.add("title");
span5.innerText = "Overview";

const movieOverview = document.createElement("p");
movieOverview.innerText = selectedMovie.overview;

movieOverviewBlock.append(span5, movieOverview);
movieDetail.append(movieOverviewBlock);

//-----------------Create buy and cancel buttons----------------//

const buttonBlock = document.createElement("div");
buttonBlock.classList.add("buttons");

const buyButton = document.createElement("button");
buyButton.classList.add("buyButton");
buyButton.innerText = "Buy Ticket";

const fragmanButton = document.createElement("button");
fragmanButton.classList.add("fragmanButton");
fragmanButton.innerText = "Trailer";

const cancelButton = document.createElement("button");
cancelButton.classList.add("cancelButton");
cancelButton.innerText = "Cancel";

buttonBlock.append(buyButton);
buttonBlock.append(fragmanButton);
buttonBlock.append(cancelButton);

movieDetail.append(buttonBlock);

//--------------------Append items on container-------------------//
Container.append(moviePathBlock);
Container.append(movieDetail);

//----------------Buy Buttona basıldıgında---------------------//
buyButton.addEventListener("click", () => {
  let myTicket = {
    moviePath: moviePoster,
    movieName: selectedMovie.title,
    movieRating: selectedMovie.vote_average,
    movieReleaseDate: selectedMovie.release_date,
    movieOverview: selectedMovie.overview,
    movieLanguage: selectedMovie.original_language.toUpperCase(),
  };

  localStorage.setItem("movieTicket", JSON.stringify(myTicket));

  window.location.href = "/Web/Pages/Movie/Payment/Payment.html";
});

//----------------Fragman Buttona basıldıgında---------------------//

fragmanButton.addEventListener("click", () => {
  openNav();
});

function openNav() {
  document.querySelector(".overlay").style.display = "block";
  let movieid = selectedMovie.id;

  fetch(myBase_url + `/movie/${movieid}/videos?` + myApi_key)
    .then((response) => {
      return response.json();
    })
    .then((videoData) => {
      if (videoData) {
        const nav = document.getElementById("myNav");
        nav.style.width = "100%";

        if (videoData.results.length > 0) {
          var bulunanlar = [];

          videoData.results.find((video) => {
            if (video.site == "YouTube") {
              //-----------Eğer 1den fazla youtube videosu görmek istiyorsan alttaki if blogu kaldır----------//
              if (
                video.name === "Official Trailer" ||
                video.name === "Trailer"
              ) {
                bulunanlar.push(
                  `<iframe width="1000" height="500" src="https://www.youtube.com/embed/${video.key}" title="${video.name}"  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                );
              }
            }
          });

          overlayContent.innerHTML = bulunanlar.join("");
        }
      }
    });
  }

function closeNav() {
  const nav = document.getElementById("myNav");
  nav.style.width = "0%";
  overlayContent.innerHTML = "";
}

//----------------Cancel Buttona basıldıgında---------------------//
cancelButton.addEventListener("click", () => {
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
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
    })
    .then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/Web/Pages/Home/Home.html";
      } else result.dismiss === Swal.DismissReason.cancel;
    });
});
