<?php

function callback()
{

    http_response_code(200);
    $pdo = PDO_config("LGLAdmin", "URlY6qOhsbrXqHr9");

    $stmt = $pdo->prepare("SELECT sessionToken FROM User WHERE sessionToken = ?");
    $stmt->execute([$_GET['sessionToken']]);  
    $tok = $stmt->fetch();

   $tok = implode(" ",$tok);

    if ($tok == $_GET['sessionToken']) {

        if (isset($_GET['RecipeID'])) {

            $stmt = $pdo->prepare("DELETE FROM `RecipeIngredients` WHERE `RecipeID` = ?");
            $stmt->execute([$_GET['RecipeID']]);
            $rtn = $stmt->fetchAll();

            $stmt = $pdo->prepare("DELETE FROM `Recipe` WHERE `RecipeID` = ?");
            $stmt->execute([$_GET['RecipeID']]);
            $rtn = $stmt->fetchAll();
            

            return [
                "content-type" => "application/json",
                "content" => json_encode($rtn, JSON_PRETTY_PRINT)
            ];


        }

    }

}