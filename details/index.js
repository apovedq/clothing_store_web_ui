let nameQueryParam = new URLSearchParams(window.location.search).get('name');
let product_detail;
import { products } from '../products/products_list.js'

searchProduct();
renderProduct();

function searchProduct() {
    product_detail = products.find((item) => { if (nameQueryParam === item.name) { return item } });
    console.log(product_detail);

}

function renderProduct() {
    const title = document.getElementById('detail-product-title');
    const tag = document.getElementById('detail-product-tag');
    const price = document.getElementById('detail-product-price');
    const description = document.getElementById('detail-product-description');
    const img = document.getElementById('detail-product-img');


    title.textContent = product_detail.name;
    tag.textContent = product_detail.tag;
    price.textContent = (`${'$ '} ${product_detail.price}`);
    description.textContent = product_detail.description;
    img.setAttribute('src', product_detail.imgUrl);

}

const addToCartButton = getElementById('detail-product-button');
addToCartButton.addEventListener('click', () => { 
    
})