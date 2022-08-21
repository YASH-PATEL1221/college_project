<?php
    include("../connection.php");

    $connection = new Connection();

    $connect = $connection->connect("localhost","root","","student management system");

    $course_id = $_POST["course_id"];
    $course_name = $_POST["course_name"];
    $teaching_faculty = $_POST["teaching_faculty"];

    $query = "UPDATE `course` SET `course_name`='$course_name',`teaching_faculty`='$teaching_faculty' WHERE `course_id`='$course_id' ";

    $result = mysqli_query($connect,$query) or dir(mysqli_error($connect));

    if($result && mysqli_affected_rows($connect)){
        header("content-type:application/json");
        print_r(json_encode(['row affected ' => mysqli_affected_rows($connect)]));
        header("Location: http://localhost:3000/courses/list");
    }else{
        echo "no records updated";
    }
?>