const openModal = document.querySelector("#nav-modal");
const closeModal = document.querySelector("#close-modal");

openModal.addEventListener("click", () => {
  document.querySelector("body").style.overflow = "hidden";
  document.querySelector("#modal").style.display = "block";
});

closeModal.addEventListener("click", () => {
  document.querySelector("body").style.overflow = "auto";
  document.querySelector("#modal").style.display = "none";
});

const openModalSignup = document.querySelector("#open-signup");
const closeModalSignup = document.querySelector("#close-signup");

openModalSignup.addEventListener("click", () => {
  document.querySelector("body").style.overflow = "hidden";
  document.querySelector("#modal-signup").style.display = "block";
});

closeModalSignup.addEventListener("click", () => {
  document.querySelector("#modal").style.display = "none";
  document.querySelector("#modal-signup").style.display = "none";
  document.querySelector("body").style.overflow = "auto";
});

const openLogin = document.querySelector("#open-login");

openLogin.addEventListener("click", () => {
  document.querySelector("#modal-signup").style.display = "none";
  document.querySelector("body").style.overflow = "hidden";
  document.querySelector("#modal").style.display = "block";
});
