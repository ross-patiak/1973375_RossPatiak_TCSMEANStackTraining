//create sessionStorage for cart if doesn't exist
if(sessionStorage.getItem("cart") === null) {
            
    sessionStorage.setItem("cart", JSON.stringify([]));

}

class Product {
    name: string;
    quantity: number;
    price: number;

    constructor(name: string, quantity: number, price: number) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
}

//add products into cart in Product format
const onAdd = (button) => {
    //have to get the parent div of the button that user is clicking to get info of that specific product
    const parentDiv = button.parentNode;

    const name:string = parentDiv.querySelector("#name").innerHTML;
    const price: number = parseFloat(parentDiv.querySelector("#price").innerHTML);
    let quantity:number = 1;
    

    const currentStorage:Array<Product> = JSON.parse(sessionStorage.getItem("cart"));
    const inCartItem:number = currentStorage.findIndex(item => item.name === name);

    //Array.findIndex returns -1 if it does not exist, so if it does exist then simply add onto quantity
    if(inCartItem !== -1) {
        currentStorage[inCartItem].quantity += 1;
        sessionStorage.setItem("cart", JSON.stringify(currentStorage));
    } else {
        let item = new Product(name, quantity, price);
        currentStorage.push(item);
        sessionStorage.setItem("cart", JSON.stringify(currentStorage));
    }

}

const onCheckout = () => {
    const cartItems:Array<Product> = JSON.parse(sessionStorage.getItem("cart"));
    console.log(cartItems);

    //for each post generate Post card element with these properties
    let total = 0;

    cartItems.forEach(product => {

        const { name, quantity, price } = product;
        total += (quantity*price);
        //create cartItem elements
        const productName = document.createElement("th"); productName.scope = "row";  productName.className = "cartItem";
        const productQuant = document.createElement("td");  productQuant.className = "cartItem";
        const productPrice = document.createElement("td");  productPrice.className = "cartItem";
        
        
        //post content assignment
        productName.innerHTML = name;
        productQuant.innerHTML = quantity.toString();
        productPrice.innerHTML = price.toString();

        //stitch cart elements to new row
        let newRow = document.createElement("tr");
        newRow.appendChild(productName);
        newRow.appendChild(productQuant);
        newRow.appendChild(productPrice);

        document.getElementById("cart").appendChild(newRow);

        document.getElementById("total").innerHTML = total.toString();

        

    });

}

//destroys rendered cart items so it doesnt re-render already existing items
const closeCheckout = () => {
    
    document.querySelectorAll(".cartItem").forEach(item => {
        item.remove();
    })

   
}