<?php

require_once '../core/model.master.php';

class Ubigeo extends ModelMaster{

  //Obtener los registro de departamentos
  public function getDepartments(){
    try{
      return parent::getRows("spu_departamentos_listar");
    }
    catch(Exception $error){
      die($error->getMessage());
    }
  }

  /**
   * @param array asociativo contiene el iddepartamento a filtrar
   * @return array asociativo de provincias filtrados por el departamento
   */
  public function getProvinces(array $data){
    try{
      return parent::execProcedure($data, "spu_provincias_listar", true);
    }
    catch(Exception $error){
      die($error->getMessage());
    }
  }

  /**
   * @param array asociativo contiene el idprovincia a filtrar
   * @return array asociativo de distritos fitrados por la provincia
   */
  public function getDistricts(array $data){
    try{
      return parent::execProcedure($data, "spu_distritos_listar", true);
    }
    catch(Exception $error){
      die($error->getMessage());
    }
  }
}

?>