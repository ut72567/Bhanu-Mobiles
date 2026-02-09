function addToCart(productId) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let product = products.find(p => p.id == productId);
    // Check if already in cart
    let existing = cart.find(item => item.id == productId);
    
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({...product, qty: 1});
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
    window.location.reload();
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cartItems.innerHTML = cart.map((item, index) => {
        total += item.price * item.qty;
        return `
        <div class="card" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <img src="${item.image}" style="width:50px">
            <span>${item.name}</span>
            <span>₹${item.price}</span>
            <div>
                <button onclick="updateQty(${index}, -1)">-</button>
                <span>${item.qty}</span>
                <button onclick="updateQty(${index}, 1)">+</button>
            </div>
            <button onclick="removeItem(${index})" class="btn btn-danger">Remove</button>
        </div>`;
    }).join('');
    
    document.getElementById('total-amount').innerText = total;
}

function updateQty(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart[index].qty += change;
    if (cart[index].qty < 1) cart[index].qty = 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

renderCart();