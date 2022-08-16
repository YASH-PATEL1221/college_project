<?php
    include("../connection.php");



    $connection = new Connection();

    $conn = $connection->connect();

    function update_students($conn){
        $sid = $_POST['sid'];
        $roll_no = $_POST['roll_no'];
        $courseid = $_POST['courseid'];
        $student_name = $_POST['student_name'];
        $dob = $_POST['dob'];
        $address = $_POST['address'];
        $gender = $_POST['gender'];
        $admission_date = $_POST['admission_date'];
        $phone_no = $_POST['phone_no'];
        $email = $_POST['email'];

        
        $query = "UPDATE `student` SET `roll_no`='$roll_no',`student_name`='$student_name',`dob`='$dob',`address`='$address'
        ,`gender`='$gender',`admission_date`='$admission_date',`phone_no`='$phone_no',`email`='$email',`CID`='$courseid' WHERE SID=$sid";

        $result = mysqli_query($conn,$query);

        if($result == true){

            header("Access-Control-Allow-Origin: http://localhost:3000");
            print_r(json_encode(['row affected ' => mysqli_affected_rows($conn)]));
            header("Location: http://localhost:3000/student/list");
        }else{
            echo "record not updated";
        }
    }

    update_students($conn);
?>