<?php 

require('fpdf185/fpdf.php'); 

if (isset($_GET['RecipeID'])){

    $pdf = new FPDF();
    $pdf->AddPage(); 
    $pdf->SetFont('Arial','B',16);
    $pdf->Cell(40,10,'Hello World!');
    $pdf->Output();

}

return [
    "content-type" => "application/pdf",
    "content" => json_encode($pdf, JSON_PRETTY_PRINT)
];

?>