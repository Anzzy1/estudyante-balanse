const API_URL = 'http://localhost/backend/api';

// Check if user is logged in
function checkAuth() {
    const user = localStorage.getItem('user');
    if (user) {
        const userObj = JSON.parse(user);
        const nav = document.querySelector('nav');
        if (nav) {
            nav.innerHTML = `
                <a href="index.html">Home</a>
                <a href="dashboard.html">Dashboard</a>
                <a href="#" onclick="logout()">Logout (${userObj.name})</a>
            `;
        }
    }
}

// Login form handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const message = document.getElementById('message');
        
        try {
            const response = await fetch(`${API_URL}/login.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (data.success) {
                localStorage.setItem('user', JSON.stringify(data.user));
                message.textContent = data.message;
                message.className = 'success';
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                message.textContent = data.error;
                message.className = 'error';
            }
        } catch (error) {
            message.textContent = 'Connection error. Make sure XAMPP is running.';
            message.className = 'error';
        }
    });
}

// Register form handler
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const message = document.getElementById('message');
        
        try {
            const response = await fetch(`${API_URL}/register.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            });
            
            const data = await response.json();
            
            if (data.success) {
                message.textContent = data.message;
                message.className = 'success';
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1000);
            } else {
                message.textContent = data.error;
                message.className = 'error';
            }
        } catch (error) {
            message.textContent = 'Connection error. Make sure XAMPP is running.';
            message.className = 'error';
        }
    });
}

// Logout function
async function logout() {
    try {
        await fetch(`${API_URL}/logout.php`, {
            method: 'POST'
        });
    } catch (error) {
        console.error('Logout error:', error);
    }
    
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Initialize
checkAuth();
