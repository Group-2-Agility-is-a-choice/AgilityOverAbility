<?php

require('fpdf185/fpdf.php');

class PDF extends FPDF
{
    // Page header
    function RecipeTitle($title)
    {
        $this->AddFont('BungeeInline', '', 'BungeeInline-Regular.php');
        $this->SetFont('BungeeInline', '', 25);
        // Move to the right
        $this->Cell(80);
        // Title
        $this->Cell(30, 10, $title, 0, 0, 'C');
        // Line break
        $this->Ln(20);
    }

    function Ingredients($ingredients)
    {
        $this->AddFont('SegoeUII','','segoeuii.php');
        $this->SetFont('SegoeUII', '', 16);

        $this->Cell(0, 10, "Ingredients:", 0, 1);
        $this->Ln(2.5);

        $this->SetFont('SegoeUII', '', 12);

        for ($x = 0; $x < sizeof($ingredients); $x++)
            $this->Cell(0, 10, implode(" ", $ingredients[$x]), 0, 1);

    }

    // Page footer
    function Footer()
    {
        // Position at 1.5 cm from bottom
        $this->SetY(-15);
        // Arial italic 8
        $this->SetFont('SegoeUII', '', 8);
        // Page number
        $this->Cell(0, 10, 'Little Green Larder', 0, 0, 'C');
    }

    function MemImage($data, $x = null, $y = null, $w = 0, $h = 0, $link = '')
    {
        // Display the image contained in $data
        $v = base64_encode($data);
        $this->Image('data://image/png;base64,' . $v, $x, $y, $w, $h, 'png', $link);
    }

    function GDImage($im, $x = null, $y = null, $w = 0, $h = 0, $link = '')
    {
        // Display the GD image associated with $im
        ob_start();
        imagepng($im);
        $data = ob_get_clean();
        $this->MemImage($data, $x, $y, $w, $h, $link);
    }
}


function callback(){

    http_response_code(200);
    $pdo = PDO_config("LGLAdmin", "URlY6qOhsbrXqHr9");

    $stmt = $pdo->prepare("SELECT * FROM `Recipe` WHERE `RecipeID` = ?");
    $stmt->execute([$_GET['RecipeID']]);
    $recipeDetails = $stmt->fetchAll();

    $stmt = $pdo->prepare("SELECT Ingredient.Name, RecipeIngredients.Quantity, RecipeIngredients.Unit FROM `Ingredient` JOIN RecipeIngredients ON (Ingredient.IngredientID = RecipeIngredients.IngredientID)WHERE `RecipeID` = ?");
    $stmt->execute([$_GET['RecipeID']]);
    $ingredients = $stmt->fetchAll();


    // Instanciation of inherited class
    $pdf = new PDF();
    $pdf->AliasNbPages();
    $pdf->AddFont('SegoeUI','','segoeui.php');
    $pdf->AddPage();
    $pdf->RecipeTitle($recipeDetails[0]["Name"]);
    $pdf->Ingredients($ingredients);
    $im = imagecreatefromstring(file_get_contents($recipeDetails[0]["Image"]));
    $pdf->GDImage($im, 85, 33, 100, 100);
    $pdf->Ln(30);
    $pdf->SetFont('SegoeUI', '', 16);
    $pdf->Cell(0, 10, "Instructions:", 0, 1);
    $pdf->Ln(2.5);
    $pdf->SetFont('SegoeUI', '', 12);
    $recipeDetails[0]["Instructions"] = str_replace("–", "-", $recipeDetails[0]["Instructions"]);
    $pdf->MultiCell(0,10,$recipeDetails[0]["Instructions"],0);
    return [
        "content-type" => "application/pdf",
        "content" => $pdf->Output('s')
    ];

}




