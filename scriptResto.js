document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3001/menu')
        .then(response => response.json())
        .then(data => {
            const menuGrid = document.querySelector('.menu-grid');
            data.forEach(item => {
                const menuCard = document.createElement('div');
                menuCard.className = 'menu-card';
                menuCard.innerHTML = `
                    <img src="${item.image_url}" alt="${item.name}" class="menu-img" />
                    <h3 class="menu-title">${item.name}</h3>
                    <p class="menu-description">${item.description}</p>
                    <button class="menu-button hover-menu-button" data-id="${item.id}">Add to Cart</button>
                    <button class="remove-button hover-remove-button" data-id="${item.id}">Remove from Cart</button>
                `;
                menuGrid.appendChild(menuCard);
            });
        })
        .catch(error => {
            console.error('Error fetching menu:', error);
        });
});

document.querySelector('.menu-grid').addEventListener('click', event => {
    if (event.target.classList.contains('menu-button')) {
        const itemId = event.target.getAttribute('data-id');
        const quantity = 1; // Default quantity

        fetch('http://localhost:3001/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items: [{ id: itemId, quantity }] }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Order placed successfully. Order ID:', data.orderId);
            } else {
                console.error('Failed to place order:', data.error);
            }
        })
        .catch(error => {
            console.error('Error placing order:', error);
        });
    }

    if (event.target.classList.contains('remove-button')) {
        const itemId = event.target.getAttribute('data-id');

        fetch(`http://localhost:3001/order/${itemId}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Item removed from cart successfully');
                // Optionally, remove the item from the DOM or update the cart display
            } else {
                console.error('Failed to remove item from cart:', data.error);
            }
        })
        .catch(error => {
            console.error('Error removing item from cart:', error);
        });
    }
});
