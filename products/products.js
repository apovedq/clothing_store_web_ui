displayProduct();

function displayProduct() { 

    const productSection = document.getElementById('product-container-page');

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = `card border-fixed-cards justify-content-cards ${product.tag}`;
        card.innerHTML = `<img src="${product.imageURL}" class="card-img-top card-img-style" alt="...">
            <div class="card-body justify-content-cards space-between-cards">
                <p class="card-tag"> ${product.tag} </p>
                <h4 class="card-title">${product.name}</h4>
                <p class="card-text">${product.description}</p>
                <p class="card-priece"> ${product.price}</p>
                <a href="/details/?name=${product.name}"> 
                    <button class="card-button-products"> Buy </button>
                </a>
            </div>`
        
        productSection.append(card);
    })
}

/// Filter part

const filter_btns = document.querySelectorAll(".filter-button");
const filter_products = document.querySelectorAll(".card");

//Button filter
filter_btns.forEach(button => { 
    button.addEventListener('click', (e) => {
        e.preventDefault();

        const filter = e.target.dataset.filter;
        console.log(filter);
    
       // button.toggleClass('filter-button-active')

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
    })
})

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

