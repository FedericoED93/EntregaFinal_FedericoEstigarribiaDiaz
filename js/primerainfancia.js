const cards = document.getElementById('cards')
const items = document.getElementById('items')
const itemsTotales = document.getElementById('items-totales')
const templateCard = document.getElementById('template-card').content
const templateItemsTotales = document.getElementById('template-itemsTotales').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        itemsCarrito()
    }
})
cards.addEventListener('click', e => {
    
    Toastify({
        text: "¡Añadido al carrito!", 
        duration: 1500,
        style: {
            background: "#FBDD00",
            color: "#7D7B76",
        },    
        }).showToast();

    addCarrito(e)
})

items.addEventListener('click', e => {
    btnAccion(e)
})

const fetchData = async () => {
    try {
        const res = await fetch('/js/primeraInfancia.json')
        const  data = await res.json()
        cargaProducto(data)
    } catch (error) {
        console.log(error)
    }
}

const cargaProducto = data => {
    data.forEach(producto => {
        templateCard.querySelector('h2').textContent = producto.nombre
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAttribute('src', producto.imagen)
        templateCard.querySelector('.btn-carrito').dataset.id = producto.id

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })

    cards.appendChild(fragment)
}

const addCarrito = e => {
    if(e.target.classList.contains('btn-carrito')){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.btn-carrito').dataset.id,
        nombre: objeto.querySelector('h2').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad : 1
    }

    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}
    itemsCarrito()
}

const itemsCarrito = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-suma').dataset.id = producto.id
        templateCarrito.querySelector('.btn-resta').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)

    totales()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const totales = () => {
    itemsTotales.innerHTML = ''
    if(Object.keys(carrito).length === 0){
        itemsTotales.innerHTML = '<th scope="row" colspan="5">hmmm...todavía no hay nada!</th>'

        return
    }

    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad,0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)

    templateItemsTotales.querySelectorAll('td')[0].textContent = nCantidad
    templateItemsTotales.querySelector('span').textContent = nPrecio

    const clone = templateItemsTotales.cloneNode(true)
    fragment.appendChild(clone)
    itemsTotales.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        itemsCarrito()
    })
}

const btnAccion = e => {
    if(e.target.classList.contains('btn-suma')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        itemsCarrito()
    }

    if(e.target.classList.contains('btn-resta')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }

        itemsCarrito()
    }

    e.stopPropagation()
}