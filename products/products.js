

let myProducts;
myProducts = products;
displayProduct();

function displayProduct() { 

    
    const productSection = document.getElementById('product-container-page');
    productSection.innerHTML = '';

    myProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = `card border-fixed-cards justify-content-cards ${product.tag} ${product.season}`;
        card.innerHTML = `<img src="${product.imageURL}" class="card-img-top card-img-style" alt="...">
            <div class="card-body justify-content-cards space-between-cards">
                <p class="card-tag"> ${product.tag} </p>
                <h4 class="card-title">${product.name}</h4>
                <p class="card-text">${product.description}</p>
                <p class="card-priece"> ${'$ '} ${product.price}</p>
                <a href="/details/?name=${ product.name}"> 
                    <button class="card-button-products"> Buy </button>
                </a>
            </div>`
        
        productSection.append(card);
    })
}

/// Filter part

const filter_products = document.querySelectorAll(".card");

//Category LOGIC

const categorySelect = document.getElementById("category");
categorySelect.addEventListener("change", ()=>handleCategories(categorySelect))

function handleCategories(input) { 
   
    let filter = input.value;
    
    filter_products.forEach(product => {
        if (filter == 'all') {
            product.style.display = 'block'
        } else {
            if (product.classList.contains(filter)) {
                product.style.display = 'block'
            } else {
                product.style.display = 'none'
            }
        }
    })
}

//Season Atributte

const categorySelectSeason = document.getElementById("season-category");
categorySelectSeason.addEventListener("change", () => handleSeason(categorySelectSeason))

function handleSeason(input) {

    let filter = input.value;

    filter_products.forEach(product => {
        if (filter == 'all') {
            product.style.display = 'block'
        } else {
            if (product.classList.contains(filter)) {
                product.style.display = 'block'
            } else {
                product.style.display = 'none'
            }
        }
    })
}

 // Price attribute

const categorySelectPrice = document.getElementById("price-category");
categorySelectPrice.addEventListener("change", () => handlePrices(categorySelectPrice))

// !!!!!!!
//Intente hacer que cada vez que se refresque la pagina se recarge con los datos que tiene.


//categorySelectPrice.addEventListener("change", () => displayProduct())

function handlePrices(input) { 
    let filter = input.value;
    console.log(filter);


    if (filter === "min-price") {
        let products_organized = myProducts.sort((a, b) => (a.price > b.price ? 1 : -1));
        console.log(products_organized)
        myProducts = products_organized;
        displayProduct();
        
    }
    
    if(filter === "max-price"){ 

        let products_organized = myProducts.sort((a, b) => (a.price > b.price ? -1 : 1));
        console.log(products_organized)
        myProducts = products_organized;
        displayProduct();
    }

    myProducts.forEach(product => {
        console.log(+product.price);
    })
}

//Search filter

const search_filter = document.getElementById('search-products');

search_filter.addEventListener('keyup', (e) => { 
    e.preventDefault();

    const searchValue = search_filter.value.toLowerCase();

    filter_products.forEach(product => {
        if (product.classList.contains(searchValue)) {
            product.style.display = 'block'
        } else if (searchValue == "") {
            product.style.display = 'block'
        } else { 
            product.style.display = 'none'
        }
   })
})

