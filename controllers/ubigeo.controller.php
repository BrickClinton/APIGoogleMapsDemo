<?php 

require_once '../models/Ubigeo.php';

$ubigeo = new Ubigeo();

if(isset($_GET['op'])){

    //Cargar select de Departamentos
    if($_GET['op'] == 'getDepartments'){

        $data = $ubigeo->getDepartments();
        if($data){
            echo "<option value=''>Seleccione</option>";
            foreach ($data as $row){
                echo "<option value='{$row->iddepartamento}' >{$row->departamento}</option>";
            }
        }   
    }

    //Cargar select de Provincias
    if($_GET['op'] == 'getProvinces'){

        $table =  $ubigeo->getProvinces(["iddepartamento" => $_GET['iddepartamento']]);
        
        if(count($table) > 0){
            echo "<option value=''>Seleccione</option>";
                foreach ($table as $list){
                    echo "<option value='{$list['idprovincia']}' >{$list['provincia']}</option>";
                }
        }   
    }

    //Cargar select de Distritos
    if($_GET['op'] == 'getDistricts'){

        $table =  $ubigeo->getDistricts(["idprovincia" => $_GET['idprovincia']]);
        
        if(count($table) > 0){
            echo "<option value=''>Seleccione</option>";
                foreach ($table as $list){
                    echo "<option value='{$list['iddistrito']}' >{$list['distrito']}</option>";
                }
        }   
    }

}

?>