// emptying the localstorage
localStorage.clear();

console.log(localStorage);

// retrieving URL data
var str = window.location.href ;
var url = new URL(str);
var order = url.searchParams.get("order");
var price = url.searchParams.get("price");

// sending data to the DOM
document.querySelector("section").innerHTML = `<p class="m-0 text-center">Merci pour votre commande !<br>Votre commande n° <span class="font-weight-bold text-info">${order}</span> a bien été enregistré.<br> <span class="text-success font-weight-bold">Prix total : ${(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price/100))}</span> </p>`;

// redirect if the URL is incomplete
if(order == null || price == null){
    window.location.href =`index.html`;
}

