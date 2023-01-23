<?php
/**
 * @param array $_FILES['image'] - uploaded image
 * @param array $_GET['image_owner'] - image owner
 * @return array
 */
function callback() {
    $image_owner = "LGL_Admin";
    if (isset($_GET['image_owner']))
        $image_owner = "LGL_" . sha1("LGL_IMAGE_OWNER_" . $_GET['image_owner']);
    $rtn = [];
    if ($_FILES["image"]['error'] === UPLOAD_ERR_OK) {
        $check = getimagesize($_FILES["image"]["tmp_name"]);
        if ($check !== false) {

            $curl = curl_init();
            $cfAPIKey = file_get_contents("_secret_CF_Key");
            $curl_opts = array(
                CURLOPT_URL => 'https://api.cloudflare.com/client/v4/accounts/d187d2dd448e157d2832b352d6727a95/images/v1',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS => array('file'=> new CURLFILE($_FILES["image"]["tmp_name"]),'metadata' => '{"owner":"LGL_Admin"}'),
                CURLOPT_HTTPHEADER => array(
                    'Authorization: Bearer ' . $cfAPIKey
                ),
            );
            curl_setopt_array($curl, $curl_opts);

            $response = curl_exec($curl);
            $response = json_decode($response);

            if ($response->success) {
                http_response_code(200);
                $rtn = [
                    "owner_id" => $image_owner,
                    "image" => [
                        "uploaded_file_name" => $_FILES["image"]["name"],
                        "uploaded_mime" => $check["mime"],
                        "uploaded_resolution" => [$check[0], $check[1]],
                        "uploaded_bits" => $check["bits"],
                        "uploaded_channels" => $check["channels"],
                        "uploaded_size" => $_FILES["image"]["size"]
                    ],
                    "CDN" => [
                        "id" => $response->result->id,
                        "variants" => $response->result->variants
                    ]
                ];
            } else {
                http_response_code(415);
                $rtn = [
                    "error" => [$response->errors, $response->messages]
                ];
            }
            curl_close($curl);
        } else {
            http_response_code(415);
            $rtn = [
                "error" => "This file is not an image!"
            ];
        }
    } else {
        http_response_code(415);
        $rtn = [
            "error" => "This file failed to upload!"
        ];
    }

    return [
        "content-type"=>"application/json",
        "content"=> json_encode($rtn, JSON_PRETTY_PRINT)
    ];
}