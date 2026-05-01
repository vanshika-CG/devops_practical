document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const username = sessionStorage.getItem('username');
    if (!username) {
        window.location.href = '/login';
        return;
    }
    
    // Display username
    document.getElementById('username').textContent = username;
    
    const addStudentForm = document.getElementById('addStudentForm');
    
    if (addStudentForm) {
        addStudentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const course = document.getElementById('course').value;
            
            const studentData = {
                name: name,
                email: email,
                course: course
            };
            
            const password = sessionStorage.getItem('password');
            
            fetch('/api/students', {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa(username + ':' + password),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentData)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.text().then(text => {
                        throw new Error(text || 'Failed to add student');
                    });
                }
            })
            .then(data => {
                showMessage('Student added successfully!', 'success');
                
                // Clear form
                addStudentForm.reset();
                
                // Redirect to students page after 2 seconds
                setTimeout(() => {
                    window.location.href = '/students';
                }, 2000);
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage(error.message || 'Failed to add student', 'error');
            });
        });
    }
});

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = `alert alert-${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
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
