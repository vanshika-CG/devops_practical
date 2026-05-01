document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            const loginData = {
                username: username,
                password: password
            };
            
            fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Login failed');
                }
            })
            .then(data => {
                // Store authentication token or session info
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('password', password);
                sessionStorage.setItem('isAuthenticated', 'true');
                
                // Redirect to dashboard
                window.location.href = '/dashboard';
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('Invalid username or password', 'error');
            });
        });
    }
});

function showMessage(message, type) {
    const existingMessage = document.querySelector('.alert');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type}`;
    messageDiv.textContent = message;
    
    const form = document.getElementById('loginForm');
    form.parentNode.insertBefore(messageDiv, form);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}
