import { getAllProducts } from "../firebase/index.js"

const myList = await getAllProducts();

export const products = myList;

//export default products;