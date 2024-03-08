

Vue.component('loadin', {
    template: `<div class="centerx">
    <vs-button @click="openLoading" type="filled" color="primary">Loading Default</vs-button>
  </div>`
})


new Vue({
    el: "#app",
    data: {
        show: true,
        username: '',
        password: '',
        mensaje: '',
        visible: false,
        btncarga: ''
    },
    methods: {
        validaDatos: function () {
            var hayError = 0;


            if (this.username === '') {
                hayError = 1;
                this.visible = true;
                document.getElementById('username').classList.add('addClass');
            }else{
                document.getElementById('username').classList.remove('addClass');
            }

            if (this.password === '') {
                hayError = 1;
                this.visible = true;
                document.getElementById('password').classList.add('addClass');
            }else{
                document.getElementById('password').classList.remove('addClass');
            }

            if (hayError == 0) {
//                this.btncarga = true;
                this.mensaje = "";
                this.visible = false;
                this.ValidarUsuario(this.username, this.password);

//                this.btncarga = false;
            } else {
                this.mensaje = "Debe de ingresar los campo marcados en rojo.";
                //this.btncarga = false;
            }
        },
        ValidarUsuario: function ($usuario, $contrasena) {
            this.openLoading();
            this.$http.get('SrvLogin', {params: {
                    condicion: '1',
                    userName: $usuario,
                    pass: $contrasena}}
            ).then(function (response) {
                //Método que se dispara cuando vuelve la respuesta del servidor.
                if (response.body === '1') {
                    // swal('Titulo', 'Contenido', 'success');
//                    this.btncarga = false;
                    window.location.replace('PagPrincipal.jsp');
                } else {
                    //swal('Error', response.body, 'error');
//                    this.btncarga = false;
                    this.mensaje = "Datos ingresados Incorrectos, Intenta nuevamente";
                    this.visible = true;
                }
                this.closeLoading();

            }, function () {
                //Método que se dispara si hubo algún error.
                alert('Error!');
            });
        },
        openLoading: function () {
            this.$vs.loading();
        },
        closeLoading: function () {

            setTimeout(() => {
                this.$vs.loading.close()
            }, 0);
        }
    }
});
