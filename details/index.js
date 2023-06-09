let nameQueryParam = new URLSearchParams(window.location.search).get('name');
let product_detail;
import { products } from '../products/products_list.js'
import { addDBCart, drawUserCart} from '../firebase/index.js';

let title, price, img;

drawUserCart();
searchProduct();
renderProduct();

function searchProduct() {
    //Busco en mi lista de productos.
    product_detail = products.find((item) => { if (nameQueryParam === item.name) { return item } });

}

function renderProduct() {
    title = document.getElementById('detail-product-title');
    const tag = document.getElementById('detail-product-tag');
    price = document.getElementById('detail-product-price');
    const description = document.getElementById('detail-product-description');
    img = document.getElementById('detail-product-img');


    title.textContent = product_detail.name;
    tag.textContent = product_detail.tag;
    price.textContent = (`${'$ '} ${product_detail.price}`);
    description.textContent = product_detail.description;
    img.setAttribute('src', product_detail.imgUrl);

}

const addToCartButton = document.getElementById('detail-product-button');
addToCartButton.addEventListener('click', () => { 
    console.log()
    addDBCart(product_detail.name, product_detail.price, product_detail.imgUrl);
    drawUserCart();
})