let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchMenu();
    setupEventListeners();
});

function fetchMenu() {
    fetch('http://localhost:3001/menu')
        .then(response => response.json())
        .then(data => {
            const menuGrid = document.querySelector('.menu-grid');
            menuGrid.innerHTML = ''; // Clear existing content
            data.forEach(item => {
                const menuCard = createMenuCard(item);
                menuGrid.appendChild(menuCard);
            });
        })
        .catch(error => {
            console.error('Error fetching menu:', error);
            displayError('Failed to load menu. Please try again later.');
        });
}

function createMenuCard(item) {
    const menuCard = document.createElement('div');
    menuCard.className = 'menu-card';
    menuCard.innerHTML = `
        <img src="${item.image_url}" alt="${item.name}" class="menu-img" />
        <h3 class="menu-title">${item.name}</h3>
        <p class="menu-description">${item.description}</p>
        <p class="menu-price">$${item.price.toFixed(2)}</p>
        <button class="menu-button hover-menu-button" data-id="${item.id}">Add to Cart</button>
    `;
    return menuCard;
}

function setupEventListeners() {
    document.querySelector('.menu-grid').addEventListener('click', handleMenuClick);
    document.getElementById('cart-container').addEventListener('click', handleCartClick);
}

function handleMenuClick(event) {
    if (event.target.classList.contains('menu-button')) {
        const menuCard = event.target.closest('.menu-card');
        const itemId = event.target.getAttribute('data-id');
        const itemName = menuCard.querySelector('.menu-title').textContent;
        const itemPrice = parseFloat(menuCard.querySelector('.menu-price').textContent.slice(1));
        addToCart(itemId, itemName, itemPrice);
    }
}

function handleCartClick(event) {
    if (event.target.classList.contains('quantity-button')) {
        const itemId = event.target.getAttribute('data-id');
        if (event.target.classList.contains('increase')) {
            updateCartItemQuantity(itemId, 1);
        } else if (event.target.classList.contains('decrease')) {
            updateCartItemQuantity(itemId, -1);
        }
    } else if (event.target.classList.contains('cart-item-remove')) {
        const itemId = event.target.getAttribute('data-id');
        removeFromCart(itemId);
    } else if (event.target.id === 'checkout-button') {
        checkout();
    }
}

function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCartDisplay();
    saveCartToServer();
}

function updateCartItemQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateCartDisplay();
            saveCartToServer();
        }
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartDisplay();
    saveCartToServer();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
            <div class="cart-item-quantity">
                <button class="quantity-button decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-button increase" data-id="${item.id}">+</button>
            </div>
            <button class="cart-item-remove" data-id="${item.id}">Remove</button>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function saveCartToServer() {
    fetch('http://localhost:3001/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cart }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Cart saved successfully. Order ID:', data.orderId);
        } else {
            console.error('Failed to save cart:', data.error);
        }
    })
    .catch(error => {
        console.error('Error saving cart:', error);
        displayError('Failed to save cart. Please try again.');
    });
}

function checkout() {
    // Implement checkout logic here
    console.log('Checkout initiated');
    // You might want to send the cart to the server, clear the cart, and show a confirmation message
}

function displayError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    document.body.appendChild(errorElement);
    setTimeout(() => errorElement.remove(), 5000); // Remove after 5 seconds
}