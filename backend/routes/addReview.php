<?php
include("upload_image.php");
function callback()
{
    http_response_code(200);
    $pdo = PDO_config("LGLAdmin", "URlY6qOhsbrXqHr9");

   
    if(isset($_GET['Content']) && isset($_GET['Rating']) && isset($_GET['RecipeID']) && isset($_GET['Email']) && isset($_GET['Title'])){

        $cfAPIKey = explode("\n", file_get_contents("_secret_CF_Key"));
        $_GET['image_owner'] = "LGL_Admin";
        $_GET['CDN_key'] = $cfAPIKey[2];
        $Image = uploadImage();

        $email = $_GET['Email'];

        $salt = 'qwertyuiooiuyfdfghjiuygfcvbnjdedcvhjiuh';
        $hash = hash('sha256', $salt . $email);
        
        if (isset($Image['error'])) {
            print_r($Image);
        }
    

        $stmt = $pdo->prepare("INSERT INTO `Review`(`Content`, `Rating`, `RecipeID`,`Image`, `Email`, `Title`) VALUES (?,?,?,?,?,?)");
        $stmt->execute([$_GET['Content'],$_GET['Rating'],$_GET['RecipeID'], json_decode($Image['content'])->CDN->variants[0], $hash,$_GET['Title']]);
        $rtn = $stmt->fetchAll();
        echo "Added row";

        return [
            "content-type" => "application/json",
            "content" => json_encode($rtn, JSON_PRETTY_PRINT)
        ];
    

    }
}