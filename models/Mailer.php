<?php
use PHPMailer\PHPMailer\PHPMailer;  // Core (Nucleo)
use PHPMailer\PHPMailer\Exception;  // Contralador de expecepiones(Errores)
use PHPMailer\PHPMailer\SMTP;       // Administra protocolo envio correo

require '../libs/PHPMailer/src/Exception.php';
require '../libs/PHPMailer/src/PHPMailer.php';
require '../libs/PHPMailer/src/SMTP.php';

class Mailer{
  // Atributo
  private $mail;

  // Constructor 
  public function __CONSTRUCT(){
      //Instancia 
      $this->mail = new PHPMailer(true);
  }

  // Enviar correo
  function sendMail($email, $message){ 
    try{
  
      //Server settings
      $this->mail->SMTPDebug = 0;                                       //Enable verbose debug output
      $this->mail->isSMTP();                                            //Send using SMTP
      $this->mail->Host       = 'smtp.gmail.com';                       //Set the SMTP server to send through
      $this->mail->SMTPAuth   = true;                                   //Enable SMTP authentication
      $this->mail->Username   = 'jarvis.team.2021@gmail.com';          //SMTP username
      $this->mail->Password   = 'jarvis.123';                               //SMTP password
      $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
      $this->mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    
      //Recipients
      $this->mail->setFrom('trabajosya2022@gmail.com', 'Q Tal Chamba');
    
      // Copias del correo
      $this->mail->addAddress($email);                                   //Destinatarios
    
      //Content
      $this->mail->isHTML(true);                            
      $this->mail->Subject = "TRABAJA YA";
      $this->mail->Body    = $message;
      $this->mail->AltBody = $message;
    
      $this->mail->CharSet = 'UTF-8';
      $this->mail->send();
      echo "";
    }
    catch (Exception $e){
      echo "No se ha podido enviar el correo electrónico: {$this->mail->ErrorInfo}";
    }
  } 
}
?>