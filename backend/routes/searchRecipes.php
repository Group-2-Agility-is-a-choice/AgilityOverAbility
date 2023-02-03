<?php

function callback()
{

    http_response_code(200);
    $pdo = PDO_config("LGLAdmin", "URlY6qOhsbrXqHr9");

    if (isset($_GET['ingredientsID']) && isset($_GET['avoidIngredients']) && isset($_GET['SweetOrSavoury']) && isset($_GET['SpiceLevel'])) {

          $wants = [];
          $temp = [];
          $size = sizeof($_GET['ingredientsID']);
  
          for ($x = 0; $x < $size; $x++) {
  
  
              $stmt = $pdo->prepare("SELECT Recipe.Name, Recipe.RecipeID, Recipe.Image, Recipe.ServingAmount, Recipe.Spicelevel, IFNULL(AVG(Review.Rating),0) FROM Recipe JOIN RecipeIngredients ON (Recipe.RecipeID = RecipeIngredients.RecipeID) LEFT JOIN Review ON (Recipe.RecipeID = Review.RecipeID)  
              WHERE RecipeIngredients.IngredientID = ? AND Recipe.SweetOrSavoury = ? AND Recipe.Spicelevel <= ?
              GROUP BY Recipe.RecipeID 
              ORDER BY `Recipe`.`RecipeID`  ASC");
              $stmt->execute([$_GET['ingredientsID'][$x],$_GET['SweetOrSavoury'],$_GET['SpiceLevel']] );
              $rtn = $stmt->fetchAll();
  
              if ($x === 0) {
                  $wants = $rtn;
  
              } else {
  
                  $temp = $wants;
                  $rslt_size = (sizeof($wants));
  
                  for ($y = 0; $y < $rslt_size; $y++) {
  
                      if (!in_array($temp[$y], $rtn)) {
  
                          unset($temp[$y]); 
  
                      }
                  }
                  $temp = array_values($temp);
                  $wants = $temp;
  
              }
          } 

        $avoids = [];
        $temp = [];
        $size = sizeof($_GET['avoidIngredients']);

        for ($x = 0; $x < $size; $x++) {


        $stmt = $pdo->prepare("SELECT Recipe.Name, Recipe.RecipeID, Recipe.Image, Recipe.ServingAmount, Recipe.Spicelevel, IFNULL(AVG(Review.Rating),0) FROM Recipe JOIN RecipeIngredients ON (Recipe.RecipeID = RecipeIngredients.RecipeID) LEFT JOIN Review ON (Recipe.RecipeID = Review.RecipeID)  
        WHERE Recipe.SweetOrSavoury = ? AND Recipe.Spicelevel <= ?
        GROUP BY Recipe.RecipeID HAVING COUNT(CASE WHEN RecipeIngredients.IngredientID = ? THEN 1 ELSE NULL END) = 0
        ORDER BY `Recipe`.`RecipeID`  ASC");
        $stmt->execute([$_GET['SweetOrSavoury'], $_GET['SpiceLevel'], $_GET['avoidIngredients'][$x]]);
        $rtn = $stmt->fetchAll();

        if ($x === 0) {
            $avoids = $rtn;

        } else {

            $temp = $avoids;
            $rslt_size = (sizeof($avoids));

            for ($y = 0; $y < $rslt_size; $y++) {

                if (!in_array($temp[$y], $rtn)) {

                    unset($temp[$y]); 

                }
            } 

            $temp = array_values($temp);
            $avoids = $temp;

        }
    }

        $wants = array_values($wants);
        $avoids = array_values($avoids);
        $rslt = [];

        for($z = 0; $z < sizeof($wants); $z++){

            for($a = 0; $a < sizeof($avoids); $a++){

                if ($wants[$z] == $avoids[$a]){
                    array_push($rslt, $wants[$z]);
                }
            }
        }


        return [
            "content-type" => "application/json",
            "content" => json_encode($rslt, JSON_PRETTY_PRINT)
        ];

}
        


    elseif (isset($_GET['ingredientsID']) && isset($_GET['SweetOrSavoury']) && isset($_GET['SpiceLevel'])) {

          $rslt = [];
          $temp = [];
          $size = sizeof($_GET['ingredientsID']);
  
          for ($x = 0; $x < $size; $x++) {
  
  
              $stmt = $pdo->prepare("SELECT Recipe.Name, Recipe.RecipeID, Recipe.Image, Recipe.ServingAmount, Recipe.Spicelevel, IFNULL(AVG(Review.Rating),0) FROM Recipe JOIN RecipeIngredients ON (Recipe.RecipeID = RecipeIngredients.RecipeID) LEFT JOIN Review ON (Recipe.RecipeID = Review.RecipeID)  
              WHERE RecipeIngredients.IngredientID = ? AND Recipe.SweetOrSavoury = ? AND Recipe.Spicelevel <= ?
              GROUP BY Recipe.RecipeID 
              ORDER BY `Recipe`.`RecipeID`  ASC");
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

  elseif (isset($_GET['ingredientsID'])) {

    $rslt = [];
    $temp = [];
    $size = sizeof($_GET['ingredientsID']);

    for ($x = 0; $x < $size; $x++) {


        $stmt = $pdo->prepare("SELECT Recipe.Name, Recipe.RecipeID, Recipe.Image, Recipe.ServingAmount, Recipe.Spicelevel, IFNULL(AVG(Review.Rating),0) FROM Recipe JOIN RecipeIngredients ON (Recipe.RecipeID = RecipeIngredients.RecipeID) LEFT JOIN Review ON (Recipe.RecipeID = Review.RecipeID)  
        WHERE RecipeIngredients.IngredientID = ?
        GROUP BY Recipe.RecipeID 
        ORDER BY `Recipe`.`RecipeID`  ASC");
        $stmt->execute([$_GET['ingredientsID'][$x]] );
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



  elseif (isset($_GET['avoidIngredients']) && isset($_GET['SweetOrSavoury']) && isset($_GET['SpiceLevel'])){

    $rslt = [];
    $temp = [];
    $size = sizeof($_GET['avoidIngredients']);

    for ($x = 0; $x < $size; $x++) {


        $stmt = $pdo->prepare("SELECT Recipe.Name, Recipe.RecipeID, Recipe.Image, Recipe.ServingAmount, Recipe.Spicelevel, IFNULL(AVG(Review.Rating),0) FROM Recipe JOIN RecipeIngredients ON (Recipe.RecipeID = RecipeIngredients.RecipeID) LEFT JOIN Review ON (Recipe.RecipeID = Review.RecipeID)  
        WHERE Recipe.SweetOrSavoury = ? AND Recipe.Spicelevel <= ?
        GROUP BY Recipe.RecipeID HAVING COUNT(CASE WHEN RecipeIngredients.IngredientID = ? THEN 1 ELSE NULL END) = 0
        ORDER BY `Recipe`.`RecipeID`  ASC");
        $stmt->execute([$_GET['SweetOrSavoury'], $_GET['SpiceLevel'], $_GET['avoidIngredients'][$x]]);
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
  
        $stmt = $pdo->prepare("SELECT Recipe.Name, Recipe.RecipeID, Recipe.Image, Recipe.ServingAmount, Recipe.Spicelevel, IFNULL(AVG(Review.Rating),0) FROM Recipe LEFT JOIN Review ON (Recipe.RecipeID = Review.RecipeID)  
        WHERE Recipe.SweetOrSavoury = ? AND Recipe.Spicelevel <= ?
        GROUP BY RecipeID
        ORDER BY `Recipe`.`RecipeID`  ASC");
  
          $stmt->execute([$_GET['SweetOrSavoury'], $_GET['SpiceLevel']]);
  
          $rtn = $stmt->fetchAll();

          return [
            "content-type" => "application/json",
            "content" => json_encode($rtn, JSON_PRETTY_PRINT)
        ];
  
  }
  
  else{
          $stmt = $pdo->prepare("SELECT Recipe.Name, Recipe.RecipeID, Recipe.Image, Recipe.ServingAmount, Recipe.Spicelevel,  IFNULL(AVG(Review.Rating), 0) FROM Recipe LEFT JOIN Review ON (Recipe.RecipeID = Review.RecipeID)  
          GROUP BY RecipeID
          ORDER BY `Recipe`.`RecipeID`  ASC");
  
          $stmt->execute([]);
  
          $rtn = $stmt->fetchAll(); 

          return [
            "content-type" => "application/json",
            "content" => json_encode($rtn, JSON_PRETTY_PRINT)
        ];
          
  }


}
