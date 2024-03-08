<%-- 
    Document   : PrincipalMenu
    Created on : 19/02/2024, 10:39:47 AM
    Author     : jgpinedal
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Principal Menu</title>
    </head>
    <body>
        <div id="AppMasterPage1">
            <b-navbar type="dark" variant="dark">
                <b-navbar-nav>
                    <b-nav-item href="http://localhost:8080/ManagamentSqltWeb/">Home</b-nav-item>

                    <!-- Navbar dropdowns 
                    <b-nav-item-dropdown text="Lang" right>
                        <b-dropdown-item href="#">EN</b-dropdown-item>
                        <b-dropdown-item href="#">ES</b-dropdown-item>
                        <b-dropdown-item href="#">RU</b-dropdown-item>
                        <b-dropdown-item href="#">FA</b-dropdown-item>
                    </b-nav-item-dropdown>
                    -->

                    <b-nav-item-dropdown text="Sql" right>
                        <b-dropdown-item href="PagConfiguracionBD.jsp"><i class="bi bi-gear"></i> Configuracion BD</b-dropdown-item>
                        <b-dropdown-item href="PagSql.jsp"><i class="bi bi-check2"></i> Sql</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <div class="d-flex align-items-center justify-content-end">
                        <b-nav-item href="#"><b-button 
                                v-on:click="cerrarSession()"
                                ><i class="bi bi-box-arrow-right"></i> </b-button ></b-nav-item>
                    </div>

                </b-navbar-nav>
            </b-navbar>
        </div>
    </body>
    <script src="script/js/vue.js" type="text/javascript"></script>
    <link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap/dist/css/bootstrap.min.css"/>  

    <link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css"/>    

    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>

    <script src="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.js"></script>


    <script src="https://cdn.jsdelivr.net/vue.resource/1.3.1/vue-resource.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">

    <script src="https://unpkg.com/vue-select@3.0.0"></script>
    <link rel="stylesheet" href="https://unpkg.com/vue-select@3.0.0/dist/vue-select.css">

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vuesax"></script>

    <script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.js"></script>
    <script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue-icons.min.js"></script>

    <script src="../script/PrincipalMenu.js" type="text/javascript"></script>

</html>
