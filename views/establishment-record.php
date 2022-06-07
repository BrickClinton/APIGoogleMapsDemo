<div class="callout callout-info">
  <h5>Registros de establecimientos</h5>
</div>

<div class="row">
  <div class="col-md-6">
    <div class="card card-outline card-primary">
      <div class="card-header">
        <h5 class="title-card text-bold text-uppercase">Formulario de registro de establecimientos</h5>
      </div>
      <div class="card-body">
        <form autocomplete="off" id="form-establishment">
          <div class="row">
            <div class="col-md-4 form-group">
              <label for="department">Departamento</label>
              <select id="department" class="form-control form-control-border custom-select">
                
              </select>
            </div>
            <div class="col-md-4 form-group">
              <label for="province">Provincia</label>
              <select id="province" class="form-control form-control-border custom-select">
                <option value="">Seleccione</option>
              </select>
            </div>
            <div class="col-md-4 form-group">
              <label for="district">Distrito</label>
              <select id="district" class="form-control form-control-border custom-select">
                <option value="">Seleccione</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 form-group">
              <label for="establishment">Establecimiento</label>
              <input type="text" id="establishment" class="form-control-border form-control">
            </div>
            <div class="col-md-6 form-group">
              <label for="ruc">RUC</label>
              <input type="text" id="ruc" class="form-control-border form-control" maxlength="11">
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 form-group">
              <label for="location">Ubicación:</label>
              <div class="row">
                <div class="col-sm-3 form-group">
                  <Select class="custom-select form-control-border" id="streetType">
                    <option value="AV">AV</option>
                    <option value="CA">CA</option>
                    <option value="JR">JR</option>
                    <option value="PJ">PJ</option>
                    <option value="UR">UR</option>
                    <option value="LT">LT</option>
                  </Select>
                </div>
                <div class="col-sm-7 form-group">
                  <input type="text" placeholder="Nombre de calle" class="form-control form-control-border" id="streetName">
                </div>
                <div class="col-sm-2 form-group">
                  <input type="number" class="form-control form-control-border" placeholder="N°" id="streetNumber" maxlength="5">
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 form-group">
              <label for="reference">Referencia</label>
              <textarea id="reference" cols="30" rows="2" class="form-control form-control-border"></textarea>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 form-group">
              <label for="latitude">Latitud</label>
              <input type="number" class="form-control form-control-border" id="latitude">
            </div>
            <div class="col-md-6 form-group">
              <label for="longitude">Longitud</label>
              <input type="number" class="form-control form-control-border" id="longitude">
            </div>
          </div>
        </form>
      </div>
      <div class="card-footer text-right">
        <button type="button" id="btn-cancel" class="btn btn-sm btn-secondary">Cancelar</button>
        <button type="button" id="btn-save" class="btn btn-sm btn-primary">Registrar</button>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="card card-outline card-primary">
      <div class="card-header">
        <h5 class="text-uppercase text-bold">Lista de establecimientos</h5>
      </div>
      <div class="card-body">
        <table id="table-establishment" class="table table-striped table-responsive-lg">
          <thead>
            <tr>
              <th>Establecimiento</th>
              <th>RUC</th>
              <th>Dirección</th>
              <th>Distrito</th>
              <th>Edición</th>
            </tr>
          </thead>
          <tbody id="data-establishment">
    
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<script src="dist/js/pages/establishment-recod.js"></script>