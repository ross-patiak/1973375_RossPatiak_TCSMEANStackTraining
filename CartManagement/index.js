//create sessionStorage for cart if doesn't exist
if (sessionStorage.getItem("cart") === null) {
    sessionStorage.setItem("cart", JSON.stringify([]));
}
var Product = /** @class */ (function () {
    function Product(name, quantity, price) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
    return Product;
}());
//add products into cart in Product format
var onAdd = function (button) {
    //have to get the parent div of the button that user is clicking to get info of that specific product
    var parentDiv = button.parentNode;
    var name = parentDiv.querySelector("#name").innerHTML;
    var price = parseFloat(parentDiv.querySelector("#price").innerHTML);
    var quantity = 1;
    var currentStorage = JSON.parse(sessionStorage.getItem("cart"));
    var inCartItem = currentStorage.findIndex(function (item) { return item.name === name; });
    //Array.findIndex returns -1 if it does not exist, so if it does exist then simply add onto quantity
    if (inCartItem !== -1) {
        currentStorage[inCartItem].quantity += 1;
        sessionStorage.setItem("cart", JSON.stringify(currentStorage));
    }
    else {
        var item = new Product(name, quantity, price);
        currentStorage.push(item);
        sessionStorage.setItem("cart", JSON.stringify(currentStorage));
    }
};
var onCheckout = function () {
    var cartItems = JSON.parse(sessionStorage.getItem("cart"));
    console.log(cartItems);
    //for each post generate Post card element with these properties
    var total = 0;
    cartItems.forEach(function (product) {
        var name = product.name, quantity = product.quantity, price = product.price;
        total += (quantity * price);
        //create elements of blog post div w style
        var productName = document.createElement("th");
        productName.scope = "row";
        productName.className = "cartItem";
        var productQuant = document.createElement("td");
        productQuant.className = "cartItem";
        var productPrice = document.createElement("td");
        productPrice.className = "cartItem";
        //post content assignment
        productName.innerHTML = name;
        productQuant.innerHTML = quantity.toString();
        productPrice.innerHTML = price.toString();
        //stitch card elements together
        var newRow = document.createElement("tr");
        newRow.appendChild(productName);
        newRow.appendChild(productQuant);
        newRow.appendChild(productPrice);
        document.getElementById("cart").appendChild(newRow);
        document.getElementById("total").innerHTML = total.toString();
    });
};
//destroys rendered cart items so it doesnt re-render already existing items
var closeCheckout = function () {
    document.querySelectorAll(".cartItem").forEach(function (item) {
        item.remove();
    });
};
