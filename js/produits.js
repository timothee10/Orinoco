// retrieving product IDs with dynamic address

var checkURL = window.location.href.indexOf('?');

if(checkURL!=-1)
{
  var end_url = window.location.href.substr(checkURL + 1);

// API data recovery with Fetch API
fetch('https://theeb.fr:3000/api/cameras/' + end_url)
  .then(response => {
    return response.json()
  })
  .then(data => {

// sending data to the DOM
    document.getElementById('photos').innerHTML = `<img class="img-fluid" src="${data.imageUrl}" alt="Photographie du ${data.name}">`;
    document.querySelector("h2").innerHTML = data.name;
    document.querySelector("h3").innerHTML = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.price/100));
    document.querySelector("p").innerHTML = data.description;

// loop for available options
    let optionsLength = data.lenses.length;
    for(let i = 0; i < optionsLength; i++){
      document.getElementById('options').innerHTML +=  `<option>${data.lenses[i]}</option>`;
    }
// adding a new product in the localstorage
    document.querySelector("button").addEventListener("click", function(event){
  
      event.preventDefault(); 

      var storage = {"id": data._id, "name": data.name,"price": data.price,"option": document.getElementById("options").value};

      number = localStorage.length+1;
      localStorage.setItem(number, JSON.stringify(storage));

      document.getElementById('info').innerHTML = `<section class="col-12 mt-3 p-2 bg-info text-white rounded text-center">Ce produit a été ajouté à votre panier ! <a href="panier.html" class="text-white"><u>Voir le panier</u></a></section>`;

      });            

})
// return to index in case of error
  .catch(err => {
    window.location.href =`index.html`;
  })
}

console.log(localStorage);

