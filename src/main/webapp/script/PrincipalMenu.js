
        new Vue({
            el: '#AppMasterPage1',
            data: {},
            methods: {
                validaSessio: function () {
                    //carga las remesadoras de as400
                    this.$http.get('SvlMasterPage', {params: {
                            condicion: '1'}}
                    ).then(function (response) {
                        //Método que se dispara cuando vuelve la respuesta del servidor.

                        const session = response.body;

                        if (session === '-1') {
                            window.location.replace('./login.jsp');
                        }


                    }, function () {
                        //Método que se dispara si hubo algún error.
                        swal('Error', 'Ha sucedido un error en el proceso', 'error');
                    });
                },
                cerrarSession() {
                    //carga las remesadoras de as400
                    this.$http.get('SvlMasterPage', {params: {
                            condicion: '2'}}
                    ).then(function (response) {
                        //Método que se dispara cuando vuelve la respuesta del servidor.

                        const session = response.body;

                        if (session === '0') {
                            window.location.replace('./login.jsp');
                        }


                    }, function () {
                        //Método que se dispara si hubo algún error.
                        swal('Error', 'Ha sucedido un error en el proceso', 'error');
                    });
                }

            },
            created: function () {
                        //   this.validaSessio();
            }
        });

