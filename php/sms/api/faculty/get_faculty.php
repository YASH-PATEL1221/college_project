<?php
    include("../connection.php");

    $connection = new Connection();
    
    $conn = $connection->connect("localhost","root","","student management system");

    function getData($conn){
        if($conn){
            $query = "select * from faculty";
            $result = mysqli_query($conn,$query);
            $count = mysqli_num_rows($result);

            if($count > 0){
                while($row = mysqli_fetch_assoc($result)){
                    $arr[] = $row;
                }
                header("content-type:application/json");
                return ['status' => true ,'row affected ' => mysqli_affected_rows($conn), 'data' => $arr];
            }
        }else{
            header('http'.'500'.'internal server error');
            return "internal server error";
        }
    }

    print_r(json_encode(getData($conn)));
?>