document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3001/menu')
    .then(response => response.json())
    .then(data => {
        const menuGrid = document.querySelection('.menu-grid');
        data.forEach(item => {
            const menuCard = docuument.createElement('div');
            menuCard.className = 'menu-card';
            menuCard.innerHTML = `
                    <img src="${item.image_url}" alt="${item.name}" class="menu-img" />
                    <h3 class="menu-title">${item.name}</h3>
                    <p class="menu-description">${item.description}</p>
                    <button class="menu-button hover-menu-button" data-id="${item.id}">Add to Cart</button>
                `;
                menuGrid.appendChild(menuCard);
        });
    });
});

document.querySelector('.menu-grid').addEventListener('click', event => {
    if (event.target.classList.contains('menu-button')) {
        const itemId = event.target.getAttribute('data-id');

        console.log('Item added to cart:', itemId);
      }
  });