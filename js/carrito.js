const itemsCards = document.getElementById("itemsCards")
const templateCard = document.getElementById("template-card").content
const fragment= document.createDocumentFragment()

let carrito = {}

document.addEventListener("DOMContentLoaded", () => {
    productData()
})

itemsCards.addEventListener("click", e => {
    addCarrito(e)
})

const productData = async () => {
    try {
        const res = await fetch("/js/productos.json")
        const data = await res.json();
        infoCards(data)
    } catch (error) {
        console.log(error)
    }
}

const infoCards = data => {
    data.forEach(producto => {
       templateCard.querySelector("h2").textContent = producto.nombre
       templateCard.querySelector("p").textContent = producto.precio
       templateCard.querySelector("img").setAttribute("src", producto.imagen)
       templateCard.querySelector(".btn-carrito").dataset.id = producto.id

       const clonar = templateCard.cloneNode(true)
       fragment.appendChild(clonar)
    })

    itemsCards.appendChild(fragment)
}

const addCarrito = e => {
    if(e.target.classList.contains("btn-carrito")){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    const productoCarrito = {
        id: objeto.querySelector(".btn-carrito").dataset.id,
        nombre: objeto.querySelector("h2").textContent,
        precio: objeto.querySelector("p").textContent,
        cantidad:1
    }

    if(carrito.hasOwnProperty(productoCarrito.id)){
        productoCarrito.cantidad = carrito[productoCarrito.id].cantidad + 1
    }

    carrito[productoCarrito.id] = {...productoCarrito}
    console.log(carrito)
}