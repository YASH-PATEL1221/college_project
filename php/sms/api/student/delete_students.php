<?php
    include("../connection.php");

    $connection = new Connection();

    $conn = $connection->connect();

    $SID = $_GET['delete'];

    
    $query = "DELETE FROM student WHERE SID = $SID";

    $result = mysqli_query($conn,$query);

    if($result == true){
        header("content-type:application/json");
        echo "record deleted";
    }else{
        echo "record not deleted";
    }
?>