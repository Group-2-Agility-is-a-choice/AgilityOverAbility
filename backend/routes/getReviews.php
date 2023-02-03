<?php 

function callback()
{

    http_response_code(200);
    $pdo = PDO_config("LGLAdmin", "URlY6qOhsbrXqHr9");

    if(isset($_GET['RecipeID'])){

        $stmt = $pdo->prepare("SELECT * FROM Review WHERE RecipeID = ?");
        $stmt->execute([$_GET['RecipeID']]);
        $rtn = $stmt->fetchAll();  

    }
    else{
        
        $stmt = $pdo->prepare("SELECT * FROM Review");
        $stmt->execute([]);
        $rtn = $stmt->fetchAll();

    }

    return [
        "content-type" => "application/json",
        "content" => json_encode($rtn, JSON_PRETTY_PRINT)
    ];

}