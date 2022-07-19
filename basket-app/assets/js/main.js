let addToCartBtns = document.querySelectorAll("#addToCart");
let basketCount = document.querySelector("#count")

let products = JSON.parse(localStorage.getItem("products"));

if (products == null) {
    localStorage.setItem("products", JSON.stringify([]));
    products = [];
}


function updateBasketCount() {
    let products = JSON.parse(localStorage.getItem("products"));
    basketCount.innerText = products.length;
}

updateBasketCount();

function addToBasket(el) {
    let parent = el.parentElement.parentElement.parentElement;
    let productId = parent.id;
    let productImage = parent.querySelector(".card-img-top").src;
    let productTitle = parent.querySelector(".card-title").innerText;
    let productPrice = parent.querySelector(".card-text").innerText;

    let product = products.find(p => p.id == productId);

    if (product === undefined) {
        products.push({
            id : productId,
            image: productImage,
            title: productTitle,
            price: productPrice,
            count: 1
        })
    }else {
        product.count = +product.count + 1;
    }

    localStorage.setItem("products", JSON.stringify(products));

    updateBasketCount();
}

addToCartBtns.forEach(cartBtn => {
    cartBtn.addEventListener("click", (ev) => {
        addToBasket(ev.target)
    })
})