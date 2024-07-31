function addToCart(clothing) {
  const memory = JSON.parse(localStorage.getItem("clothes")) || [];
  let cuenta = 0;

  const indexMemory = memory.findIndex(clothes => clothes.id === clothing.id);
  if (indexMemory === -1) {
    const NuevaClothe = getNewProductForMemory(clothing);
    memory.push(NuevaClothe);
    cuenta = 1;
  } else {
    memory[indexMemory].cantidad++;
    cuenta = memory[indexMemory].cantidad;
  }

  localStorage.setItem("clothes", JSON.stringify(memory));
  updateNumberCart();
  return cuenta;
}

function subtractToCart(clothing) {
  const memory = JSON.parse(localStorage.getItem("clothes"));
  const indexMemory = memory.findIndex(clothes => clothes.id === clothing.id);
  if (memory[indexMemory].cantidad === 1) {
    memory.splice(indexMemory, 1);
  } else {
    memory[indexMemory].cantidad--;
  }
  localStorage.setItem("clothes", JSON.stringify(memory));
  updateNumberCart();
  return memory[indexMemory] ? memory[indexMemory].cantidad : 0;
}

function getNewProductForMemory(clothing) {
  const NuevaClothe = { ...clothing, cantidad: 1 };
  return NuevaClothe;
}

const cuentaCarritoElement = document.getElementById("cuenta_carrito");

function updateNumberCart() {
  const memory = JSON.parse(localStorage.getItem("clothes")) || [];
  if(memory && memory.length>0){
   const account = memory.reduce((acum, current) => acum + current.cantidad, 0);
   cuentaCarritoElement.innerText = account;
  } else {
    cuentaCarritoElement.innerText = 0;
  }
}

updateNumberCart();
