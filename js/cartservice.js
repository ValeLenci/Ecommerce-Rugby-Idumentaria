function addToCart(clothing) {
   const memory = JSON.parse(localStorage.getItem ("clothes"))
   console.log(memory)
   if(!memory) {
       const NuevaClothe = getNewProductForMemory(clothing);
       localStorage.setItem("clothes", JSON.stringify([NuevaClothe]))
   } else {
      const indexMemory = memory.findIndex(clothes => clothes.id === clothing.id)
      const NewMemory = memory;
      if (indexMemory === -1){
          NewMemory.push(getNewProductForMemory(clothing))
      } else {
          NewMemory[indexMemory].cantidad ++;
      }
      localStorage.setItem("clothes", JSON.stringify(NewMemory))
   }
   
   updateNumberCart()
} 

function getNewProductForMemory (clothing) {
    const NuevaClothe = clothing;
    NuevaClothe.cantidad = 1;
    return NuevaClothe;
}

const cuentaCarritoElement = document.getElementById ("cuenta_carrito")

function updateNumberCart (){
    const memory = JSON.parse(localStorage.getItem ("clothes"))
    const account = memory.reduce((acum, current) => acum+current.cantidad, 0)
    cuentaCarritoElement.innerText = account;
}

updateNumberCart ()