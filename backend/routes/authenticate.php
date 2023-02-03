<?php 

function callback(){

    http_response_code(200);
    $pdo = PDO_config("LGLAdmin", "URlY6qOhsbrXqHr9");


    $stmt = $pdo->prepare("SELECT sessionToken FROM User WHERE sessionToken = ?");
    $stmt->execute([$_GET['sessionToken']]);  
    $stmt->fetch(); 

    if ($stmt->rowCount() === 1){

        $authenticated = "yes";

    }
    else{

        $authenticated = "no";

    } 

    return [
        "content-type" => "application/json",
        "content" => json_encode($authenticated, JSON_PRETTY_PRINT)
    ];

}