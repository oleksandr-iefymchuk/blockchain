<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('en','phpmailer/language');
$mail->isHTML(true);

$mail->setFrom('website2811@gmail.com'); // от кого будет уходить письмо?
$mail->addAddress('audit2811@gmail.com');     // Кому будет уходить письмо 

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$company = $_POST['company'];
$message = $_POST['message'];

//прикрепить файл: 
if(!empty($_FILES['upload']['tmp_name'])){
    //путь загрузки файла
    $filePatch=__DIR__."/files/" .$_FILES['upload']['name'];
    //загрузим файл
    if (copy($_FILES['upload']['tmp_name'], $filePatch)){
        $fileAttache = $filePatch;
        $body.='<p><strong>Downloaded file</strong></p>';
        $mail->addAttachment($fileAttache);
    }
}

$mail->Subject = 'Hello! This is a letter from the blockchain website';
$mail->Body    = '' .'Name: ' .$name  .'Phone: ' .$phone .'E-mail: ' .$email  .'Company: ' .$company  .'Message: ' .$message;
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    header('location: thank-you.html');
}
?>