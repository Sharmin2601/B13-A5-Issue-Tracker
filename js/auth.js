function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    
    if (user === 'admin' && pass === 'admin123') {
        
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid credentials! Please use admin / admin123');
    }
}