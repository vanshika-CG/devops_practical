document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const username = sessionStorage.getItem('username');
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    
    if (!username || isAuthenticated !== 'true') {
        window.location.href = '/login';
        return;
    }
    
    // Display username
    document.getElementById('username').textContent = username;
    
    // Check user role and show/hide admin features
    checkUserRole();
    
    // Load total students count
    loadTotalStudents();
});

function checkUserRole() {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    
    // Try to access admin-only endpoint to check role
    fetch('/api/students', {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password),
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // User has access, show admin features
            document.getElementById('adminMenu').style.display = 'block';
            document.getElementById('addStudentBtn').style.display = 'inline-block';
        }
    })
    .catch(error => {
        console.log('User role check completed');
    });
}

function loadTotalStudents() {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    
    fetch('/api/students?page=0&size=1', {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password),
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to load students');
        }
    })
    .then(data => {
        // Get total elements from paginated response
        const totalStudents = data.totalElements || 0;
        document.getElementById('totalStudents').textContent = totalStudents;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('totalStudents').textContent = 'Error';
    });
}

function logout() {
    // Clear session storage
    sessionStorage.clear();
    
    // Call logout endpoint
    fetch('/logout', {
        method: 'POST'
    })
    .then(() => {
        window.location.href = '/login';
    })
    .catch(error => {
        console.error('Logout error:', error);
        window.location.href = '/login';
    });
}
