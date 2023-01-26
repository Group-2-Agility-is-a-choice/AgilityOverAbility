<?php

function callback()
{

    http_response_code(200);
    $pdo = PDO_config("LGLAdmin", "URlY6qOhsbrXqHr9");


    if (!isset($_GET['ingredientsID'])) {

        $stmt = $pdo->prepare("SELECT Recipe.Name, Recipe.Image, Recipe.ServingAmount, Recipe.Spicelevel FROM Recipe");

        $stmt->execute([]);

        $rtn = $stmt->fetchAll();

    } else {

        $rslt = [];
        $temp = [];
        $size = sizeof($_GET['ingredientsID']);

        for ($x = 0; $x < $size; $x++) {


            $stmt = $pdo->prepare("SELECT Recipe.Name, Recipe.Image, Recipe.ServingAmount, Recipe.Spicelevel FROM Recipe JOIN RecipeIngredients ON (Recipe.RecipeID = RecipeIngredients.RecipeID) JOIN Ingredient ON (RecipeIngredients.IngredientID = Ingredient.IngredientID) WHERE Ingredient.IngredientID = ?");
            $stmt->execute([$_GET['ingredientsID'][$x]]);
            $rtn = $stmt->fetchAll();

            if ($x === 0) {
                $rslt = $rtn;

            } else {

                $temp = $rslt;
                $rslt_size = (sizeof($rslt));

                for ($y = 0; $y < $rslt_size; $y++) {

                    if (!in_array($temp[$y], $rtn)) {

                        unset($temp[$y]); 

                    }
                


                }
                $temp = array_values($temp);
                $rslt = $temp;

            }
        }

        $rtn = $rslt;

    }



    return [
        "content-type" => "application/json",
        "content" => json_encode($rtn, JSON_PRETTY_PRINT)
    ];



}