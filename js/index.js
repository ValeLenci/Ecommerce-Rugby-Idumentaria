const cardContainer = document.getElementById("container-products")

function createProductsCards(clothings) {
    clothings.forEach(clothing => {
        const newClothe = document.createElement("div");
        newClothe.classList = "card-clothes";
        newClothe.innerHTML = `
          <img src="${clothing.image}">
          <h3>${clothing.name}</h3>
          <p>$${clothing.price}</p>
          <button>Agregar al carrito</button>
        `;
        cardContainer.appendChild(newClothe);
    });
}

createProductsCards (clothings)