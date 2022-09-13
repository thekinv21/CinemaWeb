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


const watchMovie = document.querySelector(".buy-ticket");

watchMovie.addEventListener("click" , () => {

    window.location.href = "/Web/Pages/Home/Home.html";
})
