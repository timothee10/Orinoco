// Récupération des ID produits via l'URL, sur la page Poduits.html

var checkURL = window.location.href.indexOf('?') ;

if(checkURL!=-1)
{
  var end_url = window.location.href.substr(checkURL + 1);

// Récupération des données de l'API
fetch('http://localhost:3000/api/cameras/' + end_url)
  .then(response => {
    return response.json()
  })
  .then(data => {
    //console.log(data.name)

    // Envoi des données vers le DOM
    document.getElementById('photos').innerHTML = `<img class="img-fluid" src="${data.imageUrl}" alt="Photographie du ${data.name}">`;
    document.querySelector("h2").innerHTML = data.name;
    document.querySelector("h3").innerHTML = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.price));
    document.querySelector("p").innerHTML = data.description;
    let optionsLength = data.lenses.length;
    for(let i = 0; i < optionsLength; i++){
      document.getElementById('options').innerHTML +=  `<option>${data.lenses[i]}</option>`;
    }
  })
  .catch(err => {
    // Action en cas d'erreur
  })

}

// Récupération et stockage de la commande effectué par l'utilisateur

function controle(){

localStorage.setItem('storedName', document.querySelector("h2").textContent);
localStorage.setItem('storedPrice', document.querySelector("h3").textContent);
localStorage.setItem('storedQuantity', document.getElementById("quantity").value);
localStorage.setItem('storedOptions', document.getElementById("options").value);

document.getElementById('info').innerHTML = `<section class="col-12 mt-3 p-2 bg-info text-white rounded text-center">Ce produit a été ajouté à votre panier ! <a href="panier.html" class="text-white"><u>Voir le panier</u></a></section>`;

event.preventDefault();
};

