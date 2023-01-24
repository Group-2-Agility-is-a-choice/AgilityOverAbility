<?php

function callback()
{

    http_response_code(200);
    $pdo = PDO_config("LGLAdmin", "URlY6qOhsbrXqHr9");

    $stmt = $pdo->prepare("SELECT * FROM `Recipe` WHERE `RecipeID` = ?");
    $stmt->execute([$_GET['RecipeID']]);
    $rtn = $stmt->fetchAll();

    return [
        "content-type" => "application/json",
        "content" => json_encode($rtn, JSON_PRETTY_PRINT)
    ];

}