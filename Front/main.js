
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
        <div class="cnt_img"><img src="assets/${image_link}" alt="${titre}" loading="lazy">
          <button class="fav"><i class="fas fa-heart"></i></button>
        </div>
        <div class="info"><p class="titre">${titre}</p><p id="prix">${prix} Fc</p>
          <p class="locate"><i class="fas fa-crosshairs"></i> ${localisation}</p></div>
      </div>`;

  });

}

function filtrage(){

  let filtre_actif = document.getElementsByClassName("active");
  filtre_actif = filtre_actif[0].textContent;
  

  let all_carte = document.querySelectorAll('.carte_produit')

  all_carte.forEach(carte => {

    const prix = carte.getElementById("prix").textContent;
      
    if(filtre_actif === "Nioso"){
      carte.style.display = "block";

    }else{
      carte.style.display = prix == filtre_actif ?  "block" : "none";
    }
    

  })
}


chargeannonces();

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


