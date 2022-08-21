<?php
    include("../connection.php");

    $connection = new Connection();

    $connect = $connection->connect("localhost","root","","student management system");

    function GetData($conn){
        if($conn){
            $query = "select * from library";
            $result = mysqli_query($conn,$query);
            $count = mysqli_num_rows($result);

            if($count > 0){
                while($row = mysqli_fetch_assoc($result)){
                    $arr[] = $row;
                }
                header("content-type:application/json");
                header('Access-Control-Allow-Origin: http://localhost:3000');
                return ['row affected ' => mysqli_affected_rows($conn),'status' => true , 'data' => $arr];
            }
        }else{
            header('http'.'500'.'internal server error');
            return "internal server error";
        }
    }

    print_r(json_encode(getData($connect)));
?>