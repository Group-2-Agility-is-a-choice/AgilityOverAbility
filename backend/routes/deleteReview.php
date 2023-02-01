<?php

function callback()
{

    http_response_code(200);
    $pdo = PDO_config("LGLAdmin", "URlY6qOhsbrXqHr9");

    if(isset($_GET['ReviewID'])){

    $stmt = $pdo->prepare("DELETE FROM `Review` WHERE `ReviewID` = ?");
    $stmt->execute([$_GET['ReviewID']]);
    $rtn = $stmt->fetchAll();

        return [
            "content-type" => "application/json",
            "content" => json_encode($rtn, JSON_PRETTY_PRINT)
        ];
    

    }

}