//Array with clothes 1. Hodies 2. All 3. t-shirt 4. Jeans 5. Sneakers
const clothes_type_selector_imgs = ['./assets/hoodies_selection.png', './assets/all_selection.png', './assets/t-shirt_selection.png', './assets/jeans_selection.png', './assets/sneakers_selection.png'];
let clothes_type_counter = 0;

function clothes_type_carrousel(container) { 
    container.addEventListener('click', e => {
        let clothes_type_back_arrow = getElementById('clothes-type-back-arrow');
        let clothes_type_next_arrow = getElementById('clothes-type-next-arrow');
        let img = getElementById('clothes-type-selector-img');

        //Identifies what event you are trying to target 
        let toggle_event = e.target;

        if (toggle_event == clothes_type_back_arrow) { 
            console.log("pulsando tecla back");
            if (counter > 0) {
                img.src = clothes_type_selector_imgs[clothes_type_counter - 1]
                clothes_type_counter--;
            } else { 
                img.src = clothes_type_selector_imgs[clothes_type_selector_imgs.length - 1];
                clothes_type_counter = clothes_type_selector_imgs.length - 1;
            }
        }

        if (toggle_event == clothes_type_next_arrow) {
            console.log("pulsando tecla next");
            if (counter < clothes_type_selector_imgs.length - 1) {
                img.src = clothes_type_selector_imgs[clothes_type_counter + 1]
                clothes_type_counter++;
            } else {
                img.src = clothes_type_selector_imgs[0];
                clothes_type_counter = 0;
            }
        }
    })
}

document.addEventListener('DOMContentLoaded', () => { 
    let clothes_type_event_container = getElementById('clothes-type-mobile');
    clothes_type_carrousel(clothes_type_event_container);
})