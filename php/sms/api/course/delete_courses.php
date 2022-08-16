<?php
    include("../connection.php");

    $connection = new Connection();

    $connect = $connection->connect("localhost","root","","student management system");

    $ID = $_GET["id"];


    $query = "DELETE FROM course WHERE course_ID = '$ID'";

    $result = mysqli_query($connect,$query) or dir(mysqli_error($connect));

    if($result){
        header("content-type:application/json");
        echo "record deleted";
        header("Location: http://localhost:3000/courses/list");
    }else{
        echo "record not delted";
    }
?>