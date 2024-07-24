const cardContainer = document.getElementById("container-products")
   
function createProductsCards() {
  cardContainer.innerHTML = "";
  const clothings = JSON.parse(localStorage.getItem("clothes"))
    if (clothings && clothings.length > 0) {
     clothings.forEach(clothing => {
        const newClothe = document.createElement("div");
        newClothe.classList = "card-clothes";
        newClothe.innerHTML = `
          <img src="${clothing.image}">
          <h3>${clothing.name}</h3>
          <p>$${clothing.price}</p>
          <div>
            <button>-</button>
            <span class="cantidad">${clothing.cantidad}</span>
            <button>+</button>
          </div>
        `;
        cardContainer.appendChild(newClothe);
        newClothe
          .getElementsByTagName("button")[1]
          .addEventListener("click",(e)=> {
            const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
            cuentaElement.innerText = addToCart(clothing);
          });
        newClothe
          .getElementsByTagName("button")[0]
          .addEventListener("click",(e)=> {
            subtractToCart(clothing);
            createProductsCards()
          });
     });
    }
}

createProductsCards()