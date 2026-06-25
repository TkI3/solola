
async function chargeannonces() {

  const reponse = await fetch("/main.html/annonces");
  const datas = await reponse.json();
  const contenair = document.getElementById('produits');

  datas.forEach( prdt => {
    
    let id = prdt.id;
    let image_link = prdt.preview;
    let titre = prdt.titre;
    let prix = prdt.prix;
    let localisation = prdt.commune;
    let district = prdt.district

    let categorie  = prdt.categorie

    contenair.innerHTML +=
      `<div class="carte_produit" data-id= "${id}" data-set = "${prix},${district},${localisation},${categorie},${titre}" >

        <div class="cnt_img"><img src="${image_link}" alt="${titre}" loading="lazy">
          <button class="fav"><i class="fas fa-heart"></i></button>
        </div>
          <div class="info">
            <p class="titre">#${id}<br>${titre}</p>
            <p class="prix">${prix} Fc</p>
            <p class="Localisation">
              <i class="fas fa-crosshairs"></i> ${localisation}
            </p>
          </div>
      </div>`;
      

  })

  document.querySelectorAll(".carte_produit").forEach(carte => carte.addEventListener("click",()=>{fetch(`/annonce?id=${carte.dataset.id}`.then(window.location.href = `/annonce?id=${carte.dataset.id}`))}));

  bar_accueil();
  
  ;

}

function CreateFilters() {

  const communes = [
    "Bandalungwa","Barumbu","Bumbu","Gombe","Kalamu","Kasa-Vubu","Kimbanseke",
    "Kinshasa","Kintambo","Kisenso","Lemba","Limete","Lingwala","Makala",
    "Maluku","Masina","Matete","Mont-Ngafula","Ndjili","Ngaba","Ngaliema",
    "Ngiri-Ngiri","Nsele","Selembao"
  ];
  const districts = ["Lukunga","Funa","Mont-Amba","Tshangu"];
  const categories = ["vetement","animaux","telephone","appareils","chaussures"] //!\\ Actualiser si depot/categorie change


  let locate = document.getElementById("parLocalisation");
  let district = document.getElementById("parDistrict");
  let categorie = document.getElementById("parCategorie");

  communes.forEach(e =>{locate.innerHTML += `<button class="filter">${e}</button>`;})
  districts.forEach(e =>{district.innerHTML += `<button class="filter">${e}</button>`;})
  categories.forEach(e =>{categorie.innerHTML += `<button class="filter">${e}</button>`;})

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

}

function categorisation(){
 
  const seleact = document.getElementById("select");
  const filtres  = document.querySelectorAll(".categorieDfiltre");

  filtres.forEach(el =>{ el.style.display = "none"});

  const valeur = seleact.value;

  if(valeur !== ""){
    const cible = document.getElementById(valeur);
    cible.style.display = ""; 
  }

  let all_carte = document.querySelectorAll('.carte_produit')
  all_carte.forEach(carte => {carte.style.display = "block";})

}

function filtrage(){

  let filtre_actif = document.getElementsByClassName("active");
  filtre_actif = filtre_actif[0].textContent;
  
  console.log(filtre_actif);
  let all_carte = document.querySelectorAll('.carte_produit');

  all_carte.forEach(carte => {
    const delta = carte.dataset.set;
    carte.style.display = filtre_actif === "Nionso"|| delta.includes(filtre_actif) ? "block" : "none";
  })
}
function search(){

    let cartes = document.querySelectorAll(".carte_produit");
    let current_search = barsch.value.toLowerCase();


    filtrage();

    cartes.forEach( crt => {
        if(!crt.dataset.set.toLowerCase().includes(current_search)){
            crt.style.display = "none";
        }
    })
}

function bar_accueil(){

    let ul  = new URL(document.URL);

    if(ul.searchParams.get("search")){;
        document.getElementById("barsch").value = ul.searchParams.get("search");
        search();
    }
}
//Barre  de recherche 
document.getElementById("barsch").addEventListener("input", search)

document.getElementById("logos").addEventListener("click",() => { window.location.href = "accueil.html"})
document.getElementById("login").addEventListener('click',() => { window.location.href = "Connexion.html"})
document.getElementById("depot").addEventListener("click",() => { window.location.href = "depot.html"});
document.getElementById("select").addEventListener("change", categorisation);

chargeannonces();
CreateFilters();
bar_accueil();
search();

