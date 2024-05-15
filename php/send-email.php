<?php

$name = $_POST["user_name"];
$email = $_POST["user_email"];
$wedding_date = $_POST["user_wedding-date"];
$location_venue = $_POST["user_location-venue"];
$wedding_planner = $_POST["user_wedding-planner"];
$photo_investment = $_POST["user_photo-investment"];
$guest_count = $_POST["user_guest-count"];
$hear_about_us = $_POST["user_hear-about-us"];
$about_you = $_POST["user_about-you"];

require "../vendor/autoload.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPmailer\SMTP;

$mail = new PHPMailer(true);

// $mail->SMTPDebug = SMTP::DEBUG_SERVER;

$mail->isSMTP();
$mail->SMTPAuth = true;

$mail->Host = "smtp.gmail.com";
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;

$mail->Username = "ajamuphotoclientservices@gmail.com";
$mail->Password = "Ajamuclient91";

$mail->setFrom($email, $name);
$mail->addAddress("idowu.shortt@gmail.com", "Idowu--Test");

$mail->Subject = $wedding_date;
$mail->Body = $about_you;

$mail->send();

echo "email sent";
// header("Location: ../contact-sent.html");