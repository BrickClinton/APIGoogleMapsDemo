
<link rel="stylesheet" href="./dist/css/pages/geolocation.css">

<div class="row">
  <!-- Contenido de los establecimientos -->
  <div class="col-md-4 col-sm-12">
    <div class="card">
      <div class="card-header">
        <h5 class="card-title text-bold">Lista de establecimientos</h5>
      </div>

      <div class="card-body" >
        <form id="search-servicio" class="mb-3">
          <div class="input-group">
            <!-- Caja para ingresar establesimiento -->
            <input id="search-establishment" type="text" class="form-control" placeholder="Establecimiento.." aria-label="Buscar establecimiento" aria-describedby="basic-addon2">
            
            <!-- Buscador -->
            <div class="input-group-append">
              <button id="btn-search" class="btn btn-outline-secondary" type="button">
                <i class="fas fa-search"></i>
              </button>
            </div>

            <!-- Filtrar -->
            <div class="input-group-append">
              <button id="btn-add-filter" class="btn btn-outline-secondary" type="button">
                <i class="fas fa-filter"></i>
              </button>
            </div>
          </div>

          <!-- Contenido del filtrador -->
          <div id="filter-container" class="mt-2" style="display:none;">
            <label for="wanted-district">Filtrar por distrito</label>
            <input id="wanted-district" type="text" class="form-control" placeholder="Ingrese un distrito">
          </div>
        </form>

        <!-- Contenido de los establecimientos -->
        <div id="lista-establecimientos" style="height: calc(100vh - 200px); overflow-y: auto; ">
          <div class="info-box mt-1 mb-0 establecimiento-info" id="{idestablecimiento}">
            <span class="info-box-icon bg-info elevation-1"><i class="fas fa-building"></i></span>
            <div class="info-box-content">
              <span class="info-box-text">{establecimiento}</span>
              <small>{ubicacion} - {distrito}</small>
              <small>Referencia: {referencia}</small>
              <button id="trazar-ruta" class="btn btn-sm btn-primary">
                <i class="fa fa-route"></i>
                Ver ruta <span id="distancia"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Contenido del mapa -->
  <div class="col-md-8 col-sm-12">
    <div class="card">
      <!-- Detalle del recorrido -->
      <div class="card-header">
        <h5 class="card-title">Mapa</h5>
        <div class="card-tools" id="detalle-recorrido">
          <span>Detalle del recorrido: </span>
          <span id="distancia" class="badge badge-success">
            <i class="fas fa-route"></i>
            <span class="text">830 m</span>
          </span>
          <span id="tiempo" class="badge badge-danger">
            <i class="fas fa-clock"></i>
            <span class="text"> 8min</span>
          </span>

        </div>
      </div>

      <!-- Contenido del mapa -->
      <div class="card-body p-0">
        <div id="primary-map" style="width: 100%; height: calc(100vh - 200px);"></div>
      </div>
    </div>
  </div>
</div>

<!-- Modal para seleccionar el tipo de recorrido let travelModes = ['DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT']; -->
<div class="modal fade" id="modal-ruta" tabindex="-1" role="dialog" aria-labelledby="modal-ruta-label" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modal-ruta-label">Seleccione el tipo de recorrido</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="tipo-recorrido">¿Cómo desea hacer el recorrido?</label>
          <select id="tipo-recorrido" class="form-control">
            <option value="DRIVING">Ir en auto</option>
            <option value="WALKING">Ir caminando</option>
            <option value="BICYCLING">Ir en bicicleta</option>
            <option value="TRANSIT">Ir en transporte público</option>
          </select>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" id="btn-ruta">Mostrar ruta</button>
      </div>
    </div>
  </div>
</div>

<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCyBhbKb3BeyxJ-BBV9bsv0nA61dVbpA6E&libraries=places&callback=startMap"></script>

<script type="text/javascript" src="dist/js/pages/geolocation.js"></script>