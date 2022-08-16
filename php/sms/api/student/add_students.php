<?php
    include("../connection.php");

    $connection = new Connection();

    $connect = $connection->connect("localhost","root","","student management system");

    $sid = $_POST['sid'];
    $roll_no = $_POST['rollno'];
    $student_name = $_POST['student_name'];
    $dob = $_POST['dob'];
    $address = $_POST['address'];
    $gender = $_POST['gender'];
    $admission_date = $_POST['admission_date'];
    $phone_no = $_POST['phone_number'];
    $email = $_POST['email'];
    $cid = $_POST['cid'];

    $query = "INSERT INTO `student`(`SID`, `roll_no`, `student_name`, `dob`, `address`, `gender`, `admission_date`, `phone_no`, `email`,`CID`) 
                VALUES ('$sid','$roll_no','$student_name','$dob','$address','$gender','$admission_date','$phone_no','$email','$cid')
    ";

    $result = mysqli_query($connect,$query);

    if($result == true){
        header("content-type:application/json");
        print_r(json_encode(['row affected ' => mysqli_affected_rows($connect)]));
        header("Location: http://localhost:3000/student/list");
    }
    else{
        echo "record not inserted".mysqli_error($connect);
    }

?>