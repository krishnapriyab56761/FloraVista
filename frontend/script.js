//indexhtml 
const themes = [
    "#f4fff5",
    "#fff8e1",
    "#e3f2fd",
    "#fce4ec",
    "#ede7f6"
];

let index = 0;

document.getElementById("colorBtn").addEventListener("click", () => {
    index = (index + 1) % themes.length;
    document.body.style.backgroundColor = themes[index];
});

//style
// Animate the "Shop Now" button on load
window.addEventListener('load', () => {
  const shopBtn = document.querySelector('.shop');
  shopBtn.style.transform = 'scale(1.1)';
  setTimeout(() => {
    shopBtn.style.transform = 'scale(1)';
  }, 800);
});

// Add hover glow to feature cards
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 8px 16px rgba(255,193,7,0.5)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
  });
});
// Load plants
function loadPlants(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('plants');
      container.innerHTML = "";

      data.forEach(p => {
        const card = document.createElement('div');
        card.className = "card";
        card.innerHTML = `
          <h2>${p.name}</h2>
          <p>Category: ${p.category}</p>
          <p>Care: ${p.care}</p>
          <p class="price">₹${p.price}</p>
          <p class="stock ${p.stock > 0 ? 'in-stock' : 'out-stock'}">
            ${p.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>
          <button class="order-btn" data-id="${p._id}">Order Now</button>
        `;
        container.appendChild(card);
      });

      // Attach order button events
      document.querySelectorAll('.order-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const plantId = btn.getAttribute('data-id');
          const orderData = {
            customerName: prompt("Enter your name"),
            email: prompt("Enter your email"),
            plantId: plantId,
            quantity: 1
          };

          fetch('http://localhost:5000/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
          })
          .then(res => res.json())
          .then(data => alert(data.message));
        });
      });
    });
}

// Load first 15 plants
loadPlants('http://localhost:5000/plants');
