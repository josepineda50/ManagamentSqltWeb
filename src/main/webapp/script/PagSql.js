
Vue.component('loadin', {
    template: `<div class="centerx">
    <vs-button @click="openLoading" type="filled" color="primary">Loading Default</vs-button>
  </div>`
})




new Vue({
    el: '#PagSql',
    data: {
        titulo: 'Ejecucion de Script',
        tblDatos: [],
        F_tblDatos: [
            {key: "nomConexion", label: "Conexion"},
            {key: "action", label: ""} //boton Editar
        ],
        sentencia: '',
        HayError: false,
        msjError: 'hola',
        VarianteErr: '',
        tblDatosSelect: [],
        conexion: 'Sin Conexion Disponible',
        ip: '',
        puerto: '',
        bd: '',
        usuer: '',
        password: '',
        esTextoRojo: false,
        esTextoAzul: false,
        palabrasClaveSQL: ["SELECT", "INSERT", "UPDATE", "DELETE", "CREATE", "ALTER", "DROP"],
        esCodigoSQLValido: true,
        ClassColor: 'black',
        palabras: 'SQL',
        consultaSQL: 'SELECT * FROM tabla WHERE condicion;',
        pestanas: [],
        pestanasActivas: [],
        contadorPestanas: 0,
        //mostrarSpinner: false, // Variable para controlar la visibilidad del spinner
        tipoSpinner: 'border', // Puedes cambiar el tipo de spinner según tus necesidades
        pruebaTab: ''
    },
    methods: {
        BloquerPag: function () {
            this.$vs.loading();
        },
        HabilitarPag: function () {
            setTimeout(() => {
                this.$vs.loading.close()
            }, 0);
        },
        CargaConexiones: function () {
            this.$http.get('../SrvConfiguracionBD', {params: {
                    GestorBD: 'cargaConexiones'}}
            ).then(function (response) {
                //Método que se dispara cuando vuelve la respuesta del servidor.
                const respuesta = response.body;

                if (respuesta != '-1') {

                    const jsonData = respuesta
                    const DataFormat = jsonData.slice(1).slice(0, -1);
                    var res = JSON.parse(DataFormat);
                    this.tblDatos = res.Conexiones;

                } else {
                    if (respuesta === "-1") {
                        window.location.replace('./PagEndSession.jsp');
                    } else {
                        swal('Error', respuesta, 'error');
                    }

                }

            }, function () {
                //Método que se dispara si hubo algún error.
                swal('Error', 'Ha sucedido un error en el proceso', 'error');
            });
        },
        ejecutarScript: function () {
            this.HayError = false;
            this.msjError = '';
            this.VarianteErr = '';

            var TabCativo = this.pestanasActivas = this.pestanasActivas + 1;
            var pestanaActiva = 'Script ' + TabCativo;


            this.sentencia = this.valorTextareaActivo(pestanaActiva);

            if (this.conexion === 'Sin Conexion Disponible') {
                this.VarianteErr = 'danger';
                this.HayError = true;
                this.msjError = 'Debe seleccionar una conexion';
            } else {
                if (this.sentencia === '') {
                    this.VarianteErr = 'danger';
                    this.HayError = true;
                    this.msjError = 'Sentencia Vacia, Ingrese una';
                } else {
                    let arraySentencia = this.sentencia.split(" ");

                    let palabraReservda = arraySentencia[0];

                    switch (palabraReservda.toUpperCase()) {
                        case 'SELECT':
                            this.BloquerPag();
                            this.SELECT();
                            break;
                        default:
                            //respuesta del servidor
                            this.BloquerPag();
                            this.DmlSql();
//                            this.VarianteErr = 'danger';
//                            this.HayError = true;
//                            this.msjError = 'Error de sintaxis';
                    }

//                  this.VarianteErr = 'success';
//                this.HayError = true;
//                this.msjError = 'Sentencia ejecutada Exitasamente';
                }
            }
        },
        SELECT: function (sql, tab) {
            this.$http.get('../SrvSql', {params: {
                    opcion: '1',
                    ip: this.ip,
                    puerto: this.puerto,
                    bd: this.bd,
                    usuer: this.usuer,
                    password: this.password,
                    SentenciaSql: sql}}
            ).then(function (response) {
                //Método que se dispara cuando vuelve la respuesta del servidor.
                const respuesta = response.body;
                this.HabilitarPag();
                tab.mostrarSpinner = false;


                if (respuesta.substring(1, 2) === '0') {
                    const jsonData = respuesta
                    const DataFormat = jsonData.slice(2).slice(0, -1);
                    var res = JSON.parse(DataFormat);
                    tab.tblDatosSelect = res.data;
                } else {
                    if (respuesta.substring(1, 2) === '1') {
                        //respuesta del servidor
                        this.VarianteErr = 'info';
                        this.HayError = true;
                        this.msjError = 'No se Encontraron datos';
                    } else {

                        //respuesta del servidor
                        this.VarianteErr = 'danger';
                        this.HayError = true;
                        this.msjError = respuesta;
                    }
                }

            }, function () {
                //Método que se dispara si hubo algún error.
                // this.HabilitarPag();
                tab.mostrarSpinner = false;
                swal('Error', 'Ha sucedido un error en el proceso', 'error');
            });
        },
        seleccionarConexion: function (data) {
            this.conexion = 'Conexion: ' + data.item.nomConexion;
            this.ip = data.item.servidor;
            this.puerto = data.item.puerto;
            this.bd = data.item.nomBD;
            this.usuer = data.item.usuarioBD;
            this.password = data.item.contrasenaBD;

        },
        DmlSql: function (sql, tab) {
            this.$http.get('../SrvSql', {params: {
                    opcion: '2',
                    ip: this.ip,
                    puerto: this.puerto,
                    bd: this.bd,
                    usuer: this.usuer,
                    password: this.password,
                    SentenciaSql: sql}}
            ).then(function (response) {
                //Método que se dispara cuando vuelve la respuesta del servidor.
                const respuesta = response.body;
                // this.HabilitarPag();
                tab.mostrarSpinner = false;

                if (respuesta.substring(0, 1) === '0') {

                    tab.collapseVisible = true;
                    tab.alertVariant = 'success';
                    tab.MsgError = 'Exito !!  Script ejecutado correctamente';

                } else {
                    if (respuesta.substring(0, 1) === '1') {
                        tab.collapseVisible = true;
                        tab.alertVariant = 'info';
                        tab.MsgError = 'Info !! Ninguna fila actualizada';
                    } else {
                        tab.collapseVisible = true;
                        tab.alertVariant = 'danger';
                        tab.MsgError = 'Error !! ' + respuesta;
                    }
                }

            }, function () {
                //Método que se dispara si hubo algún error.
                // this.HabilitarPag();
                tab.mostrarSpinner = false;
                swal('Error', 'Ha sucedido un error en el proceso', 'error');
            });
        },
        obtenerColorPorPalabra: function (palabraEncontrada) {
            return palabraEncontrada ? "red" : "blue";
        },
        obtenerColorDeTexto1: function () {
            const sqlFormateado = sqlFormatter.format(this.sentencia, {language: 'sql'});

            // Compara el texto original con el texto formateado
            if (this.sentencia === sqlFormateado) {
                return 'red'; // Sintaxis SQL correcta
            } else {
                return 'blue'; // Sintaxis SQL incorrecta
            }
        },
        obtenerColorDeTexto: function () {
            const palabrasClaveError = ['DELETE', 'DROP', 'TRUNCATE', 'UPDATE', 'SELECT', 'FROM', 'CREATE'];
            const sqlFormateado = sqlFormatter.format(this.sentencia, {language: 'sql'});

            // Compara el texto original con el texto formateado
            if (this.sentencia.trim() === sqlFormateado.trim()) {
                return 'red';

            } else {

                // Comprueba si hay palabras clave que pueden indicar un error
                const contienePalabraError = palabrasClaveError.some(palabra => this.sentencia.toUpperCase().includes(palabra));
                return contienePalabraError ? 'blue' : 'black'; // Rojo si hay palabra clave de error, negro si no
            }
        },
        newTable: function () {

            this.sentencia = "CREATE TABLE NOMBRE_TABLA (\n\
                              CAMPO1 TIPO_CAMPO ,\n\
                              CAMPO2 TIPO_CAMPO,\n\
                              CAMPO2 TIPO_CAMPO)";
        },
        updateTable: function () {
            this.sentencia = "UPDATE NOMBRE_TABLA SET CAMPO1='VALOR',\n\
                                                     CAMPO2='VALOR',\n\
                                                     CAMPO3='VALOR' \n\
                            WHERE CONDICION='VALOR'";
        },
        limpiar: function () {
            this.sentencia = '';
        },
        UnionTable: function () {
            this.sentencia = 'SELECT A.CAMPO1,\n\
                                     B.CAMPO1,\n\
                               JOIN TABLA1 A ';
        },
        newTab: function () {
            // this.contadorPestanas++;
            //alert(this.contadorPestanas);
            const nuevaPestana = {
                titulo: `Script ${this.contadorPestanas} `,
                contenido: `Contenido de la Pestaña ${this.contadorPestanas} `,
                collapseVisible: false,
                alertVariant: '',
                MsgError: 'hola',
                content: '',
                tblDatosSelect: [],
                mostrarSpinner: false

            };
            this.pestanas.push(nuevaPestana);
            //this.pestanasActivas.push(this.contadorPestanas - 1);
            this.contadorPestanas++;
            // alert(this.contadorPestanas);
        },
        cerrarPestana: function (index) {

            this.pestanas.splice(index, 1);
            this.pestanasActivas.splice(index, 1);
        },
        llamaF_EjecutaSql: function () {
            var TabCativo = this.pestanasActivas;
            var pestanaActiva = 'Script ' + TabCativo;

            this.EjecutaSql(pestanaActiva);
        },
        EjecutaSql: function (P_pestanaActi) {
            const tabActual = this.pestanas.find((tab) => tab.titulo.trim() === P_pestanaActi);
            if (tabActual) {


                tabActual.collapseVisible = false;
                tabActual.alertVariant = '';
                tabActual.MsgError = '';
                tabActual.tblDatosSelect = '';

                if (tabActual.content === '') {
                    tabActual.collapseVisible = true;
                    tabActual.alertVariant = 'danger';
                    tabActual.MsgError = 'Debe ingresar una sentencia Sql';
                    return;
                }

                if (this.conexion === 'Sin Conexion Disponible') {
                    tabActual.collapseVisible = true;
                    tabActual.alertVariant = 'danger';
                    tabActual.MsgError = 'Debe Seleccionar una Conexion';
                    return;
                }

                if (tabActual.MsgError === '') {
                    tabActual.mostrarSpinner = true;
                    let arraySentencia = tabActual.content.split(" ");
                    let palabraReservda = arraySentencia[0];

                    switch (palabraReservda.toUpperCase().trim()) {
                        case 'SELECT':

                            this.SELECT(tabActual.content.trim(), tabActual);
                            break;
                        default:
                            this.DmlSql(tabActual.content, tabActual);
                    }

                }




            }

        },
        valorTextareaActivo(P_pestanaActi) {
            const tabActiva = this.pestanas.find(tab => tab.titulo.trim() === P_pestanaActi);
            return tabActiva ? tabActiva.content : '';
        },
        iniciarSpinner: function () {
            this.mostrarSpinner = true;
        },
        detenerSpinner: function () {
            this.mostrarSpinner = false;
        },
        guardaArchivo: function () {

        }
    },
    created: function () {
        //this.BloquerPag();
        this.CargaConexiones();
        this.newTab();
    },
    watch: {
        sentencia1: function (nuevoTexto) {



            //   Puedes agregar lógica aquí para detectar palabras específicas
            const palabraEncontrada = nuevoTexto.includes(this.palabras);
            this.sentencia = nuevoTexto; // Actualizar el modelo de datos
            this.$nextTick(() => {
                this.$refs.textarea.style.color = this.obtenerColorPorPalabra(palabraEncontrada);
            });

//            const codigo = this.sentencia.toUpperCase(); // Convertir a mayúsculas para hacer la comparación sin importar el caso
//            var resp = this.palabrasClaveSQL.some(palabra => codigo.includes(palabra));
//            
//            //alert(resp);
//            if (resp){
//               this.ClassColor = 'blue';
//            }else{
//                this.ClassColor = 'red';
//            }

        },

    }

});
