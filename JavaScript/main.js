const products = []
let cart = JSON.parse(localStorage.getItem('cart')) || []
const cartContainer = document.getElementById('cartContainer')
const clearButton = document.getElementById('clearCart')

clearButton.addEventListener('click', () => {
    cart.length = 0;
    checkCart()
    localStorage.setItem('cart', JSON.stringify(cart))
})

class product {
    constructor(id, name, desc, price, img) {
        this.id = id
        this.name = name
        this.desc = desc
        this.price = price
        this.img = img
    }

    displayProduct() {
        const card = `
        <div class="cards m-5">
            <div class="cardBackg">
                <div class="card bg-transparent " style="width: 18rem;">
                    <img src="${this.img}"
                        class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${this.name}</h5>
                        <p class="card-text">${this.desc}</p>
                        <button class="btn btn-primary btnCart" data-id="sprint" id="${this.id}">Agregar $${this.price}</button>
                    </div>
                </div>
            </div>
        </div>
        `

        const container = document.getElementById('containerDOM')
        container.innerHTML += card
    }


    addCartEvent() {
        const btnCart = document.getElementById(`${this.id}`)
        const finderProduct = products.find(p => p.id == this.id)
        btnCart.addEventListener('click', () => addCart(finderProduct))
        checkCart()
    }  
}

const deleteFromCart = (prodId) => {
    const item = cart.find((prod) => prod.id == prodId)
    const index = cart.indexOf(item)
    cart.splice(index, 1)
    checkCart()
    localStorage.setItem('cart', JSON.stringify(cart))
}

const checkCart = () => {
    cartContainer.innerHTML = ""
    cart.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productInCart d-flex flex-row justify-content-between m-1')
        div.innerHTML = `
        <p class="pCart">Precio: $${prod.price}</p>
        <p class="pCart">${prod.name}</p>
        <button onclick = "deleteFromCart(${prod.id})" class="btn-delete btn-danger"><ion-icon name="trash-outline"></ion-icon></button>
        `
        cartContainer.appendChild(div)
    })
    const totalPrice = cart.reduce((acc, prod) => acc + prod.price, 0)
    tPrice.innerText = totalPrice.toFixed(2)
}


fetch('./local.json')
    .then(res => res.json())
    .then(data => {
        data.forEach(prod => {
            let newProd = new product(prod.id, prod.name, prod.desc, prod.price, prod.img)
            products.push(newProd)
        })
        products.forEach(e => {
            e.displayProduct()
        })
        products.forEach(e => {
            e.addCartEvent()
        })
    })

function addCart(products) {
    const inCart = cart.find(prod => prod.id === products.id)
    if (!inCart) {
        cart.push({ ...products})
        localStorage.setItem('cart', JSON.stringify(cart))
        checkCart()
    } else {
        let cartFiltered = cart.filter(prod => prod.id != inCart.id)
        cart = [
            ...cartFiltered,
            {
                ...inCart
            }
        ]
        localStorage.setItem('cart', JSON.stringify(cart))
    }
}
