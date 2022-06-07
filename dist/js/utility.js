// Inabilitar saltos de linea (CONTENTEDITABLE) y permitir el maximo de caracteres indicado en su atributo (MAXLENGTH)
function disableLineBreaks(element, event){
  let maxlength = element.attr('maxlength');
 
  // Bloquear salto de linea
  if(event.keyCode == 13){
    event.preventDefault();
  }

  // Maximo de caracteres permitido
  if (element.html().length == maxlength || element.val().length == maxlength) {
    return false;
  } else {
    return true;
  }
}

// Encontrar coincidencia de objeto
function getIndexArrayObject(arrayObject, item){ 
  let index = arrayObject.findIndex((element) => {
    return element.name === item;
  });

  // Devolver el indice obtenido (-1 si no se encuentra)
  return index;
}

// Eliminar elemento del array object
function removeItemFromArrayObject(arrayObject, item){
  // Buscar dentro del arr
  let index = arrayObject.findIndex((element) => {
    return element.name === item;
  });

  // Eliminar si existe el elemento buscado
  index !== -1 && arrayObject.splice( index, 1 );   
}

// Eliminar un elemento del array
function removeItemFromArray (arr, item ) {
  let index = arr.indexOf( item );           // obtener el Indice    
  index !== -1 && arr.splice(index, 1 );     // Eliminar si existe
}

// Eliminar los elementos de un contenedor
function clearContainer(element) {
  let div = document.querySelector(element);
  while(div.firstChild) {
    div.removeChild(div.firstChild);
  }
}

// Redireccionar al perfil del usuario
function redirectProfile(idusuario) {
  localStorage.setItem("idusuarioActivo", idusuario);
  window.location.href = "index.php?view=profile-view";
}

// Detectar scroll al final de un div
function isFinalContainer(selector) {
  let scrollHeight = $(selector).prop('scrollHeight');          // ALtura total de la ventana
  let scrollTop = $(selector).scrollTop();                      // Posicion en el que se encuentra el elemento
  let offsetHeight = $(selector).prop('offsetHeight');          // ALtura del div
  let contentHeight = scrollHeight - offsetHeight;              // Altura calculada   
  let start = contentHeight - 30;

  // Comprobar la posición del scroll
  if (scrollTop == contentHeight) {
    //$(selector).animate( { scrollTop : start}, 200 );           // Mover scroll
    return true;
  } else {
    return false;
  }
}

// Detectar scroll al final de una ventana
function isFinalWindow() {
  var heightWindow = $(window).height(); 
  var heightDocument = $(document).height();
  var scrollTop = $(window).scrollTop();

  if((heightWindow + scrollTop) == heightDocument){
    return true;
  } else {
    return false;
  }
}

// Encontrar coincidencia de elemento en dos array
function findMatchesArray(words, phrases){
  for (let i = 0; i < words.length; i++){
    if(phrases.includes(words[i])){
      return true;
    } else {
      return false;
    }
  }
}