let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Dynamic price switching
document.addEventListener('DOMContentLoaded', () => {
    const pbSelect = document.getElementById('pb-size');
    const pfSelect = document.getElementById('pf-size');

    pbSelect.addEventListener('change', (e) => {
        const sizes = { '250': 150, '500': 280, '1000': 500 };
        const size = e.target.value;
        document.getElementById('pb-price').textContent = `KES ${sizes[size]}`;
    });

    pfSelect.addEventListener('change', (e) => {
        const sizes = { '500': 100, '1000': 180, '2000': 350 };
        const size = e.target.value;
        document.getElementById('pf-price').textContent = `KES ${sizes[size]}`;
    });

    updateCartDisplay();
    updateCartCount();
});

function addToCart(name, price, quantity, size) {
    const existingItem = cart.find(item => item.name === name && item.size === size);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name, price, quantity, size });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
    alert(`${name} ${size} added to cart!`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
}

function emptyCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.name} - ${item.size} (x${item.quantity}) - KES ${itemTotal}</span>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(div);
    });

    cartTotal.textContent = `KES ${total}`;
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function placeOrder() {
    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }

    let message = 'Hi! I want to place an order with Natural Harvest Foods:\n\n';
    cart.forEach(item => {
        message += `- ${item.name} ${item.size} x${item.quantity} = KES ${item.price * item.quantity}\n`;
    });
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `\nTotal: KES ${total}\n\nPay on Delivery. Free delivery in Kisumu. Please confirm!`;
    
    const whatsappUrl = `https://wa.me/254714520249?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}