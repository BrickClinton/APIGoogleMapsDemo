<?php

require_once '../config/database.php';

class Conexion{

  //Atributos
  private $host = HOST;
  private $port = PORT;
  private $database = DATABASE;
  private $charset = CHARSET;
  private $user = USER;
  private $pass = PASS;

  //Representa objeto de conexión
  protected $pdo;
  
  public function connectServer(){
    //Formato de cadena de conexión:
    //new PDO("mysql:host=localhost;port=3306;dbname=MIBD;charset=UTF8",root,"TU_CLAVE");
    $cn = new PDO("mysql:host=" . $this->host . ";port=" . $this->port . ";dbname=" . $this->database . ";charset=" . $this->charset, $this->user, $this->pass);
    return $cn;
  }

  public function getConnect(){
    try{
      $this->pdo = $this->connectServer();
      $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      return $this->pdo;
    }catch(Exception $e){
      die($e->getMessage());
    }
  }

}

$cone = new Conexion();
$cone->connectServer();

?>