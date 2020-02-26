// Récupération de la commande effectué par l'utilisateur
document.getElementById("resultName").innerHTML = localStorage.getItem("storedName"); 
document.getElementById("resultPrice").innerHTML = localStorage.getItem("storedPrice"); 
document.getElementById("resultQuantity").innerHTML = localStorage.getItem("storedQuantity"); 
document.getElementById("resultOptions").innerHTML = localStorage.getItem("storedOptions"); 