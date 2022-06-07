<?php

require_once 'conexion.php';

class ModelMaster extends Conexion{

  protected $pdo;

  public function __CONSTRUCT(){
    $this->pdo = parent::getConnect();
  }

  /**
   * Obtiene una lista de parámetros de un array asociativo pasado como valor
   * @return string
   */
  public function getParameters(array $array){
    $string = "";     //Lista de parámetros
    $i = 0;           //Contador de elementos del arreglo

    //En esta estructura extraemos la CLAVE del array asociativo
    foreach($array as $key => $value){
      if ($i != count($array) - 1){
        $string .= ":" . $key . ", ";
      } else {
        $string .= ":" . $key;
      }
      $i++;
    }

    return $string;
  }


  /**
   * Obtiene un número indeterminado de filas a partir de una consulta
   * @return $arrayAsociativo 
   */
  public function getRows($storeProcedure){
    try{
      $commandSQL = $this->pdo->prepare("call $storeProcedure()");
      $commandSQL->execute();
      return $commandSQL->fetchAll(PDO::FETCH_OBJ);
    }
    catch(Exception $e){
      die($e->getMessage());
    }
  }

  /**
   * Elimina uno o más registros dependiendo de los criterios establecidos en la matriz
   * @return void retorna valores
   */
  public function deleteRegister(array $array, $storeProcedure){
    try{
      //Primero debemos obtener todos los parámetros del arreglo
      $parameters = self::getParameters($array);

      //Preparamos la consulta a ejecutar
      $commandSQL = $this->pdo->prepare("call $storeProcedure($parameters)");

      //Debemos asociar los valores al comando a ejecutar
      foreach($array as $key => $value){
        $commandSQL->bindValue(":" .  $key, $value);
      }

      $commandSQL->execute();

    }
    catch(Exception $e){
      die($e->getMessage());
    }
  }

  /**
   * Ejecuta un procedimiento almacenado con el conjunto de parámetros definidos
   * en el arreglo de entrada. Se puede establecer si este proceso retorna o no datos
   */
  public function execProcedure(array $array, $storeProcedure, $return = false){
    try{
      //Se obtiene las claves contenidas en el arreglo
      $parameters = self::getParameters($array);

      //Ejecución del procedimiento almacenado
      $commandSQL = $this->pdo->prepare("call $storeProcedure($parameters)");

      //Enviamos todos los valores asociados
      foreach($array as $key => $value){
        $commandSQL->bindValue(":" . $key, $value);
      }

      //Ejecutamos el comando
      $commandSQL->execute();

      //Solo si se solicitó retorno de datos
      if ($return){
        return $commandSQL->fetchAll(PDO::FETCH_ASSOC);
      }

    }catch (Exception $e){
      die($e->getMessage());
    }
  }


}

?>