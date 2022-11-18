import { getAllProducts } from "../firebase/index.js"

const myList = await getAllProducts();

console.log(myList);

export const products = myList;

//export default products;