var idestablecimiento = -1;
var isNewData = true;

// Listar establecimientos
function listEstablishment() {
  $.ajax({
    url: 'controllers/establishment.controller.php',
    type: 'GET',
    data: 'op=listEstablishment',
    success: function (result) {
      // destruir datatable
      $('#table-establishment').DataTable().destroy();
      //Cargar datos
      $("#data-establishment").html(result);

      // Volver a genewrar datatable
      $('#table-establishment').DataTable({
        paging: true,
        lengthChange: true,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        responsive: true,
        language: { url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json' },
      });
    }
  });

}

// obtener establicimiento
function getDepartaments() {
  $.ajax({
    url: 'controllers/ubigeo.controller.php',
    type: 'GET',
    data: 'op=getDepartments',
    success: function (result) {
      $("#department").html(result);
    }
  });
}

// obtener provincias
function getProvinces(iddepartamento) {
  $.ajax({
    url: 'controllers/ubigeo.controller.php',
    type: 'GET',
    data: 'op=getProvinces&iddepartamento=' + iddepartamento,
    success: function (result) {
      $("#province").html(result);
    }
  });
}

// Listar provincias
$("#department").change(function () {
  let iddepartamento = $(this).val();
  getProvinces(iddepartamento);
});

// Obtener distritos
function getDistricts(idprovincia) {
  $.ajax({
    url: 'controllers/ubigeo.controller.php',
    type: 'GET',
    data: 'op=getDistricts&idprovincia=' + idprovincia,
    success: function (result) {
      $("#district").html(result);
    }
  });
}

// Listar distritos
$("#province").change(function () {
  let idprovincia = $(this).val();
  getDistricts(idprovincia);
});

// Guardar o actualizar
$("#btn-save").click(function () {
  if (dataIsIconmplete()) {
    alert("Complete los datos");
  } else {

    // Obteniendo los datos del formulario
    let dataSend = getDataFormEstablishment();
    let message = "";

    // Agregando nuevos valores al array asociativo
    if(isNewData){
      dataSend['op'] = 'registerEstablishment';
      message = 'guardar';
    } else {
      dataSend['op'] = 'updateEstablishment';
      dataSend['idestablecimiento'] = idestablecimiento;
      message = 'actualizar';
    }

    // Confirmar el proceso
    if (confirm("¿Estas seguro de " + message + " los datos?")) {
      sendDataToServer(dataSend);
    }
  }
});


// Enviar datos a la base de datos
function sendDataToServer(data){
  $.ajax({
    url: 'controllers/establishment.controller.php',
    type: 'GET',
    data: data,
    success: function (result) {
      if (result == '') {
        listEstablishment();
        $("#btn-cancel").click();
      }
    }
  });
}

// Obtener datos del formulario
function getDataFormEstablishment(){
  return {
    iddistrito       : $("#district").val(),
    establecimiento  : $("#establishment").val(),
    ruc              : $("#ruc").val(),
    tipocalle        : $("#streetType").val(),
    nombrecalle      : $("#streetName").val(),
    numerocalle      : $("#streetNumber").val(),
    referencia       : $("#reference").val(),
    latitud          : $("#latitude").val(),
    longitud         : $("#longitude").val()
  }
}

// Verificar datos incompletos
function dataIsIconmplete(){
  let data = getDataFormEstablishment();
  return data.iddistrito == '' || data.establecimiento == '' || data.ruc == '' || data.tipocalle == '' || data.nombrecalle == '' || data.latitud == '' || data.longitud == '';
}

// Edición
$("#data-establishment").on('click', '.btn-edit', function () {
  idestablecimiento = $(this).attr('data-code');
  $("#form-establishment")[0].reset();

  $.ajax({
    url: 'controllers/establishment.controller.php',
    type: 'GET',
    dataType: 'JSON',
    data: 'op=getAEstablishment&idestablecimiento=' + idestablecimiento,
    success: function (result) {
      $("#department").val(result.iddepartamento);
      $("#province").val(result.idprovincia);
      $("#establishment").val(result.establecimiento);
      $("#ruc").val(result.ruc);
      $("#streetType").val(result.tipocalle);
      $("#streetName").val(result.nombrecalle);
      $("#streetNumber").val(result.numerocalle);
      $("#reference").val(result.referencia);
      $("#latitude").val(result.latitud);
      $("#longitude").val(result.longitud);

      $("#btn-save").removeClass("btn-primary").addClass("btn-info").html("Actualizar");
      isNewData = false;
    }
  });

});

// Cancelar edición
$("#btn-cancel").click(function () {
  $("#form-establishment")[0].reset();
  $("#department").focus();
  $("#btn-save").removeClass("btn-info").addClass("btn-primary").html("Registrar");
  isNewData = true;
  idestablecimiento = -1;
});

// Eliminación
$("#data-establishment").on('click', '.btn-delete', function () {
  let idestablecimiento = $(this).attr('data-code');

  if(confirm("¿Estas seguro de eliminar el registro?")){
    $.ajax({
      url: 'controllers/establishment.controller.php',
      type: 'GET',
      data: 'op=deleteEstablishment&idestablecimiento=' + idestablecimiento,
      success: function(result){
        if (result == ''){
          listEstablishment();
        }
      }
    });
  }
});

getDepartaments();
listEstablishment();