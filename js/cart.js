const cardContainer = document.getElementById("container-products");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precios");
const reiniciarCarritoElement = document.getElementById("reiniciar");
const comprarArticulosElement =  document.getElementById ("comprar")

function createProductsCards() {
  cardContainer.innerHTML = "";
  const clothings = JSON.parse(localStorage.getItem("clothes")) || [];
  if (clothings.length > 0) {
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
        .addEventListener("click", (e) => {
          const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
          clothing.cantidad = addToCart(clothing); 
          cuentaElement.innerText = clothing.cantidad; 
          actualizarTotales();
        });
      newClothe
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
          if (clothing.cantidad > 0) {
            clothing.cantidad = subtractToCart(clothing); 
            if (clothing.cantidad === 0) {
              const index = clothings.indexOf(clothing);
              if (index > -1) {
                clothings.splice(index, 1);
              }
            }
            localStorage.setItem("clothes", JSON.stringify(clothings)); 
            createProductsCards(); 
            actualizarTotales();
          }
        });
    });
  } else {
    unidadesElement.innerText = 0;
    precioElement.innerText = 0;
  }
}

createProductsCards();
actualizarTotales();

function actualizarTotales() {
  const clothings = JSON.parse(localStorage.getItem("clothes")) || [];
  let unidades = 0;
  let precio = 0;
  if (clothings.length > 0) {
    clothings.forEach(clothing => {
      unidades += clothing.cantidad; 
      precio += clothing.price * clothing.cantidad; 
    });
  }
  unidadesElement.innerText = unidades;
  precioElement.innerText = precio; 
}

reiniciarCarritoElement.addEventListener("click",reiniciarCarrito);

function reiniciarCarrito() {
  localStorage.removeItem("clothes");
  actualizarTotales();
  createProductsCards();
  updateNumberCart();
  alert ("Su Carrito fue reiniciado!")
}

comprarArticulosElement.addEventListener("click",alertaCompra);

function alertaCompra (){
  alert ("Su Compra fue realizada!")
}

