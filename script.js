//----------------- for google sheet
const scriptURL =
  "https://script.google.com/macros/s/AKfycbx-TYYEME202eqBjm2hV8gMAr9s-9SgaLWaYEzHV37Tpbv6ByVOEysIDSj2yBzTksAu/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML = "Message sent successfully";
      setTimeout(function () {
        //after 5 miliseconds the msg will dissapear/empty
        msg.innerHTML = "";
      }, 5000);
      form.reset(); //reset the form after submit/ makes empty form
    })
    .catch((error) => console.error("Error!", error.message));
});



// -----------------for about me section tab
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
  for (tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}



//--------------for navbar in small screen
var sidemenu = document.getElementById("sidemenu");

function openMenu() {
  //opens the nav links on clicking menu bar
  sidemenu.style.right = "0"; // sidemenu ko style css ko right property ma 0 hal
}

function closeMenu(navlinks) {
  //closes the nav links on clicking -> X
  sidemenu.style.right = "-200px"; // sidemenu ko style css ko right property ma -200px hal
}


//---------------EmaiJS
