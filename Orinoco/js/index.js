  // Affichage dynamique des produit disponible sur l'index, via fetch()
  
  fetch('http://localhost:3000/api/cameras')
    .then(response => response.json())
    .then(data => {
      var articles = '';
        data.forEach(function(item){
           articles += `<a title="Voir les détails du produit" href="produits.html?${item._id}"><section class="shadow-sm p-3 mb-3 bg-white rounded h4 text-center">${item.name}</section><a>`;
        });
        document.getElementById('articles').innerHTML = articles;
    }) 

  


