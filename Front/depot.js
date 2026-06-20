
const mainPreview = document.getElementById('mainPreview');
const fileInput = document.getElementById('File_1');
const thumbsContainer = document.getElementById('thumbsContainer');

const MAX_FILES = 6;
let selectedFiles = [];

mainPreview.addEventListener('click', () => fileInput.click());


fileInput.addEventListener('change', (e) => {

  mainPreview.querySelector(".placeholder").style.display = "none";
  let hh = document.getElementById('thumbsContainer');

  const Nb_img = e.target.files.length;

  // Nb_img = Nb_img <= 3 ? "" : 3;

  for (let i=0; i < Nb_img && Nb_img < 4; i++) {
  
    let files = URL.createObjectURL(e.target.files[i]);
    console.log(files);
    hh.innerHTML += `<div class="thumb" style= "background-image: url(${files});"></div>`;
    mainPreview.style.backgroundImage = `url("${files}")`;
  }


});