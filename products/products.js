const products = [
    {
        imageURL: "https://cdn.shopify.com/s/files/1/0019/1863/1981/products/SACOMANZANILLAFRENTE_700x.jpg?v=1658781549",
        tag: "hoodie",
        name: "Manzanilla Art",
        description: "Linea Botánica, Coleccion de Hierbas, Hoodie 100% Algodon, ¿Qué esperas?",
        price: "$350,000",
    },

    {
        imageURL: "https://cdn.shopify.com/s/files/1/0019/1863/1981/products/camisetalavandacruda_700x.jpg?v=1658789670",
        tag: "t-shirt",
        name: "Lavanda crudo",
        description: "Linea Botánica, Coleccion de Hierbas, Hoodie 100% Algodon, ¿Qué esperas?",
        price: "$110,000",
    },

    {
        imageURL: "https://cdn.shopify.com/s/files/1/0019/1863/1981/products/bermudamanzanillafrentenegra_700x.jpg?v=1658782121",
        tag: "shorts",
        name: "Manzanilla negro",
        description: "Linea Botánica, Coleccion de Hierbas, Hoodie 100% Algodon, ¿Qué esperas?",
        price: "$100,000",
    },

    {
        imageURL: "https://cdn.shopify.com/s/files/1/0019/1863/1981/products/hoodiehierbasatras_700x.jpg?v=1658772343",
        tag: "hoodie",
        name: "Bomber Jacket",
        description: "De estilo bomber, esta chaqueta se integra a TRUE, Sientete TRUE, VIVE TRUE",
        price: "$330.000",
    },

    {
        imageURL: "https://cdn.shopify.com/s/files/1/0019/1863/1981/products/Pantalonetagatofrente_ec08b78e-2e6a-4758-9ffb-813d209c6f36_700x.jpg?v=1662916802",
        tag: "shorts",
        name: "Board Shorts - Waves",
        description: "Está hecho en un tejido fluidopensado para las exigencias de la playa, el sol o la piscina.",
        price: "$130.000",
    },

    {
        imageURL: "https://cdn.shopify.com/s/files/1/0019/1863/1981/products/camisetadelfinbco_700x.jpg?v=1662916423",
        tag: "t-shirt",
        name: "Love Story",
        description: "Llega con una silueta de corte clásico con bordado tipográfico frontal",
        price: "$140.000",
    },

    {
        imageURL: "https://cdn.shopify.com/s/files/1/0019/1863/1981/products/bermudahierbasfrente_700x.jpg?v=1658786789",
        tag: "shorts",
        name: "Cargo nude",
        description: "Está hecho en un tejido fluidopensado para las exigencias de la playa, el sol o la piscina.",
        price: "$130.000",
    },

    {
        imageURL: "https://cdn.shopify.com/s/files/1/0019/1863/1981/products/camisetastonersbeeratras_700x.jpg?v=1662918693",
        tag: "t-shirt",
        name: "La Vie en Rose",
        description: "Posee bordados tipográficos en punto corazón y espalda. La mejor amiga",
        price: "$115.000",
    },

    {
        imageURL: "https://cdn.shopify.com/s/files/1/0019/1863/1981/products/microdoserosado_700x.jpg?v=1655392690",
        tag: "hoodie",
        name: "Microdose",
        description: "De estilo bomber, esta chaqueta se integra a TRUE, Sientete TRUE, VIVE TRUE",
        price: "$330.000",
    },
]

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

