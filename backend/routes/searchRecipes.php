<?php

function callback()
{

    http_response_code(200);
    $pdo = PDO_config("LGLAdmin", "URlY6qOhsbrXqHr9");

    //$ingredients = [$_GET['ingredientsID']];


    if (!isset($_GET['ingredientsID'])) {

        $stmt = $pdo->prepare("SELECT Recipe.Name, Recipe.Image, Recipe.ServingAmount, Recipe.Spicelevel FROM Recipe");

        $stmt->execute([]);

        $rtn = $stmt->fetchAll();

    } else {

        $rslt = [];
        $size = sizeof($_GET['ingredientsID']);

        for ($x = 0; $x < $size; $x++) {


            $stmt = $pdo->prepare("SELECT Recipe.RecipeID FROM Recipe JOIN RecipeIngredients ON (Recipe.RecipeID = RecipeIngredients.RecipeID) JOIN Ingredient ON (RecipeIngredients.IngredientID = Ingredient.IngredientID) WHERE Ingredient.IngredientID = ?");
            $stmt->execute([$_GET['ingredientsID'][$x]]);
            $rtn = $stmt->fetchAll();

            if ($x === 0) {
                $rslt = $rtn;
                //print_r($rslt);

            } else {
               /*  foreach ($rslt as $res) {
                    echo "ID: " . $res['RecipeID'] . "\n";

                    if (!in_array($res, $rtn)) {

                        unset($res);
                    }
                } */
                    $rslt_size = (sizeof($rslt));
                for ($y = 0; $y < $rslt_size; $y++) {
                    echo "ID: " . $rslt[$y]['RecipeID'] . "\n";

                    if (!in_array($rslt[$y], $rtn)) {

                        unset($rslt[$y]);
                    }



                }
            }
            print_r(sizeof($rslt));
            //print_r($rslt);

        }

    }



    return [
        "content-type" => "application/json",
        "content" => json_encode($rslt, JSON_PRETTY_PRINT)
    ];



}