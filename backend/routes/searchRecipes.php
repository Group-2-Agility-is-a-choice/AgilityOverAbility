<?php

function callback()
{

    http_response_code(200);
    $pdo = PDO_config("LGLAdmin", "URlY6qOhsbrXqHr9");


    if (isset($_GET['ingredientsID']) && isset($_GET['SweetOrSavoury']) && isset($_GET['SpiceLevel'])) {

          $rslt = [];
          $temp = [];
          $size = sizeof($_GET['ingredientsID']);
  
          for ($x = 0; $x < $size; $x++) {
  
  
              $stmt = $pdo->prepare("SELECT Recipe.Name, Recipe.ID, Recipe.Image, Recipe.ServingAmount, Recipe.Spicelevel FROM Recipe JOIN RecipeIngredients ON (Recipe.RecipeID = RecipeIngredients.RecipeID) JOIN Ingredient ON (RecipeIngredients.IngredientID = Ingredient.IngredientID) WHERE Ingredient.IngredientID = ? AND Recipe.SweetOrSavoury = ? AND Recipe.Spicelevel <= ?");
              $stmt->execute([$_GET['ingredientsID'][$x],$_GET['SweetOrSavoury'],$_GET['SpiceLevel']] );
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

          return [
            "content-type" => "application/json",
            "content" => json_encode($rtn, JSON_PRETTY_PRINT)
        ];
  
  }
  
  elseif (isset($_GET['ingredientsID']) && isset($_GET['SpiceLevel'])){ 
  
        $rslt = [];
          $temp = [];
          $size = sizeof($_GET['ingredientsID']);
  
          for ($x = 0; $x < $size; $x++) {
  
  
              $stmt = $pdo->prepare("SELECT Recipe.Name, Recipe.RecipeID, Recipe.Image, Recipe.ServingAmount, Recipe.Spicelevel FROM Recipe JOIN RecipeIngredients ON (Recipe.RecipeID = RecipeIngredients.RecipeID) JOIN Ingredient ON (RecipeIngredients.IngredientID = Ingredient.IngredientID) WHERE Ingredient.IngredientID = ? AND Recipe.Spicelevel <= ?");
              $stmt->execute([$_GET['ingredientsID'][$x],$_GET['SpiceLevel']]);
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

          return [
            "content-type" => "application/json",
            "content" => json_encode($rtn, JSON_PRETTY_PRINT)
        ];
  
  }
  
  elseif (isset($_GET['SweetOrSavoury']) && isset($_GET['SpiceLevel'])){ 
  
        $stmt = $pdo->prepare("SELECT Recipe.Name, Recipe.RecipeID, Recipe.Image, Recipe.ServingAmount, Recipe.Spicelevel FROM Recipe WHERE Recipe.SweetOrSavoury = ? AND Recipe.Spicelevel <= ?");
  
          $stmt->execute([$_GET['SweetOrSavoury'], $_GET['SpiceLevel']]);
  
          $rtn = $stmt->fetchAll();

          return [
            "content-type" => "application/json",
            "content" => json_encode($rtn, JSON_PRETTY_PRINT)
        ];
  
  }
  
  elseif (isset($_GET['ingredientsID']) && isset($_GET['SweetOrSavoury'])){ 
  
        $rslt = [];
          $temp = [];
          $size = sizeof($_GET['ingredientsID']);
  
          for ($x = 0; $x < $size; $x++) {
  
  
              $stmt = $pdo->prepare("SELECT Recipe.Name, Recipe.RecipeID, Recipe.Image, Recipe.ServingAmount, Recipe.Spicelevel FROM Recipe JOIN RecipeIngredients ON (Recipe.RecipeID = RecipeIngredients.RecipeID) JOIN Ingredient ON (RecipeIngredients.IngredientID = Ingredient.IngredientID) WHERE Ingredient.IngredientID = ? AND Recipe.SweetOrSavoury = ?");
              $stmt->execute([$_GET['ingredientsID'][$x],$_GET['SweetOrSavoury']]);
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

          return [
            "content-type" => "application/json",
            "content" => json_encode($rtn, JSON_PRETTY_PRINT)
        ];
  }

 

  elseif (isset($_GET['avoidIngredients']) && isset($_GET['SpiceLevel'])){

    $rslt = [];
    $temp = [];
    $size = sizeof($_GET['avoidIngredients']);

    for ($x = 0; $x < $size; $x++) {


        $stmt = $pdo->prepare("SELECT Recipe.Name, Recipe.RecipeID,Recipe.Image, Recipe.ServingAmount, Recipe.Spicelevel FROM Recipe JOIN RecipeIngredients ON (Recipe.RecipeID = RecipeIngredients.RecipeID) WHERE Recipe.Spicelevel <= ? GROUP BY Recipe.RecipeID HAVING COUNT(CASE WHEN RecipeIngredients.IngredientID = ? THEN 1 ELSE NULL END) = 0");
        $stmt->execute([$_GET['SpiceLevel'],$_GET['avoidIngredients'][$x]]);
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

    return [
      "content-type" => "application/json",
      "content" => json_encode($rtn, JSON_PRETTY_PRINT)
  ]; 


}
elseif (isset($_GET['avoidIngredients']) && isset($_GET['SweetOrSavoury'])){

    $rslt = [];
    $temp = [];
    $size = sizeof($_GET['avoidIngredients']);

    for ($x = 0; $x < $size; $x++) {


        $stmt = $pdo->prepare("SELECT Recipe.Name, Recipe.RecipeID,Recipe.Image, Recipe.ServingAmount, Recipe.Spicelevel FROM Recipe JOIN RecipeIngredients ON (Recipe.RecipeID = RecipeIngredients.RecipeID) WHERE Recipe.SweetOrSavoury = ? GROUP BY Recipe.RecipeID HAVING COUNT(CASE WHEN RecipeIngredients.IngredientID = ? THEN 1 ELSE NULL END) = 0");
        $stmt->execute([$_GET['SweetOrSavoury'],$_GET['avoidIngredients'][$x]]);
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

    return [
      "content-type" => "application/json",
      "content" => json_encode($rtn, JSON_PRETTY_PRINT)
  ]; 


}
  
  elseif (isset($_GET['SweetOrSavoury'])) {
  
          $stmt = $pdo->prepare("SELECT Recipe.Name, Recipe.RecipeID, Recipe.Image, Recipe.ServingAmount, Recipe.Spicelevel FROM Recipe WHERE Recipe.SweetOrSavoury = ?");
  
          $stmt->execute([$_GET['SweetOrSavoury']]);
  
          $rtn = $stmt->fetchAll();

          return [
            "content-type" => "application/json",
            "content" => json_encode($rtn, JSON_PRETTY_PRINT)
        ];
  
  }
  
  elseif (isset($_GET['SpiceLevel'])){
  
        $stmt = $pdo->prepare("SELECT Recipe.Name, Recipe.RecipeID, Recipe.Image, Recipe.ServingAmount, Recipe.Spicelevel FROM Recipe WHERE Recipe.Spicelevel <= ?");
  
          $stmt->execute([$_GET['SpiceLevel']]);
  
          $rtn = $stmt->fetchAll();

          return [
            "content-type" => "application/json",
            "content" => json_encode($rtn, JSON_PRETTY_PRINT)
        ];
  
  }
  
  elseif (isset($_GET['ingredientsID'])){ 
  
        $rslt = [];
          $temp = [];
          $size = sizeof($_GET['ingredientsID']);
  
          for ($x = 0; $x < $size; $x++) {
  
  
              $stmt = $pdo->prepare("SELECT Recipe.Name, Recipe.RecipeID,Recipe.Image, Recipe.ServingAmount, Recipe.Spicelevel FROM Recipe JOIN RecipeIngredients ON (Recipe.RecipeID = RecipeIngredients.RecipeID) JOIN Ingredient ON (RecipeIngredients.IngredientID = Ingredient.IngredientID) WHERE Ingredient.IngredientID = ?");
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

          return [
            "content-type" => "application/json",
            "content" => json_encode($rtn, JSON_PRETTY_PRINT)
        ]; 
  
  } 

    elseif(isset($_GET['avoidIngredients'])){ 

        $rslt = [];
        $temp = [];
        $size = sizeof($_GET['avoidIngredients']);

        for ($x = 0; $x < $size; $x++) {


            $stmt = $pdo->prepare("SELECT Recipe.Name, Recipe.RecipeID,Recipe.Image, Recipe.ServingAmount, Recipe.Spicelevel FROM Recipe JOIN RecipeIngredients ON (Recipe.RecipeID = RecipeIngredients.RecipeID) GROUP BY Recipe.RecipeID HAVING COUNT(CASE WHEN RecipeIngredients.IngredientID = ? THEN 1 ELSE NULL END) = 0");
            $stmt->execute([$_GET['avoidIngredients'][$x]]);
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

        return [
          "content-type" => "application/json",
          "content" => json_encode($rtn, JSON_PRETTY_PRINT)
      ]; 


    }
  
  else{
          $stmt = $pdo->prepare("SELECT Recipe.Name, Recipe.RecipeID, Recipe.Image, Recipe.ServingAmount, Recipe.Spicelevel FROM Recipe");
  
          $stmt->execute([]);
  
          $rtn = $stmt->fetchAll(); 

          return [
            "content-type" => "application/json",
            "content" => json_encode($rtn, JSON_PRETTY_PRINT)
        ];
          
  }


}
