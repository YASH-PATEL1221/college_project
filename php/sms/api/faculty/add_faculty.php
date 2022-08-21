<?php
    include("../connection.php");

    $connection = new Connection();

    $connect = $connection->connect("localhost","root","","student management system");

    $name = $_POST["name"];
    $phone_no = $_POST["phonenumber"];
    $email = $_POST["email"];
    $teaching_subject = $_POST["teachingsubject"];
    $gender = $_POST["gender"];
    $joining_date = $_POST["joiningdate"];
    $education = $_POST["education"];

    $query = "INSERT INTO `faculty`(`name`, `phone_no`, `email`, `teaching_subject`, `gender`, `joining_date`, `education`) 
                    VALUES ('$name','$phone_no','$email','$teaching_subject','$gender','$joining_date','$education')";


    if($result = mysqli_query($connect,$query)){
        header("content-type:application/json");
        print_r(json_encode(['row affected' => mysqli_affected_rows($connect)]));
        header('Location:http://localhost:3000/teachers/add');
    }else{
        echo "something went wrong";
    }
?>