// Universal Navbar & Logo Loader
function initSite() {
    const logoData = localStorage.getItem('siteLogo');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    // Update Logo across pages
    const siteLogo = document.getElementById('site-logo');
    if (siteLogo && logoData) siteLogo.src = logoData;

    // Cart Count
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.innerText = cart.length;

    // Render Home Page Featured (Last 3)
    const featuredList = document.getElementById('featured-list');
    if (featuredList) {
        renderProducts(products.slice(-3), featuredList);
    }

    // Render Full Product List
    const productList = document.getElementById('product-list');
    if (productList) {
        renderProducts(products, productList);
    }

    // Load Single Product Detail
    const detailContainer = document.getElementById('product-detail');
    if (detailContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const pid = urlParams.get('id');
        const product = products.find(p => p.id == pid);
        if (product) {
            detailContainer.innerHTML = `
                <div class="detail-flex" style="display:flex; gap:30px; background:white; padding:20px;">
                    <img src="${product.image}" style="max-width:400px">
                    <div>
                        <h1>${product.name}</h1>
                        <h2 style="color:var(--primary)">₹${product.price}</h2>
                        <p>${product.desc}</p>
                        <button onclick="addToCart(${product.id})" class="btn">Add to Cart</button>
                    </div>
                </div>`;
        }
    }
}

function renderProducts(items, container) {
    container.innerHTML = items.map(p => `
        <div class="card">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <a href="product.html?id=${p.id}" class="btn">View Details</a>
        </div>
    `).join('');
}

window.onload = initSite;