
async function chargeannonces() {

  const reponse = await fetch("/main.html/annonces");
  const datas = await reponse.json();
  const contenair = document.getElementById('produits');

  datas.forEach( prdt => {
    
    let image_link = prdt.photo;
    let titre = prdt.nomProduit;
    let prix = prdt.prix
    let localisation = prdt.commune;

    contenair.innerHTML +=
      `<div class="carte_produit">
        <p style="display: none">${localisation}</p>
        <div class="cnt_img"><img src="${image_link}" alt="${titre}" loading="lazy">
          <button class="fav"><i class="fas fa-heart"></i></button>
        </div>
        <div class="info"><p class="titre">${titre}</p><p class="prix">${prix} Fc</p>
          <p class="Localisation"><i class="fas fa-crosshairs"></i>${localisation}</p></div>
      </div>`;

  });

}

function filtrage(){

  let filtre_actif = document.getElementsByClassName("active");
  filtre_actif = filtre_actif[0].textContent;
  
  let all_carte = document.querySelectorAll('.carte_produit');

  let categorie = document.getElementById("select");
  categorie = categorie.options[select.selectedIndex].text;

  all_carte.forEach(carte => {

  const delta = carte.querySelector("."+categorie).textContent;

  console.log(delta);
      
  if(filtre_actif === "Nioso"){
    carte.style.display = "block";

  }else{
    carte.style.display = delta == filtre_actif ? "block" : "none";
  }
    
  })
}

function categorisation(){

  
  const seleact = document.getElementById("select");
  const filtres  = document.querySelectorAll(".categorieDfiltre");

  filtres.forEach(el =>{ el.style.display = "none"});

  const valeur = seleact.value;
  const cible = document.getElementById(valeur);
  cible.style.display = ""; 

  let all_carte = document.querySelectorAll('.carte_produit')

  all_carte.forEach(carte => {carte.style.display = "block";})

}

const filters = document.querySelectorAll(".filter");
filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => 
      b.classList.remove("active"));
      btn.classList.add("active");
      filtrage(); 
    }
  )
  
});

document.getElementById("logos").addEventListener("click",() => { window.location.href = "/"})
document.getElementById("login").addEventListener('click',() => { window.location.href = "/Connexion.html"})
document.getElementById("select").addEventListener("change", categorisation);

chargeannonces();