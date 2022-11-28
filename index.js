//Preguntas

//1- Como centro mis elementos de drag y texto
//2 - Como asocio los links que necesito
//3. Por que se me corta en responsive
import { drawUserCart } from '../firebase/index.js';

drawUserCart();

window.addEventListener('load', function () { 

    //Define glider options to scroll.
    new Glider(document.querySelector('.carousel__list'), {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        dots: '.dots',
        arrows: {
            prev: '.glider-prev',
            next: '.glider-next'
        }
    })
})


window.addEventListener("load", () => {
    autoSlide();
})

function autoSlide() {
    setInterval(() => {
        slide(getItemActiveIndex() + 1);
    }, 3000); // slide speed = 3s
}

function slide(toIndex) {
    const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
    const itemActive = document.querySelector(".carousel_item__active");

    // check if toIndex exceeds the number of carousel items
    if (toIndex >= itemsArray.length) {
        toIndex = 0;
    }

    const newItemActive = itemsArray[toIndex];

    // start transition
    newItemActive.classList.add("carousel_item__pos_next");
    setTimeout(() => {
        newItemActive.classList.add("carousel_item__next");
        itemActive.classList.add("carousel_item__next");
    }, 40);

    // remove all transition class and switch active class
        newItemActive.addEventListener("transitionend", () => {
        itemActive.className = "carousel_item";
        newItemActive.className = "carousel_item carousel_item__active";
    }, {
        once: true
    });
}

function getItemActiveIndex() {
    const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
    const itemActive = document.querySelector(".carousel_item__active");
    const itemActiveIndex = itemsArray.indexOf(itemActive);
    return itemActiveIndex;
}