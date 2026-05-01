document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const username = sessionStorage.getItem('username');
    if (!username) {
        window.location.href = '/login';
        return;
    }
    
    // Display username
    document.getElementById('username').textContent = username;
    
    // Load student data
    loadStudentData();
    
    const editStudentForm = document.getElementById('editStudentForm');
    
    if (editStudentForm) {
        editStudentForm.addEventListener('submit', function(e) {
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
            
            fetch(`/api/students/${window.studentId}`, {
                method: 'PUT',
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
                        throw new Error(text || 'Failed to update student');
                    });
                }
            })
            .then(data => {
                showMessage('Student updated successfully!', 'success');
                
                // Redirect to students page after 2 seconds
                setTimeout(() => {
                    window.location.href = '/students';
                }, 2000);
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage(error.message || 'Failed to update student', 'error');
            });
        });
    }
});

function loadStudentData() {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    
    fetch(`/api/students/${window.studentId}`, {
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
            throw new Error('Failed to load student data');
        }
    })
    .then(student => {
        document.getElementById('name').value = student.name;
        document.getElementById('email').value = student.email;
        document.getElementById('course').value = student.course;
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('Failed to load student data', 'error');
    });
}

function deleteStudent() {
    if (!confirm('Are you sure you want to delete this student?')) {
        return;
    }
    
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    
    fetch(`/api/students/${window.studentId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password),
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showMessage('Student deleted successfully', 'success');
            
            // Redirect to students page after 2 seconds
            setTimeout(() => {
                window.location.href = '/students';
            }, 2000);
        } else {
            throw new Error('Failed to delete student');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('Failed to delete student', 'error');
    });
}

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
