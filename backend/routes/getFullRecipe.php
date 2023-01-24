<?php

function callback()
{

    http_response_code(200);
    $pdo = PDO_config("LGLAdmin", "URlY6qOhsbrXqHr9");

    $stmt = $pdo->prepare("SELECT Ingredient.Name, RecipeIngredients.Quantity, RecipeIngredients.Unit
    FROM Recipe 
    JOIN RecipeIngredients ON (Recipe.RecipeID = RecipeIngredients.RecipeID) 
    JOIN Ingredient ON (RecipeIngredients.IngredientID = Ingredient.IngredientID)
    WHERE Recipe.RecipeID = ?");
    $stmt->execute([$_GET['RecipeID']]);
    $ingredients = $stmt->fetchAll();

    $stmt = $pdo->prepare("SELECT * FROM `Recipe` WHERE `RecipeID` = ?");
    $stmt->execute([$_GET['RecipeID']]);
    $recipeDetails = $stmt->fetchAll();

    $rtn = [
        "ingredients" => $ingredients,
        "recipeDetails" => $recipeDetails
    ];

    return [
        "content-type" => "application/json",
        "content" => json_encode($rtn, JSON_PRETTY_PRINT)
    ];

}