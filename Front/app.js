const categories = [
  ['phone','Téléphones'],['microchip','Électronique'],['car','Véhicules'],['home','Maison & Jardin'],
  ['person-dress','Mode & Beauté'],['gamepad','Loisirs & Sports'],['baby','Bébé & Enfants'],['ellipsis-h','Autres'],
];
const recents = [
  ['p-galaxy.jpg','Samsung Galaxy A54','180 Fc','Gombe'],
  ['p-macbook.jpg','MacBook Air M1','650 Fc','Kinshasa'],
  ['p-sofa.jpg','Canapé 3 places','250 000 Fc','Limete'],
  ['p-nike.jpg','Nike Air Force 1','90 Fc','Ngaliema'],
  ['p-fridge.jpg','Réfrigérateur LG','320 Fc','Selembao'],
];
const deals = [
  ['p-iphone.jpg','iPhone 11 64Go','160 Fc','2 km'],
  ['p-ps5.jpg','PlayStation 5','450 Fc','3 km'],
  ['p-table.jpg','Table à manger 6 places','120 000 Fc','1 km'],
  ['p-jbl.jpg','Enceinte JBL Charge 5','60 Fc','2 km'],
  ['p-robe.jpg','Robe wax','15 000 Fc','1 km'],
];


const cats = document.getElementById('cats');
categories.forEach(([ic,lb])=>{
  cats.insertAdjacentHTML('beforeend',
    `<div class="cat"><div class="tile"><i class="fas fa-${ic}"></i></div><p>${lb}</p></div>`);
});

function product([img,t,p,l]){
  return `<div class="product">
    <div class="img"><img src="assets/${img}" alt="${t}" loading="lazy">
      <button class="fav"><i class="fas fa-heart"></i></button>
    </div>
    <div class="info"><p class="t">${t}</p><p class="p">${p}</p>
      <p class="l"><i class="fas fa-crosshairs"></i> ${l}</p></div>
  </div>`;
}
document.getElementById('recents').innerHTML = recents.map(product).join('');
document.getElementById('deals').innerHTML = deals.map(product).join('');
