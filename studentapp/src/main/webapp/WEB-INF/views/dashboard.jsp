<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Student Management System</title>
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
                <li><a href="<c:url value='/dashboard'/>" class="active">Dashboard</a></li>
                <li><a href="<c:url value='/students'/>">View Students</a></li>
                <li id="adminMenu" style="display: none;">
                    <a href="<c:url value='/add-student'/>">Add Student</a>
                </li>
            </ul>
        </nav>
        
        <main class="content">
            <h2>Dashboard</h2>
            <div class="dashboard-cards">
                <div class="card">
                    <h3>Total Students</h3>
                    <p id="totalStudents">Loading...</p>
                </div>
                <div class="card">
                    <h3>Recent Activity</h3>
                    <p>Welcome to the Student Management System</p>
                </div>
            </div>
            
            <div class="actions">
                <a href="<c:url value='/students'/>" class="btn btn-primary">View All Students</a>
                <a href="<c:url value='/add-student'/>" id="addStudentBtn" class="btn btn-success" style="display: none;">Add New Student</a>
            </div>
        </main>
    </div>
    
    <script src="<c:url value='/js/dashboard.js'/>"></script>
</body>
</html>
