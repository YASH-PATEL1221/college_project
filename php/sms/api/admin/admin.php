<?php
    include("../connection.php");

    $connection = new Connection();

    $connect = $connection->connect("localhost","root","","student management system");



    function validate($conn){
        $name = $_POST["name"];
        $password = $_POST["password"];

        $query = "select name,password from admin";
        $result = mysqli_query($conn,$query);
        $count = mysqli_num_rows($result);
    
        if($count > 0){
            while($row = mysqli_fetch_assoc($result)){
                header("content-type:application/json");
                
                if($row["name"] == $name && $row["password"] == $password){
                    $data = json_encode(["authorized" => 1]);
                    // print_r($data);
                    return $data;
                }else{
                    $data = json_encode(["authorized" => 0]);
                    // print_r($data);
                }
               
            }
            return json_encode(["authorized" => 0]);
        }
    }
    

    print_r(validate($connect));
?>