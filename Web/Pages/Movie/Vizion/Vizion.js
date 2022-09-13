const moviesContainer = document.getElementById("new-films");
const todayDate = document.querySelector(".tarih");

const today = new Date();

todayDate.innerText = today.toDateString()


//-------------------Get movies Api in TMBD ----------------------//
const myApi_key = "api_key=7b7fc4b328c6b537bb96b26a23377e89";
const myBase_url = "https://api.themoviedb.org/3";
const myApi_url = myBase_url + "/movie/popular?" + myApi_key;
const image_url = "https://image.tmdb.org/t/p/w500";

//-----------------Çıkış yapıldıgında gösterilecek alert---------------//
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
//-----------------Çıkış yapıldıgında gösterilecek alert end--------------//

//--------------------Çağırılan Fonksyonlar-------------------//
getMovie(myApi_url);

function getMovie(url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.results.length !== 0) {
        showMovies(data.results);
      } else {
        window.location.href = "/Web/Pages/404/404.html";
      }
    });
}

function showMovies(data) {
  data.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    const { title, poster_path, overview, vote_average, release_date } = movie;

    movieEl.innerHTML = `
        <img src="${
          poster_path
            ? image_url + poster_path
            : "http://via.placeholder.com/1080x1580"
        }" alt="${title}"/>
        
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(
              vote_average
            )}"> Rating : ${vote_average}</span>
        </div>`;

    const filmAciklama = document.createElement("div");
    filmAciklama.classList.add("overview");

    const filmOverview = document.createElement("div");
    filmOverview.innerText = `${overview}`;
    filmAciklama.appendChild(filmOverview);
    movieEl.appendChild(filmAciklama);

    const filmİnfo = document.createElement("div");
    filmİnfo.classList.add("ticket-info");

    const filmTarih = document.createElement("div");
    filmTarih.innerText = `Tarih : ${release_date}`;

    const div = document.createElement("div");
    const biletAlbtn = document.createElement("button");
    biletAlbtn.classList.add("satin-al");
    biletAlbtn.innerText = "Bilet Al";

    div.appendChild(biletAlbtn);

    filmİnfo.appendChild(filmTarih);
    filmİnfo.appendChild(div);

    filmAciklama.appendChild(filmİnfo);

    //---------------------------Ratings color------------------------------//
    function getColor(vote) {
      if (vote >= 8) {
        return "green";
      } else if (vote >= 5) {
        return "orange";
      } else {
        return "red";
      }
    }

    moviesContainer.appendChild(movieEl);

    //------------------------Choice Film------------------------------------//
    biletAlbtn.addEventListener("click", () => {
      localStorage.setItem("selectedMovie", JSON.stringify(movie));
      window.location.href = "/Web/Pages/Movie/MovieDetails/MovieDetail.html";
    });
  });
}

