<?php
    include("../connection.php");

    $connection = new Connection();

    $connect = $connection->connect();

    $fid = $_GET['q'];

    $query = "DELETE FROM `faculty` WHERE FID = '$fid'";

    if($result = mysqli_query($connect,$query)){
        header("content-type:application/json");
        print_r(json_encode(['row affected ' => mysqli_affected_rows($connect)]));
        // header("Location: ".$_SERVER['HTTP_HOST'], true, 301);
    }else{
        echo "something went wrong";
    }
?>