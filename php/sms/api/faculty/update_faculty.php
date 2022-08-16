<?php
    include("../connection.php");
    

    $connection = new Connection();

    $connect = $connection->connect("localhost","root","","student management system");


    $fid = $_POST["fid"];
    $name = $_POST["name"];
    $phone_no = $_POST["mobile"];
    $email = $_POST["email"];
    $teaching_subject = $_POST["teachingsubject"];
    $gender = $_POST["gender"];
    $joining_date = $_POST["date"];
    $education = $_POST["degree"];
    $address = $_POST["address"];



    // $q = "UPDATE `faculty` SET `FID`='$fid',`name`='$name',`phone_no`='$phone_no',`email`='$email',`teaching_subject`='$teaching_subject',`gender`='$gender',`joining_date`='$joining_date',`education`='$education',`address`='$address' WHERE `FID` = '$fid'";
    $query = "UPDATE `faculty` SET `FID`='$fid',`name`='$name',`phone_no`='$phone_no',`email`='$email',`teaching_subject`='$teaching_subject',`gender`='$gender',`joining_date`='$joining_date',`education`='$education' WHERE `FID` = '$fid'";

    if($result = mysqli_query($connect,$query)){
        header("content-type:application/json");
        print_r(json_encode(['row affected ' => mysqli_affected_rows($connect)]));
        header("Location: http://localhost:3000/teachers/list");
    }else{
        echo "something went wrong";
    }
?>