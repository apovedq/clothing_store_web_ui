import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore, collection, getDocs, getDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js"
import { getStorage, ref, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js"

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


//Initialization
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

//User id
let uid;


//Log In Functions
let buttonSingOut = document.getElementById('sign-out-button');
buttonSingOut.addEventListener('click', (e) => logOut(e))

let selectedItems = document.getElementById('selected-items');
selectedItems.style.display = "none";

let signInForm = document.getElementById("sign-in-form");

let buttonSignIn = document.getElementById('sign-in-button');
buttonSignIn.addEventListener('click', (e) => logIn(e));

let titleLogIn = document.getElementById('offcanvasWithBothOptionsLabel');

function logIn(e) {
    e.preventDefault();
    let user = [{ email: "" }, { password: "" }]

    user.email = document.getElementById('loginName')?.value;
    user.password = document.getElementById('loginPassword')?.value;

    singInUser(user.email, user.password);
}

function logOut(e) {
    e.preventDefault();
    signOut(auth)
        .then(() => {
            console.log('Log Out succesfully');
            signInForm.style.display = "block";
            selectedItems.style.display = "none";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
}

let buttonRegister = document.getElementById('register-button');
buttonRegister.addEventListener('click', (e) => register(e));

function register(e) {
    e.preventDefault();
    let user = [{ email: "" }, { password: "" }]

    user.email = document.getElementById('registerEmail')?.value;
    user.password = document.getElementById('registerPassword')?.value;

    //Call firebase function 
    newUser(user.email, user.password);
}

//FIREBASE FUNCTIONS

//Firebase register

function newUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
           // console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
}

//Firebase Log In

function singInUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 

            const user = userCredential.user;
            console.log("Log in succesfull")
            uid = user.uid;
            validateAdmin(uid   );
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
}

//Firebase Check user status
    onAuthStateChanged(auth, (user) => {
        if (user) {
            uid = user.uid;
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            validateAdmin( uid);
            titleLogIn.textContent = "Items selected";
            signInForm.style.display = "none";
            selectedItems.style.display = "block";
            console.log(user.uid)
            // ...
        } else {
            // ...
            signInForm.style.display = "block";
            selectedItems.style.display = "none";
            validateAdmin("non");
            
        }
    });


const adminButton = document.getElementById("admin-access");

    //Check if user is admin 
function validateAdmin(user) { 

    if (user === "8UJOF3KbQyT1XHEVeiiNteqmHhF3") {
        adminButton.style.display = "block";
        console.log("is admin")
    } else { 
        adminButton.style.display = "none";
        console.log("no admin")
    }
}

//Traer todos los productos desde la base de datos
export async function getAllProducts() {
    const querySnapshot = await getDocs(collection(db, "products"));
    const mappedArray = [];
    querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        mappedArray.push(doc.data());
    });

    return mappedArray;
}


//Add item to cart

export async function drawUserCart() {
    const cartContainer = document.getElementById("cart-content");
    cartContainer.innerHTML = ``;

    let currentCart = await getUserCart();
    console.log(currentCart);

    let cartDisplay = currentCart.forEach((obj) => {
        // console.log(doc.id, " => ", doc.data());
        const cartObj = document.createElement('div');
        cartObj.innerHTML = `<img src="${obj.url}" alt="">
                        <section>
                            <h5>${obj.name}</h5>
                            <p>${obj.price}</p>
                        </section>`

        cartContainer.appendChild(cartObj);
    });

}

//Funcion para traer la informacion del usuario en la base de datos
export async function getUserCart() { 
   
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    //console.log(docSnap); 
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data().cart;
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return undefined;
    }
}

//Añadir al carro del usuario
export async function addDBCart(name, price, url) {
    let cart = await getUserCart();
    
    
    try {
        if (cart) { 
            const docRef = await setDoc(doc(db, "users", uid), {
                cart: [
                    ...cart,
                    { name, price, url }
                ]
            });
        } else { 
            const docRef = await setDoc(doc(db, "users", uid), {
                cart: [
                    { name, price, url }
                ]
            });
        }

    } catch (e) {
        console.error("Error adding document", e)
    }

}