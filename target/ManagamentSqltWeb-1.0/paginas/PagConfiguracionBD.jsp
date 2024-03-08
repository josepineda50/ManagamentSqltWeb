

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Configuracion BD</title>
        <link href="https://cdn.jsdelivr.net/npm/vuesax/dist/vuesax.css" rel="stylesheet">
        <%@ include file = "PrincipalMenu.jsp" %>
    </head>
    <body>
        <h1></h1>
        <div id="PagConfiguracionBD">
            <b-navbar toggleable="sm" type="light" variant="light">
                <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
                <b-navbar-brand><h2 style="color: #900C3F ;"> {{ titulo }}</h2></b-navbar-brand>

            </b-navbar>

            <div>
                <b-collapse  v-model="HayError" class="mt-2">
                    <b-alert variant="danger" show> {{ msjError }} </b-alert>
                </b-collapse>
            </div>

            <div>
                <b-container fluid>
                    <loadin></loadin>
                    <b-tabs  v-model="activeTab">
                        <b-tab title="Creacion de Conexion" >
                            <div>
                                <b-card-text></b-card-text>
                                <b-card>
                                    <b-row class="my-1">
                                        <b-col sm="4">
                                            <label for="input-small">Driver</label>
                                            <b-col sm="">
                                                <v-select 
                                                    v-model="GestorBD"
                                                    label="DescGestoBD" 
                                                    value="CodGestonBD" 
                                                    :options="GestoresBD"
                                                    placeholder="Selecciona una opcion">
                                                </v-select>
                                            </b-col>
                                        </b-col>
                                    </b-row>
                                    <b-row class="my-1">
                                        <b-col sm="4">
                                            <label for="input-small">Nombre de Conexion</label>
                                            <b-col sm="">
                                                <b-form-input id="input-small" 
                                                              v-model="NombreConexion" 
                                                              size="sm" placeholder=""
                                                              >
                                                </b-form-input>
                                            </b-col>
                                        </b-col>
                                        <b-col sm="4">
                                            <label for="input-small">Servidor</label>
                                            <b-col sm="">
                                                <b-form-input id="input-small" 
                                                              v-model="Servidor" 
                                                              size="sm" placeholder=""
                                                              >
                                                </b-form-input>
                                            </b-col>
                                        </b-col>
                                        <b-col sm="4">
                                            <label for="input-small">Puerto</label>
                                            <b-col sm="">
                                                <b-form-input id="input-small" 
                                                              v-model="Puerto" 
                                                              size="sm" placeholder=""
                                                              type="number"
                                                              maxlength=4
                                                              >
                                                </b-form-input>
                                            </b-col>
                                        </b-col>
                                    </b-row>
                                    <b-row class="my-1">
                                        <b-col sm="4">
                                            <label for="input-small">Nombre Base de Datos</label>
                                            <b-col sm="">
                                                <b-form-input id="input-small" 
                                                              v-model="BaseDatos" 
                                                              size="sm" placeholder=""
                                                              >
                                                </b-form-input>
                                            </b-col>
                                        </b-col>
                                        <b-col sm="4">
                                            <label for="input-small">Usuario</label>
                                            <b-col sm="">
                                                <b-form-input id="input-small" 
                                                              v-model="usuarioBD" 
                                                              size="sm" placeholder=""
                                                              >
                                                </b-form-input>
                                            </b-col>
                                        </b-col>
                                        <b-col sm="4">
                                            <label for="input-small">Contraseña</label>
                                            <b-col sm="">
                                                <b-form-input id="input-small" 
                                                              v-model="contrasenaBD" 
                                                              size="sm" placeholder=""
                                                              type="password"
                                                              >
                                                </b-form-input>
                                            </b-col>
                                        </b-col>
                                    </b-row>
                                </b-card>
                                <b-card>
                                    <div class="d-flex align-items-center justify-content-end">
                                        <div>
                                            <b-button  lg="4" v-on:click="ValidaDatosConexion(1)" variant="info">Probar Conexion
                                            </b-button>

                                            <b-button  lg="4" v-on:click="ValidaDatosConexion(2)" variant="primary">Crear Conexion
                                            </b-button>
                                            
                                        </div>
                                    </div>
                                </b-card>
                            </div>
                        </b-tab>
                        <b-tab title="Consultas de Conexion" >
                            <b-card>
                                <div>
                                    <b-table striped hover 
                                             :items="tblDatos"
                                             :fields="F_tblDatos">
                                        <template v-slot:cell(action)="data">
                                            <div>
                                                <b-button 
                                                    size="sm" 
                                                    variant="primary"
                                                    @click="eliminarCon(data.item)" >
                                                    <i class="bi bi-trash3"></i>
                                                </b-button>
                                            </div>
                                        </template>
                                    </b-table>
                                </div>
                            </b-card>

                        </b-tab>
                    </b-tabs>
                </b-container>
            </div>

        </div>
    </body>


    <script src="../script/PagConfiguracionBD.js" type="text/javascript"></script>
</html>
