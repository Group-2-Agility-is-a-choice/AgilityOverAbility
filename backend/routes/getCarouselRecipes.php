<?php

function callback()
{

    http_response_code(200);
    $pdo = PDO_config("LGLAdmin", "URlY6qOhsbrXqHr9");

        $stmt = $pdo->prepare("SELECT * FROM Recipe ORDER BY RAND() LIMIT 3");
        $stmt->execute();
        $rtn = $stmt->fetchAll();
    
        return [
            "content-type" => "application/json",
            "content" => json_encode($rtn, JSON_PRETTY_PRINT)
        ];
    

    }
