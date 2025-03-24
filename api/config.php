<?php
// Database configuration
define("DB_SERVER", "localhost:8889");
define("DB_USERNAME", "test");
define("DB_PASSWORD", "test1234");
define("DB_DATABASE", "WebDev");

// Create database connection
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

// Check connection
if ($conn->connect_error) {
    die("❌ Database connection failed: " . $conn->connect_error);
}
?>