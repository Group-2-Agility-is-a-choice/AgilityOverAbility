<?php

function callback()
{

    http_response_code(200);
    $pdo = PDO_config("LGLAdmin", "URlY6qOhsbrXqHr9");

    if(isset($_GET['RecipeID'])){

    $stmt = $pdo->prepare("DELETE FROM `Recipe` WHERE `RecipeID` = ?");
    $stmt->execute([$_GET['RecipeID']]);
    $rtn = $stmt->fetchAll();
        echo "deleted recipe";

        return [
            "content-type" => "application/json",
            "content" => json_encode($rtn, JSON_PRETTY_PRINT)
        ];
    

    }

}