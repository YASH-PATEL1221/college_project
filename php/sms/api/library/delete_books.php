<?php
    include("../connection.php");

    $connection = new Connection();

    $conn = $connection->connect();

    $BID = $_GET['q'];

    
    $query = "DELETE FROM `library` WHERE `book_id` = '$BID' ";

    $result = mysqli_query($conn,$query) or die("Connection lost");

    if($result == true){
        header("content-type:application/json");
        echo "record deleted";
        header("Location: http://localhost:3000/library/list");
    }else{
        echo "record not deleted";
    }
?>