<?php
include "inc.php";
// Search through recognised routes - run callback
$_routes = glob("./routes/*.php");
http_response_code(404);
foreach ($_GET as $key => $value) {
    $index = array_search("./routes/" . $key . ".php", $_routes);
    if ($index !== false) {
        include $_routes[$index];
        $return = callback();
        header("content-type: " . $return['content-type']);
        echo $return['content'];
        break;
    }
}