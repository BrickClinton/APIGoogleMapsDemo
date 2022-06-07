/* $('#search-servicio').click(function() {
    startMap();
}) */

var template = String($('#lista-establecimientos').html());
var establecimientosInfo = [];  // Array que almacenará la información de los establecimientos
var directionsService;          // 
var directionsDisplay;          // 
var mapa;
var miubicacion = {};
var distrito = '';
var establecimiento = '';
var autocomplete;
const g_key = 'AIzaSyCyBhbKb3BeyxJ-BBV9bsv0nA61dVbpA6E'; 

var offset = 0;
var offsetTmp = 0;
var limit = 10;

// deg = Grados (Latitud, Longitud)
function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

// lat1, lon1 = Mi ubicación
// lat2, lon2 = Establecimiento
// R = radio de la tierra
// C = Distancia entre el A y el punto B
// D = Distancia
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371;
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    (Math.sin(dLat / 2) * 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    (Math.sin(dLon / 2) * 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  if (d >= 1) {
    return '(' + (Math.round(d * 100) / 100) + " km)";
  } else if (d < 1) {
    return '(' + Math.round(d * 1000) + " m)";
  } else {
    return '';
  };
}

// Iniciar mapa
function startMap() {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  getMyPosition();
  drawMap(miubicacion);
  $('#lista-establecimientos').empty();  // Limpiar contenido
  listEstablishmentPositions();
}

// Dibujar el Mapá
function drawMap(obj) {
  // Ocultar contenido del detalle de recorrido
  $('#detalle-recorrido').hide();

  // Contenedor del Mapa
  let div = document.getElementById('primary-map');
  mapa = new google.maps.Map(div, {
    center: obj,  // latitud, Longitud
    zoom: 7
  });

  // Generar marcador del usuario
  let marcadorUsuario = new google.maps.Marker({
    position: obj,                  // Posición: Latitud, Longitud
    title: 'Mi ubicación',          // Titulo
    map: mapa                       // Contenido del mapa
  })

  // Cambiar el color del marcador de usuario
  marcadorUsuario.setIcon('dist/img/marker/userMarker.png');

  // generar los marcadores de los establecimientos
  generatePositionEstablishment(obj);
}

// Obtener marcadores de los estrablecimientos
function getPositionEstablishment(obj){
   // Recorrer y generar los marcadores de los establecimientos
   let marcadores = establecimientosInfo.map(lugar => {
    // Obtener la distancia de mi Posición a los establecimientos en KM
    $(`#${lugar.id} #distancia`).text(getDistanceFromLatLonInKm(obj.lat, obj.lng, lugar.posicion.lat, lugar.posicion.lng));

    // Retorna los marcadores de los establecimientos
    return new google.maps.Marker({
      id: lugar.id,
      position: lugar.posicion,
      title: lugar.nombre,
      map: mapa
    })
  })

  return marcadores;
}

// Generar marcodores de los establecimientos
function generatePositionEstablishment(obj){
  let marcadores = getPositionEstablishment(obj);

  // Colocar información en los marcadores
  marcadores.forEach(marcador => {
    // Icono del marcador
    marcador.setIcon('dist/img/marker/otherMarker.png');

    let establecimiento = JSON.parse($(`#${marcador.id}`).attr('data-establecimiento'));

    // obtener la direccion del marcador segun google maps
    let geocoder = new google.maps.Geocoder;
    let infowindow = new google.maps.InfoWindow;

    geocoder.geocode({
      'location': marcador.position
    }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          let direccion = results[0].formatted_address;
          let distancia = getDistanceFromLatLonInKm(obj.lat, obj.lng, marcador.position.lat(), marcador.position.lng());
          let contentString = `
                    <div class="card m-0">
                        <div class="card-body">
                            <h5 class="card-title">${establecimiento.establecimiento} a ${distancia}</h5>
                            <p class="card-text">${direccion}</p>
                            <p class="card-text">RUC: ${establecimiento.ruc}</p>
                            <a href="tel:${establecimiento.ruc}" class="btn btn-sm btn-success">
                                <i class="fa fa-phone"></i>
                                Llamar
                            </a>
                            <button class="btn btn-sm btn-primary">
                                <i class="fa fa-user"></i>
                                Ver perfil
                            </button>
                        </div>
                    </div>`;

          // Asignar contenido HTML con la información del establecimiento
          infowindow.setContent(contentString);

          // Evento click para mostrar información del establecimiento
          marcador.addListener('click', function () {
            infowindow.open(mapa, marcador);
          })
        } else {
          // window.alert('No se encontró ningún resultado');
        }
      } else {
        //window.alert('Geocoder falló debido a: ' + status);
      }
    })
  })
}

// Dibujar ruta
function drawRoute(ubicacionDestino) {
  if (directionsDisplay) {
    directionsDisplay.setMap(null);
  }

  directionsDisplay.setMap(mapa);

  directionsService.route({
    origin: miubicacion,
    destination: ubicacionDestino,
    travelMode: $('#tipo-recorrido').val()
  }, function (response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      // otener la distancia y tiempo
      let distancia = response.routes[0].legs[0].distance.text;
      let tiempo = response.routes[0].legs[0].duration.text;
      $('#detalle-recorrido').show();
      $('#distancia .text').text(distancia);
      $('#tiempo .text').text(tiempo);
    } else {
      //window.alert('Directions request failed due to ' + status);
    }
  });
}

// Iniciar autocompletado
function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('wanted-district'), {
    types: ['(cities)'],    // Ciudad
    componentRestrictions: {
      country: 'pe'       // PERÚ
    }
  });

  autocomplete.addListener('place_changed', fillInAddress);
}

// Llenado de direcciones
function fillInAddress() {
  var place = autocomplete.getPlace();
  distrito = place.name;
  startMap();
}

// Obtener mi ubicación
function getMyPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(miPosicion => {
      miubicacion = {
        lat: miPosicion.coords.latitude,
        lng: miPosicion.coords.longitude

      }
    },
      myPositionError()
    )
  }
}

// Error de posición
function myPositionError() {
  $.ajax({
    url: `https://www.googleapis.com/geolocation/v1/geolocate?key=${g_key}`,
    type: 'POST',
    dataType: 'JSON',
    data: {
      'considerIp': 'true',
      'fields': 'location',
      'location': 'true',
      'accuracy': 'true',
      'altitude': 'true',
      'altitudeAccuracy': 'true',
      'heading': 'true',
      'speed': 'true'
    },
    success: data => {
      miubicacion = {
        lat: data.location.lat,
        lng: data.location.lng
      }
      drawMap(miubicacion);
    },
    error: e => {
      miubicacion = {
        lat: -12.046374,
        lng: -77.042793
      }
      drawMap(miubicacion);
    }
  })
}

// Listar posición de los establecimientos
function listEstablishmentPositions() {
  $.ajax({
    url: 'controllers/establishment.controller.php',
    type: 'GET',
    dataType: 'JSON',
    data: {
      'op': 'getEstablishments',
      'establecimiento': establecimiento,
      'distrito': distrito,
      'offset'  : offset,
      'limit'   : limit
    },
    success: establecimientos => {
      //$('#lista-establecimientos').empty();  // Limpiar contenido
      establecimientosInfo = [];             // Limpiar array

      // Recorrer los datos 
      establecimientos.forEach(establecimiento => {
        let establecimientoInfo = {
          id: establecimiento.idestablecimiento,
          posicion: {
            lat: parseFloat(establecimiento.latitud),
            lng: parseFloat(establecimiento.longitud)
          },
          nombre: establecimiento.establecimiento
        };

        // Agregar objetos al array de establecimientos
        establecimientosInfo.push(establecimientoInfo);

        // MOSTRAR ESTABLECIMIENTOS
        var e_template = template;

        // Obtener las claves por cada iteración: idestablecimiento: 100, establecimiento: 'Estab 20'
        for (key in establecimiento) {
          e_template = e_template.replaceAll('{' + key + '}', establecimiento[key]);
        }

        // Asignar datos del establecimiento "contenido html" al contenedor de establecimientos 
        $('#lista-establecimientos').append(e_template);

        // Almacena en el attr (data-stablecimiento) un JSON de tipo string
        $(`#${establecimiento.idestablecimiento}`).attr('data-establecimiento', JSON.stringify(establecimiento));
      });

      // Generar marcadores de los establecimientos
      generatePositionEstablishment(miubicacion);
    }
  });
}

$(document).on('click', '#trazar-ruta', function () {
  var jsonString = $(this).parents('.establecimiento-info').attr('data-establecimiento');
  $('#modal-ruta').modal('show').attr('data-establecimiento', jsonString);
})

$(document).on('click', '#btn-ruta', function () {
  // Obtenemos el JSON String y lo comvertimos a JSON
  var data = JSON.parse($('#modal-ruta').attr('data-establecimiento'));

  // Obtrener la ubicacipon del establecimiento destino
  var ubicacionDestino = {
    lat: parseFloat(data.latitud),
    lng: parseFloat(data.longitud)
  };

  // Dibujar ruta
  drawRoute(ubicacionDestino);

  $('#modal-ruta').modal('hide');
})

$(document).on('click', '#btn-add-filter', function () {
  $('#filter-container').toggle(125);
  $('#wanted-district').val('');
  distrito = '';
  initAutocomplete();
})

// Ejecutar buscador de establecimientos
$("#btn-search").click(function () {
  establecimiento = $('#search-establishment').val();
  offsetTmp = 0;
  offset = 0;
  startMap();
});

// Cargar datos al hacer scroll
$("#lista-establecimientos").scroll(function(){
  if(isFinalContainer($(this))){
    offsetTmp++;
    offset = offsetTmp * limit;
    listEstablishmentPositions();
  }
});

// Iniciar mapa
startMap();