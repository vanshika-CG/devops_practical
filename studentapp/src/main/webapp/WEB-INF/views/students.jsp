<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Students - Student Management System</title>
    <link rel="stylesheet" href="<c:url value='/css/style.css'/>">
</head>
<body>
    <div class="container">
        <header>
            <h1>Student Management System</h1>
            <div class="user-info">
                <span>Welcome, <span id="username"></span></span>
                <button onclick="logout()" class="btn btn-secondary">Logout</button>
            </div>
        </header>
        
        <nav class="sidebar">
            <ul>
                <li><a href="<c:url value='/dashboard'/>">Dashboard</a></li>
                <li><a href="<c:url value='/students'/>" class="active">View Students</a></li>
                <li id="adminMenu" style="display: none;">
                    <a href="<c:url value='/add-student'/>">Add Student</a>
                </li>
            </ul>
        </nav>
        
        <main class="content">
            <div class="content-header">
                <h2>Students</h2>
                <div class="actions">
                    <a href="<c:url value='/add-student'/>" id="addStudentBtn" class="btn btn-success" style="display: none;">Add Student</a>
                </div>
            </div>
            
            <div class="search-container">
                <input type="text" id="searchInput" placeholder="Search students by name...">
                <button onclick="searchStudents()" class="btn btn-primary">Search</button>
                <button onclick="loadStudents()" class="btn btn-secondary">Reset</button>
            </div>
            
            <div id="message" class="alert" style="display: none;"></div>
            
            <div class="table-container">
                <table id="studentsTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Course</th>
                            <th>Created At</th>
                            <th id="actionsHeader" style="display: none;">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="studentsTableBody">
                        <tr>
                            <td colspan="6" class="text-center">Loading students...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="pagination">
                <button onclick="previousPage()" id="prevBtn" class="btn btn-secondary" disabled>Previous</button>
                <span id="pageInfo">Page 1 of 1</span>
                <button onclick="nextPage()" id="nextBtn" class="btn btn-secondary" disabled>Next</button>
            </div>
        </main>
    </div>
    
    <script src="<c:url value='/js/students.js'/>"></script>
</body>
</html>
