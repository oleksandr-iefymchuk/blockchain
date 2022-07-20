<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('en','phpmailer/language');
$mail->isHTML(true);

$mail->setFrom('sanekny@gmail.com'); // от кого будет уходить письмо?
$mail->addAddress('Hello@ailalab.com');     // Кому будет уходить письмо 

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
$mail->Body    = '' .'Name: ' .$name  .'<br>Phone: ' .$phone .'<br>E-mail: ' .$email  .'<br>Company: ' .$company  .'<br>Message: ' .$message;
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    header('location: thank-you.html');
}
?>