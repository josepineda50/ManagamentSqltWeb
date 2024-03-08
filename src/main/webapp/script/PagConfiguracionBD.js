
Vue.component('v-select', VueSelect.VueSelect);

Vue.component('loadin', {
    template: `<div class="centerx">
    <vs-button @click="openLoading" type="filled" color="primary">Loading Default</vs-button>
  </div>`
})



new Vue({
    el: "#PagConfiguracionBD",
    data: {
        titulo: 'Configuracion de Base de Datos',
        HayError: false,
        msjError: '',
        /*Crear Conexion*/
        GestorBD: '',
        GestoresBD: [
            {
                DescGestoBD: "Sql Serve",
                CodGestonBD: 'sqlserver'
            }, {
                DescGestoBD: "DB2",
                CodGestonBD: 'as400'
            }
        ],
        NombreConexion: '',
        Servidor: '',
        Puerto: '',
        BaseDatos: '',
        usuarioBD: '',
        contrasenaBD: '',
        /*Consulta Conexion*/
        activeTab: 0,
        tblDatos: [],
        F_tblDatos: [
            {key: "gestorBD", label: "Gestor Base Datos"},
            {key: "nomConexion", label: "Nombre Conexion"},
            {key: "servidor", label: "Servidor"},
            {key: "puerto", label: "Puerto"},
            {key: "nomBD", label: "Base de Datos"},
            {key: "usuarioBD", label: "Usuario"},
            {key: "contrasenaBD", label: "Contrasena"},
            {key: "controlador", label: "Controlador"},
            {key: "estado", label: "Estado"},
            {key: "action", label: "action"} //boton Editar
        ]
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
        ValidaDatosConexion: function (id) {
            this.HayError = false;
            this.msjError = '';

            if (this.GestorBD === '' || this.GestorBD === null) {
                this.HayError = true;
                this.msjError = 'Debe seleccionar un Gestor de base de datos';
                return;
            }
//            else{
//                 alert(this.GestorBD.CodGestonBD);
//            }



            if (this.NombreConexion === '') {
                this.HayError = true;
                this.msjError = 'Debe ingresar un nombre de conexion';
                return;
            }

            if (this.Servidor === '') {
                this.HayError = true;
                this.msjError = 'Debe ingresar un servidor';
                return;
            }


            if ((this.Puerto === '') || (this.Puerto === '0') || (this.Puerto === '00') || (this.Puerto === '000') || (this.Puerto === '0000')) {
                this.HayError = true;
                this.msjError = 'Debe ingresar un Puerto valido';
                return;
            }

            if (this.BaseDatos === '') {
                this.HayError = true;
                this.msjError = 'Debe ingresar una Base de datos';
                return;
            }

            if (this.usuarioBD === '') {
                this.HayError = true;
                this.msjError = 'Debe ingresar un usuario de base de datos';
                return;
            }

            if (this.contrasenaBD === '') {
                this.HayError = true;
                this.msjError = 'Debe ingresar una contraseña de base de datos';
                return;
            }

            if (this.HayError === false) {
                if (id === 1) {
                    this.probarConexion();
                } else {

//                    let jsonConexion = new Array();
//                    jsonConexion.push({
//                        gestorBD: this.GestorBD.CodGestonBD,
//                        nomConexion: this.NombreConexion,
//                        servidor: this.Servidor,
//                        puerto: this.Puerto,
//                        nomBD: this.BaseDatos,
//                        usuarioBD: this.usuarioBD,
//                        contrasenaBD: this.contrasenaBD,
//                        controlador: "",
//                        estado: ""
//                    });


                    this.tblDatos.push({
                        gestorBD: this.GestorBD.CodGestonBD,
                        nomConexion: this.NombreConexion,
                        servidor: this.Servidor,
                        puerto: this.Puerto,
                        nomBD: this.BaseDatos,
                        usuarioBD: this.usuarioBD,
                        contrasenaBD: this.contrasenaBD,
                        controlador: "",
                        estado: ""
                    });

                    let Conexiones = '{"Conexiones":' + JSON.stringify(this.tblDatos) + '}';

                    this.CrearConexion(Conexiones);
                }

            }

        },
        probarConexion: function () {
            this.BloquerPag();
            this.$http.get('../SrvConfiguracionBD', {params: {
                    GestorBD: this.GestorBD.CodGestonBD,
                    servidor: this.Servidor,
                    puerto: this.Puerto,
                    basedatos: this.BaseDatos,
                    usuariobd: this.usuarioBD,
                    contrasenabd: this.contrasenaBD}}
            ).then(function (response) {
                  this.HabilitarPag();
                //Método que se dispara cuando vuelve la respuesta del servidor.
                const respuesta = response.body;

                if (respuesta === "1") {
                    swal('Exito', 'Conexion exitosa', 'success');
                } else {
                    swal('Error', 'Ha ocurrido un error. ' + respuesta, 'error');
                }
            }, function () {
                //this.HabilitarPag();
                //Método que se dispara si hubo algún error.
                swal('Error', 'Ha sucedido un error en el proceso', 'error');
            });
        },
        CrearConexion: function (p_Conexiones) {
            this.$http.get('../SrvConfiguracionBD', {params: {
                    GestorBD: "CrearCon",
                    jsonConexiones: p_Conexiones,
                    nomCon: this.NombreConexion}}
            ).then(function (response) {
                //  this.HabilitarPag();
                //Método que se dispara cuando vuelve la respuesta del servidor.
                const respuesta = response.body;

                if (respuesta === "0") {
                    swal('Exito', 'Conexion creada exitosante', 'success');
                    this.tblDatos = '';
                    this.CargaConexiones();
                } else {
                    swal('Error', 'Ha ocurrido un error en la creacion. ' + respuesta, 'error');
                }
            }, function () {
                //this.HabilitarPag();
                //Método que se dispara si hubo algún error.
                swal('Error', 'Ha sucedido un error en el proceso', 'error');
            });
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
        AgregaConexiontabla: function () {
//            this.tblDatos.push({
//                gestorBD: "hola",
//                nomConexion: ""
//            });


//            this.tblDatos.push({
//                gestorBD: this.GestorBD.CodGestonBD,
//                nomConexion: this.NombreConexion,
//                servidor: this.Servidor,
//                puerto: this.Puerto,
//                nomBD: this.BaseDatos,
//                usuarioBD: this.usuarioBD,
//                contrasenaBD: this.contrasenaBD,
//                controlador: "",
//                estado: ""
//            });

            this.tblDatos = '';
        },
        eliminarCon: function (data) {
            //  alert(data.item.nomConexion);

            var indice = this.tblDatos.indexOf(data);

            alert(indice);

            if (indice != -1)
                this.tblDatos.splice(indice, 2);

            this.NombreConexion = '';


            let Conexiones = '{"Conexiones":' + JSON.stringify(this.tblDatos) + '}';

            this.CrearConexion(Conexiones);

        }




    },
    watch: {
        Puerto: function () {
            if (this.Puerto.length > 4) {
                this.HayError = true;
                this.msjError = 'El puerto debe contener al menos 4 caracteres';
                this.Puerto = '';
                return;
            }
        }
//        ,
//        activeTab: function () {
//            if (this.activeTab === 1) {
//                this.CargaConexiones();
//            }
//
//        }

    },
    created: function () {
        this.CargaConexiones();
    }
});