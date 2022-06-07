<?php
require_once '../models/Establishment.php';

// Objeto establishment
$establishment = new Establishment();

if (isset($_GET['op'])) {

  // Listar establecimientos
  if ($_GET['op'] == 'getEstablishments') {
    $data;
    
    if($_GET['establecimiento'] != '' || $_GET['distrito'] != ''){
      $data = $establishment->getWantedEstablishments([
        "establecimiento" => $_GET['establecimiento'],
        "distrito"        => $_GET['distrito'],
        "limit"           => $_GET['limit'],
        "offset"          => $_GET['offset']
      ]);
    } else {
      $data = $establishment->getEstablishments([
        "limit"           => $_GET['limit'],
        "offset"          => $_GET['offset']
      ]);
    }

    echo json_encode($data);
  }

  // Listar establecimientos - DATATABLE
  if ($_GET['op'] == 'listEstablishment') {

    $data = $establishment->getEstablishments([
      "limit"           => 150,
      "offset"          => 0
    ]);
    
    if($data){
      foreach($data as $row){
        echo "
          <tr>
            <td>{$row['establecimiento']}</td>
            <td>{$row['ruc']}</td>
            <td>{$row['ubicacion']}</td>
            <td>{$row['distrito']}</td>
            <td>
              <button type='button' data-code='{$row['idestablecimiento']}' class='btn btn-edit btn-sm btn-info'><i class='fas fa-edit'></i></button>
              <button type='button' data-code='{$row['idestablecimiento']}' class='btn btn-delete btn-sm btn-danger'><i class='fas fa-trash-alt'></i></button>
            </td>
          </tr>
        ";
      }
    }
  }

  // Registrar
  if($_GET['op'] == 'registerEstablishment'){
    $establishment->registerEstablishment([
      "iddistrito"        => $_GET['iddistrito'],
      "establecimiento"   => $_GET['establecimiento'],
      "ruc"               => $_GET['ruc'],
      "tipocalle"         => $_GET['tipocalle'],
      "nombrecalle"       => $_GET['nombrecalle'],
      "numerocalle"       => $_GET['numerocalle'],
      "referencia"        => $_GET['referencia'],
      "latitud"           => $_GET['latitud'],
      "longitud"          => $_GET['longitud']
    ]);
  }  

  // Actualizar
  if($_GET['op'] == 'updateEstablishment'){
    $establishment->updateEstablishment([
      "idestablecimiento" => $_GET['idestablecimiento'],
      "iddistrito"        => $_GET['iddistrito'],
      "establecimiento"   => $_GET['establecimiento'],
      "ruc"               => $_GET['ruc'],
      "tipocalle"         => $_GET['tipocalle'],
      "nombrecalle"       => $_GET['nombrecalle'],
      "numerocalle"       => $_GET['numerocalle'],
      "referencia"        => $_GET['referencia'],
      "latitud"           => $_GET['latitud'],
      "longitud"          => $_GET['longitud']
    ]);
  }

  // Obtner un registro
  if ($_GET['op'] == 'getAEstablishment'){

    $data = $establishment->getAEstablishment(["idestablecimiento" => $_GET['idestablecimiento']]);
    if($data){
      echo json_encode($data[0]);
    }
  }

  // Eliminar
  if($_GET['op'] == 'deleteEstablishment'){
    $establishment->deleteEstablishment(["idestablecimiento" => $_GET['idestablecimiento']]);
  }
  
}