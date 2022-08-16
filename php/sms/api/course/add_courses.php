<?php
    include("../connection.php");

    $connection = new Connection();

    $conn = $connection->connect("localhost","root","","student management system");

    $course_id = $_POST["course_id"];
    $course_name = $_POST["course_name"];
    $course_description = $_POST["course_description"];
    $teaching_faculty = $_POST["teaching_faculty"];


    $query = "INSERT INTO `course`(`course_id`, `course_name`, `teaching_faculty`, `description`) VALUES ('$course_id','$course_name','$teaching_faculty','$course_description')";

    $result = mysqli_query($conn,$query) or die(mysqli_error($conn));


    if(!$result){
        echo "record not inserted";
    }else{
        header("content-type:application/json");
        print_r(json_encode(['row affected ' => mysqli_affected_rows($conn)]));
        header("Location: http://localhost:3000/courses/list");
    }
?>