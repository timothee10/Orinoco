console.log(localStorage);


// localstorage data recovery loop

if (localStorage.length == 0){
  document.getElementById('hidden').style.display = "none";
}

if (localStorage.length > 0) {
  
  var number = 0; // number of the loop
  var totalPrice = 0; // number of the total price
  var idProducts = []; // array to store product IDs

while (number < localStorage.length) {
  
  number++;

  products = JSON.parse(localStorage.getItem(number));
//sending data to the basket
  document.getElementById("cart").innerHTML += `<section class="col-12"><ul class="list-unstyled"><li><span class="font-weight-bold">Modèle :</span> ${products.name}</li><li><span class="font-weight-bold">Lentille :</span> ${products.option}</li><li><span class="font-weight-bold">Prix :</span> ` + ' ' + ` ${(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(products.price/100))}</li></ul></section>`;
  
  idProducts.push(products.id);
  totalPrice = totalPrice + products.price;
}
// sending the total price to the basket
    document.getElementById("cart").innerHTML += `<section class="col-12 text-success"><span><span class="font-weight-bold">Prix total :</span> ` + ' ' + `${(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalPrice/100))} </section>`;
// message if the localstorage is empty
  } else {
    document.getElementById("cart").innerHTML = `<section class="col-12 text-center">Votre panier est vide</section>`;
  }

   
console.log(localStorage);

// button to delete items stored in the cart 
document.getElementById('deleted').addEventListener("click", function(event){
    location.reload(event);
    localStorage.clear(event);
    });   

// Form control
document.forms["order"].addEventListener("submit", function(e) {

  event.preventDefault();

  var erreur;

  var inputs = document.getElementsByTagName("input");

  if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/.exec(inputs["email"].value) == null) {
		erreur = "Adresse email incorrecte";
	}

  for (var i = 0; i < inputs.length; i++) {
    if (!inputs[i].value) {
      erreur = "Veillez renseigner tous les champs";
    }
  }
  
  if (erreur){
      document.getElementById("info").innerHTML = `<section class="col-12 mt-3 p-2 bg-info text-white rounded text-center">${erreur}</section>`;
      return false;
    }
  else{

// sending a POST request to the API
    (async () => {
      const Response = await fetch('http://localhost:3001/api/cameras/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contact: {
            firstName: inputs["firstname"].value,
            lastName: inputs["name"].value,
            address: inputs["adress"].value,
            city: inputs["city"].value,
            email: inputs["email"].value
        
          },
          products: [
            idProducts
          ]
        })
      });
// retrieving response and creating URL
      const content = await Response.json();
      console.log(content);
      urlOrder = content.orderId; 
      urlPrice = totalPrice;
      window.location.href =`confirmation.html?order=${urlOrder}&price=${urlPrice}`; 
    })(); 
    
  }
 
});  











