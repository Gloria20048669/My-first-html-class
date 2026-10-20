
const orderForm = document.getElementById("order-form");
const savedOrders = document.getElementById("saved-orders");

// Get previously saved orders
let orders = JSON.parse(localStorage.getItem("libraryOrders")) || [];

// Display orders on the page
function displayOrders() {
    savedOrders.innerHTML = "";

    orders.forEach(function(order, index) {
        savedOrders.innerHTML += `
            <div>
                <h3>Order ${index + 1}</h3>
                <p>Book: ${order.bookName}</p>
                <p>Quantity: ${order.quantity}</p>
                <p>Price: KSh ${order.price}</p>
                <p>Total: KSh ${order.total}</p>
                <hr>
            </div>
        `;
    });
}

// Save a new order
orderForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const bookName = document.getElementById("book-name").value.trim();
    const quantity = Number(document.getElementById("quantity").value);
    const price = Number(document.getElementById("price").value);

    if (!bookName || quantity <= 0 || price < 0 ||
        !Number.isFinite(quantity) || !Number.isFinite(price)) {
        alert("Please enter valid order details.");
        return;
    }

    const order = {
        bookName: bookName,
        quantity: quantity,
        price: price,
        total: quantity * price,
        date: new Date().toLocaleString()
    };

    // Add order to the list
    orders.push(order);

    // Store orders in the browser
    localStorage.setItem("libraryOrders", JSON.stringify(orders));

    // Refresh the displayed orders
    displayOrders();

    alert("Order saved successfully!");

    orderForm.reset();
});

// Load saved orders when the page opens
displayOrders();
