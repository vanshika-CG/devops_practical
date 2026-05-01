<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Student - Student Management System</title>
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
                <li><a href="<c:url value='/students'/>">View Students</a></li>
                <li>
                    <a href="<c:url value='/add-student'/>" class="active">Add Student</a>
                </li>
            </ul>
        </nav>
        
        <main class="content">
            <h2>Add New Student</h2>
            
            <div id="message" class="alert" style="display: none;"></div>
            
            <form id="addStudentForm">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>
                </div>
                
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                
                <div class="form-group">
                    <label for="course">Course:</label>
                    <input type="text" id="course" name="course" required>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Add Student</button>
                    <a href="<c:url value='/students'/>" class="btn btn-secondary">Cancel</a>
                </div>
            </form>
        </main>
    </div>
    
    <script src="<c:url value='/js/add-student.js'/>"></script>
</body>
</html>
