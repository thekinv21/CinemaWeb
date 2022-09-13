//-------------------Get movies Api in TMBD ----------------------//
const myApi_key = "api_key=7b7fc4b328c6b537bb96b26a23377e89";
const myBase_url = "https://api.themoviedb.org/3";
const myApi_url = myBase_url + "/movie/upcoming?" + myApi_key;
const image_url = "https://image.tmdb.org/t/p/w500";
const searchUrl = myBase_url + "/search/movie?" + myApi_key;

//----------------------Take hmtl tags----------------------------//
const container = document.getElementById("main");
const searchİnput = document.querySelector(".search-movie");
const searchBtn = document.querySelector(".search");
const tagsContainer = document.querySelector(".tags");

//-----------------------Çağırılan Fontksyonlar------------------//
getMovie(myApi_url);
setGenre();

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

//-------------------get movies api data with fetch--------------//

function getMovie(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.results.length !== 0) {
        showMovies(data.results);
      } else {
        window.location.href = "/Web/Pages/404/404.html";
      }
    });
}
//-----------------------show movies on home page----------------//
function showMovies(data) {
  container.innerHTML = "";
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
    container.appendChild(movieEl);

    //------------------------Choice Film------------------------------------//
    biletAlbtn.addEventListener("click", () => {
      localStorage.setItem("selectedMovie", JSON.stringify(movie));

      window.location.href = "/Web/Pages/Movie/MovieDetails/MovieDetail.html";
    });
  });

  //---------------------------Choice film end---------------------------------//
}
//---------------------------Search Movie------------------------------------//

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (searchİnput.value === "") {
    Swal.fire("Warning!", "Arama Alanı Boş Bırakilmaz!", "warning");
  } else {
    if (searchİnput.value) {
      getMovie(searchUrl + "&query=" + searchİnput.value);
    } else {
      getMovie(myApi_url);
    }
  }

  searchİnput.value = "";
});
//-------------------------Genres Tags show----------------------//

const selectedGenre = [];
function setGenre() {
  tagsContainer.innerHTML = "";

  //---------------------GEt genres movie data--------------------//
  fetch("/Web/Data/movieData.json")
    .then((res) => {
      return res.json();
    })

    //------------------and  create film tags--------------------//
    .then((movieGenres) => {
      movieGenres.genres.forEach((genre) => {
        const tags = document.createElement("div");
        tags.classList.add("tag");
        tags.id = genre.id;
        tags.innerText = genre.name;

        tags.addEventListener("click", () => {
          if (selectedGenre.length == 0) {
            selectedGenre.push(genre.id);
          } else {
            if (selectedGenre.includes(genre.id)) {
              selectedGenre.forEach((id, idx) => {
                if (id === genre.id) {
                  selectedGenre.splice(idx, 1);
                }
              });
            } else {
              selectedGenre.push(genre.id);
            }
          }

          getMovie(
            myApi_url + "&with_genres=" + encodeURI(selectedGenre.join(","))
          );
          selectedTag();
        });

        tagsContainer.appendChild(tags);
      });
    });
}

//------------------------Seçilen Tag-------------------------------//
function selectedTag() {
  const tags = document.querySelectorAll(".tag");
  tags.forEach((tag) => {
    tag.classList.remove("secilenTag");
  });

  if (selectedGenre.length != 0) {
    selectedGenre.forEach((id) => {
      const selectedTags = document.getElementById(id);

      selectedTags.classList.add("secilenTag");
    });
  }
}
