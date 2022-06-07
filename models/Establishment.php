<?php

require_once '../core/model.master.php';
class Establishment extends ModelMaster{
  
  // Listar todos los establecimientos
  public function getEstablishments(array $data) {
    try {
      return parent::execProcedure($data, "spu_establecimientos_listar", true);
    } catch(Exception $error){
      die($error->getMessage());
    }
  }

  //Obtener establecimientos buscados
  public function getWantedEstablishments(array $data){
    try{
      return parent::execProcedure($data, "spu_establecimientos_buscar", true);
    }
    catch(Exception $error){
      die($error->getMessage());
    }
  }

  // Registrar establecimiento
  public function registerEstablishment(array $data){
    try{
      parent::execProcedure($data, "spu_establecimientos_registrar", false);
    }
    catch(Exception $error){
      die($error->getMessage());
    }
  }

  // Actualizar establecimiento
  public function updateEstablishment(array $data){
    try{
      parent::execProcedure($data, "spu_establecimientos_modificar", false);
    }
    catch(Exception $error){
      die($error->getMessage());
    }
  }

  // Obtenr un establecimiento
  public function getAEstablishment(array $data){
    try{
      return parent::execProcedure($data, "spu_establecimientos_getdata", true);
    }
    catch(Exception $error){
      die($error->getMessage());
    }
  }

  // Eliminar un establecimiento
  public function deleteEstablishment(array $data){
    try{
      parent::deleteRegister($data, "spu_establecimientos_eliminar");
    }
    catch(Exception $error){
      die($error->getMessage());
    }
  }

}
?>