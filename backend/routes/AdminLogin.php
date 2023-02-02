<?php

function callback()
{

    
    
    http_response_code(200);
    $pdo = PDO_config("LGLAdmin", "URlY6qOhsbrXqHr9");
    $password = $_POST['password'];  
    
    $salt = "ctgl8U8eSyBzhm9UFLvT0jLJenpmCAhB";
    $hash = hash("sha256", $salt . $password);

    $stmt = $pdo->prepare("SELECT sessionToken FROM User WHERE Username = ? AND HashedPassword = ?");
    $stmt->execute([$_POST['username'], $hash]);

    if ($stmt->rowCount() > 0){

        http_response_code(200);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $tok = uniqid("TOK_", true);
        if ($row['sessionToken'] != null) {
            $stmt = $pdo->prepare("UPDATE User SET sessionToken = ? WHERE Username = ? and HashedPassword = ?");
            $stmt->execute([$tok, $_POST['username'], $hash]);


     }

        
     $rtn = [
        "username" => $_POST['username'],
        "sessionToken" => $tok
        ];
    
    return [
        "content-type" => "application/json",
        "content" => json_encode($rtn, JSON_PRETTY_PRINT)
        ];

    }

















}