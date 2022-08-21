<?php
    include("../connection.php");

    $connection = new Connection();

    $conn = $connection->connect("localhost","root","","student management system");

    $course_id = $_GET["id"];

    $query = "SELECT `course_id` FROM `course` WHERE `course_id` = '$course_id'";

    $result = mysqli_query($conn,$query) or die(mysqli_error($conn));
    $count = mysqli_num_rows($result);

    header("content-type:application/json");
    header('Access-Control-Allow-Origin: http://localhost:3000');
    if($count > 0){
        
       print_r(json_encode(['is_Available' => false]));
    }else{
        print_r(json_encode(['is_Available' => true]));
    }
?>