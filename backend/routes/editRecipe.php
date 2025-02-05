<?php
include("upload_image.php");
function callback()
{
    http_response_code(200);
    $pdo = PDO_config("LGLAdmin", "URlY6qOhsbrXqHr9");

   
    $stmt = $pdo->prepare("SELECT sessionToken FROM User WHERE sessionToken = ?");
    $stmt->execute([$_GET['sessionToken']]);  
    $tok = $stmt->fetch();

   $tok = implode(" ",$tok);
    
 if($tok == $_GET['sessionToken']){

   
    if(isset($_GET['Name']) && isset($_GET['SpiceLevel']) && isset($_GET['Instructions']) && isset($_GET['ServingAmount']) && isset($_GET['SweetOrSavoury'])){

        $cfAPIKey = explode("\n", file_get_contents("_secret_CF_Key"));
        $_GET['image_owner'] = "LGL_Admin";
        $_GET['CDN_key'] = $cfAPIKey[2];
        $Image = uploadImage();
        
        if (isset($Image['error'])) {
            print_r($Image);
        }
    


        $stmt = $pdo->prepare("UPDATE `Recipe` SET `Name`= ?,`SpiceLevel`= ? ,`Instructions`=  ?,`ServingAmount`= ?,`SweetOrSavoury`= ? ,`Image`= ? WHERE RecipeID = ?");
        $stmt->execute([$_GET['Name'],$_GET['SpiceLevel'],$_GET['Instructions'],$_GET['ServingAmount'],$_GET['SweetOrSavoury'], json_decode($Image['content'])->CDN->variants[0], $_GET['RecipeID']]);
        $rtn = $stmt->fetchAll();
        echo "updated row";

            if (isset($_GET['Ingredient_Name']) && isset($_GET['Quantity']) && isset($_GET['Unit'])) {

                $ingredient_Name = $_GET['Ingredient_Name'];
                //$edit_Ingredient_Name = $_GET['new_Ingredient_Name'];
                $size = sizeof($_GET['Ingredient_Name']);

                $stmt = $pdo->prepare("SELECT `RecipeID` FROM `Recipe` WHERE `Name` = ?");
                $stmt->execute([$_GET['Name']]);
                $recipeID = $stmt->fetch();
                $recipeID = implode(" ", $recipeID);


                for ($x = 0; $x < $size; $x++) {

                    $stmt = $pdo->prepare("SELECT `IngredientID` FROM `Ingredient` WHERE `Name` = ?");
                    $stmt->execute([$ingredient_Name[$x]]);
                    $ingredientID = $stmt->fetch();
                    $ingredientID = implode(" ", $ingredientID);

                    $stmt = $pdo->prepare("UPDATE `RecipeIngredients` SET `Quantity`=?,`Unit`=? WHERE `RecipeID` = ? AND `IngredientID`= ?");
                    $stmt->execute([$_GET['Quantity'][$x], $_GET['Unit'][$x],$recipeID,$ingredientID]);

                }
            }   

        return [
            "content-type" => "application/json",
            "content" => json_encode($rtn, JSON_PRETTY_PRINT)
        ];
    


    }else{
        $rtn = "error inncorect not all data fields have been filled";
            return [
                "content-type" => "application/json",
                "content" => json_encode($rtn, JSON_PRETTY_PRINT)
            ];

    }
    

 }else{

        $rtn = "error invalid login token.";
     return [
        "content-type" => "application/json",
        "content" => json_encode($rtn, JSON_PRETTY_PRINT)
    ];
 }
}