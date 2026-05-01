let currentPage = 0;
let pageSize = 10;
let totalPages = 0;
let currentSearch = '';

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
    
    // Load students
    loadStudents();
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
            document.getElementById('actionsHeader').style.display = 'table-cell';
        }
    })
    .catch(error => {
        console.log('User role check completed');
    });
}

function loadStudents() {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    
    let url = `/api/students?page=${currentPage}&size=${pageSize}`;
    if (currentSearch) {
        url = `/api/students/search?name=${encodeURIComponent(currentSearch)}&page=${currentPage}&size=${pageSize}`;
    }
    
    fetch(url, {
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
        displayStudents(data.content);
        updatePagination(data);
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('Failed to load students', 'error');
    });
}

function displayStudents(students) {
    const tbody = document.getElementById('studentsTableBody');
    tbody.innerHTML = '';
    
    if (students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">No students found</td></tr>';
        return;
    }
    
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>${new Date(student.createdAt).toLocaleDateString()}</td>
            <td style="display: none;" class="actions-cell">
                <a href="/edit-student?id=${student.id}" class="btn btn-sm btn-primary">Edit</a>
                <button onclick="deleteStudent(${student.id})" class="btn btn-sm btn-danger">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Show/hide actions column based on user role
    const actionsHeader = document.getElementById('actionsHeader');
    const actionsCells = document.querySelectorAll('.actions-cell');
    if (actionsHeader.style.display !== 'none') {
        actionsCells.forEach(cell => cell.style.display = 'table-cell');
    }
}

function updatePagination(data) {
    totalPages = data.totalPages;
    currentPage = data.number;
    
    document.getElementById('pageInfo').textContent = `Page ${currentPage + 1} of ${totalPages}`;
    
    document.getElementById('prevBtn').disabled = currentPage === 0;
    document.getElementById('nextBtn').disabled = currentPage >= totalPages - 1;
}

function searchStudents() {
    currentSearch = document.getElementById('searchInput').value.trim();
    currentPage = 0;
    loadStudents();
}

function previousPage() {
    if (currentPage > 0) {
        currentPage--;
        loadStudents();
    }
}

function nextPage() {
    if (currentPage < totalPages - 1) {
        currentPage++;
        loadStudents();
    }
}

function deleteStudent(id) {
    if (!confirm('Are you sure you want to delete this student?')) {
        return;
    }
    
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    
    fetch(`/api/students/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password),
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showMessage('Student deleted successfully', 'success');
            loadStudents();
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
