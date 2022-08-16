<?php
    include("../connection.php");

    $connection = new Connection();

    $conn = $connection->connect("localhost","root","","student management system");

    $book_id = $_POST["book_id"];
    $author = $_POST["author"];
    $title = $_POST["title"];
    $price = $_POST["price"];
    $availability = $_POST["availability"];

    $query = "INSERT INTO `library`(`book_id`, `author`, `title`, `price`, `availability`) VALUES ('$book_id','$author','$title','$price','$availability')";

    $result = mysqli_query($conn,$query) or die(mysqli_error($conn));

    if(!$result){
        echo "record not inserted";
    }else{
        header("content-type:application/json");
        print_r(json_encode(['row affected ' => mysqli_affected_rows($conn)]));
        header("Location: http://localhost:3000/courses/list");
    }
?>