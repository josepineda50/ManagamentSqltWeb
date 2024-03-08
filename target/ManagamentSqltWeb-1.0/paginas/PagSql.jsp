
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Sql</title>
        <link href="https://cdn.jsdelivr.net/npm/vuesax/dist/vuesax.css" rel="stylesheet">
        <%@ include file = "PrincipalMenu.jsp" %>

    </head>
    <body>
        <div id="PagSql">
            <h1> {{ titulo }}</h1>
            <div>
                <b-container fluid>
                    <b-card>
                        <b-row class="my-1">
                            <b-col sm="2">
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
                                                        @click="seleccionarConexion(data)" >
                                                        <i class="bi bi-check"></i>
                                                    </b-button>
                                                </div>
                                            </template>
                                        </b-table>
                                    </div>
                                </b-card>
                            </b-col>


                            <b-col sm="10">
                                <b-button 
                                    size="sm" 
                                    variant="success"
                                    @click="newTab()" 
                                    v-b-tooltip.hover title="Nueva Ventana">
                                    <i class="bi bi-file-plus-fill"></i>
                                </b-button>
                                <b-button 
                                    size="sm" 
                                    variant="success"
                                    @click="llamaF_EjecutaSql()" 
                                    v-b-tooltip.hover title="Ejecutar Script">
                                    <i class="bi bi-play"></i>
                                </b-button>
                                <b-button 
                                    size="sm" 
                                    variant="danger"
                                    @click="limpiar()"
                                    v-b-tooltip.hover title="Limpiar">
                                    <i class="bi bi-trash3"></i>
                                </b-button>
                                <b-button 
                                    size="sm" 
                                    variant="primary"
                                    @click="newTable()" 
                                    v-b-tooltip.hover title="Nueva Tabla">
                                    <i class="bi bi-file-plus"></i>
                                </b-button>
                                <b-button 
                                    size="sm" 
                                    variant="primary"
                                    @click="updateTable()"
                                    v-b-tooltip.hover title="Actualizar Tabla">
                                    <i class="bi bi-arrow-clockwise"></i>
                                </b-button>
                                <b-button 
                                    size="sm" 
                                    variant="primary"
                                    @click="UnionTable()"
                                    v-b-tooltip.hover title="Join de Tabla">
                                    <i class="bi bi-union"></i>
                                </b-button>
                                
                                 <b-button 
                                    size="sm" 
                                    variant="primary"
                                    @click="guardaArchivo()"
                                    v-b-tooltip.hover title="Guardar Script">
                                    <i class="bi bi-floppy"></i>
                                </b-button>


                                <h3> {{ conexion }}</h3>
                                <b-card>


                                    <b-tabs v-model="pestanasActivas">
                                        <b-tab v-for="(pestana, index) in pestanas" :key="index"  >

                                            <template #title>
                                                <b-spinner :type="tipoSpinner" v-if="pestana.mostrarSpinner" small></b-spinner>
                                                <i></i> <strong>{{ pestana.titulo }}</strong>
                                                <b-button 
                                                    size="sm" 
                                                    variant="primary"
                                                    @click="cerrarPestana(pestana)" >
                                                    <i class="bi bi-x"></i>
                                                </b-button>
                                            </template>


                                            <!-- Contenido de la pestaña -->
                                            <b-form-group >
                                                <b-form-textarea
                                                    id="textarea-rows"
                                                    placeholder="Script"
                                                    rows="12"
                                                    v-model="pestana.content"
                                                    :style="{ color: obtenerColorDeTexto()}"
                                                    :autofocus="true"
                                                    size="lg"
                                                    class="bg-light"
                                                    ></b-form-textarea>
                                            </b-form-group>
                                            <div>
                                                <b-collapse  v-model="pestana.collapseVisible"   class="mt-2">
                                                    <b-alert :variant="pestana.alertVariant"   show>
                                                        {{ pestana.MsgError }}
                                                    </b-alert>
                                                </b-collapse>
                                            </div>
                                            <b-card>
                                                <!-- //aqui va la tabla de resultado de datos  comment -->
                                                <b-table striped hover 
                                                         :items="pestana.tblDatosSelect"
                                                         :fields="F_tblDatosSelect">
                                                </b-table>
                                            </b-card>
                                        </b-tab>
                                    </b-tabs>
                                </b-card>
                                </div>


                            </b-col>


                        </b-row>

                    </b-card>

                </b-container>
            </div>


        </div>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/sql-formatter@15.2.0/dist/sql-formatter.min.js"></script>

    <link href="../style/css/efectos.css" rel="stylesheet" type="text/css"/>
    <script src="../script/PagSql.js" type="text/javascript"></script>


</html>
