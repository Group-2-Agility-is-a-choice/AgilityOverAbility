<?php
// Search through recognised routes - run callback
$_routes = glob("./routes/*.php");
foreach ($_GET as $key => $value) {
    $index = array_search("./routes/" . $key . ".php", $_routes);
    if ($index !== false) {
        include $_routes[$index];
        callback();
    }
}