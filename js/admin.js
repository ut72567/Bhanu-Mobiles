// Login Logic
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = document.getElementById('username').value;
        const p = document.getElementById('password').value;
        if (u === 'admin' && p === 'admin123') {
            sessionStorage.setItem('isAdmin', 'true');
            window.location.href = 'admin.html';
        } else {
            alert('Invalid Credentials');
        }
    });
}

// Admin Panel Logic
if (window.location.pathname.includes('admin.html')) {
    if (sessionStorage.getItem('isAdmin') !== 'true') {
        window.location.href = 'login.html';
    }

    const addProductForm = document.getElementById('add-product-form');
    const logoUpload = document.getElementById('logo-upload');

    // Handle Logo Change
    logoUpload.addEventListener('change', function() {
        const reader = new FileReader();
        reader.onload = function() {
            localStorage.setItem('siteLogo', reader.result);
            alert('Logo Updated!');
        };
        reader.readAsDataURL(this.files[0]);
    });

    // Add Product
    addProductForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = function() {
            const products = JSON.parse(localStorage.getItem('products')) || [];
            const newProduct = {
                id: Date.now(),
                name: document.getElementById('p-name').value,
                price: document.getElementById('p-price').value,
                desc: document.getElementById('p-desc').value,
                image: reader.result
            };
            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));
            location.reload();
        };
        reader.readAsDataURL(document.getElementById('p-image').files[0]);
    });

    // Render Admin Table
    const tableBody = document.querySelector('#admin-product-list tbody');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    tableBody.innerHTML = products.map((p, index) => `
        <tr>
            <td><img src="${p.image}" width="50"></td>
            <td>${p.name}</td>
            <td>₹${p.price}</td>
            <td><button onclick="deleteProduct(${index})" class="btn btn-danger">Delete</button></td>
        </tr>
    `).join('');
}

function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem('products'));
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    location.reload();
}
