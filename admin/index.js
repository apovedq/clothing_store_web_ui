import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js"
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js"


const firebaseConfig = {
    apiKey: "AIzaSyCyE7UUEym8TyQU9twXc0qKnvqe-lfLNSo",
    authDomain: "easy-login-6380b.firebaseapp.com",
    projectId: "easy-login-6380b",
    storageBucket: "easy-login-6380b.appspot.com",
    messagingSenderId: "126413954451",
    appId: "1:126413954451:web:ced2436d85495fbbb29c66",
    measurementId: "G-CW8YSYXW0X"
};

//Admin pass: 1234567;
//apoveda@gmail.com

const imgRoute = 'products-img';
//Initialization
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


const submitProduct = document.getElementById("add-product-admin")
submitProduct.addEventListener("click", () => { 
   addProduct();
})

const nameInput = document.getElementById("admin-name");
const tagInput = document.getElementById("admin-tag");
const seasonInput = document.getElementById("admin-season");
const priceInput = document.getElementById("admin-price");
const descriptionInput = document.getElementById("admin-description");

const succesAlert = document.getElementById("succes-message-admin");
succesAlert.style.display = "none"

//Put product values
let product;

function formatProduct() { 
    try {
        product = {
            name: nameInput?.value,
            tag: tagInput.value,
            season: seasonInput.value,
            price: priceInput.value,
            description: descriptionInput.value,
        }
    } catch (e) { 
        console.error("Error adding product")
    }
}

//Add new product 
async function addProduct() { 
    try { 
        formatProduct();

        const imgInput = document.getElementById('admin-img').files[0];
        
        const uploadedFileUrl = await addImage(imgInput.name, imgInput);
        console.log(uploadedFileUrl);


        const docRef = await setDoc(doc(db, "products", product.name), {
            name: product.name,
            tag: product.tag,
            season: product.season,
            price: product.price,
            description: product.description,
            imgUrl: uploadedFileUrl
        });

        nameInput.value = "";
        tagInput.value = "Tag";
        seasonInput.value = "Season";
        priceInput.value = "";
        descriptionInput.value = "";

        console.log("Document written with name:", product.name)
        succesAlert.style.display = "block"

    } catch (e) {
        console.error("Error adding document",e)
    }
}

//Add img file
async function addImage(name, file) { 

    const storageRef = ref(storage, `${imgRoute}/${name}`);

    try {
        await uploadBytes(storageRef, file)
        console.log(file)
        const url = await getDownloadURL(storageRef);
        return url
    } catch (err) { 
        console.error("Error uploading img: " + err.message)
    }

}
