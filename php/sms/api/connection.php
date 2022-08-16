<?php

    class Connection{
        public $conn;

        function connect($host="localhost",$username="root",$password="",$database="student management system")
        {
            header("content-type:application/json");
            header('Access-Control-Allow-Origin: http://localhost:3000');
            header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
            $this->conn = mysqli_connect($host,$username,$password,$database);
            return $this->conn;
        }
    }
?>