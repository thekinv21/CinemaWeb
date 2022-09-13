const fname = document.getElementById("first-name");
const lname = document.getElementById("last-name");
const kartNumber = document.getElementById("kart-numara");
const kartSon = document.getElementById("son-kullanim-tarihi");
const kartCvc = document.getElementById("cvc");
const paymentButton = document.querySelector(".payment-button");

//---------------------Click bought button ------------------------//
paymentButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    fname.value == "" ||
    lname.value == "" ||
    kartNumber.value == "" ||
    kartSon.value == "" ||
    kartCvc.value == ""
  ) {
    //---------------------Alert when inputs null ------------------------//
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Warning!",
      text: "Bütün Alanları Doldurunuz!",
      showConfirmButton: false,
      timer: 2000,
    });
  }

  //---------------------When inputs !== null ------------------------//
  else {
    //-------------------Get movie information------------------------//
    let movieDetail = localStorage.getItem("movieTicket");
    movieDetail = JSON.parse(movieDetail);
    //----------------Take movie and person information--------------//
    let movieTicket = {
      firstName: fname.value,
      lastName: lname.value,
      movieİnfo: movieDetail,
    };

    //-------------------------Confirm alert--------------------------//

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: "You want bought?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Buy it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
        confirmButtonColor: "green",
        cancelButtonColor: "red",
      })
      .then((result) => {
        //-------------------------Confirm Button Click--------------------------//
        if (result.isConfirmed) {
          localStorage.setItem("myTicket", JSON.stringify(movieTicket));
          window.location.href = "/Web/Pages/Home/Home.html";
        }

        //-------------------------Cancel Button Click--------------------------//
        else {
          result.dismiss === Swal.DismissReason.cancel;
        }
      });
  }
});
