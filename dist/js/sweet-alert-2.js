// Configuración del sweetAlert de avisos
function sweetAlertConfig($dataconfig){
  Swal.fire({
    icon: $dataconfig.icon,
    title: $dataconfig.title,
    position: 'center',
    text: $dataconfig.message,
    timer: 1300,
    timerProgressBar: true,
    confirmButtonColor: '#5D6D7E',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  });
}

function sweetAlertInformation(title, message){
  sweetAlertConfig({
    icon    : 'info',
    title   : title,
    message : message
  });
}

function sweetAlertError(title, message){
  sweetAlertConfig({
    icon    : 'error',
    title   : title,
    message : message
  });
}

function sweetAlertWarning(title, message){
  sweetAlertConfig({
    icon    : 'warning',
    title   : title,
    message : message
  });
}

function sweetAlertSuccess(title, message){
  sweetAlertConfig({
    icon    : 'success',
    title   : title,
    message : message
  });
}

// Configuración del sweetAlert de pregunta
function confirmQuestionConfig($dataconfig){
  return Swal.fire({
    title: $dataconfig.question,
    position: 'center',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: $dataconfig.confirmColor,
    confirmButtonText: '<i class="fas fa-check"></i> Aceptar',
    cancelButtonText: '<i class="fas fa-times"></i> Cancelar',
    buttonsStyling: true,
    reverseButtons: true
  });
}

function sweetAlertConfirmQuestionSave(question){
  return confirmQuestionConfig({
    question    : question,
    confirmColor: '#2471A3'
  });
}

function sweetAlertConfirmQuestionDelete(question){
  return confirmQuestionConfig({
    question    : question,
    confirmColor: '#C0392B'
  });
}