
var app = new Vue({
    el: '#aplicacion',
    data: {
        usuario: '',
        contrasena: '',
        mensaje: ''
    },
    methods :{
        ValidaDatos: function (){
            var hayError = 0;
            
            if(this.usuario === ''){
                hayError = 1;
               this.mensaje = 'Debe ingresar un usuario.'; 
            }
            
            if(this.contrasena === ''){
                hayError = 1;
               this.mensaje = 'Debe ingresar un contraseña.'; 
            }
            
            if (hayError == 0){
                this.SlideUp();
                this.mensaje = ''; 
            }else{
                this. SlideDonw();
            }
            
        },
         SlideDonw: function () {
            this.isShow = true;
        },
        SlideUp: function () {
            this.isShow = false;
        }
    }
});
