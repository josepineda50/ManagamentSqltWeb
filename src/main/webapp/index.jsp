<%-- 
    Document   : index
    Created on : 19/02/2024, 10:26:43 AM
    Author     : jgpinedal
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Principal</title>
    </head>
    <body>
        <div id="PagIndex">
            <h1> {{ msjError }}</h1>
            <div>
                <b-nav>
                    <b-nav-item href="http://localhost:8080/ManagamentSqltWeb/paginas/PrincipalMenu.jsp" active>Managament Sql</b-nav-item>
                    <b-nav-item>Link</b-nav-item>
                    <b-nav-item>Another Link</b-nav-item>
                    <b-nav-item disabled>Disabled</b-nav-item>
                </b-nav>
            </div>
            <b-container fluid class="p-4 bg-dark">
                <b-card>
                    <b-row class="my-1">
                        <b-col sm="2">
                            <label for="input-small">Managament Sql</label>
                            <b-col sm="">
                                <a href="http://localhost:8080/ManagamentSqltWeb/paginas/PrincipalMenu.jsp">
                                    <b-img  thumbnail fluid src="https://cdn-icons-png.flaticon.com/512/4571/4571424.png" alt="Image 1"></b-img>
                                </a>
                                
                            </b-col>
                        </b-col>
                        <b-col sm="2">
                            <label for="input-small">Servicios Wsdl</label>
                            <b-col sm="">
                                <b-img thumbnail fluid src="images/wsdl2.png" alt="Image 1"></b-img>
                            </b-col>
                        </b-col>
                        <b-col sm="2">
                            <label for="input-small">Motor de Base de datos</label>
                            <b-col sm="">
                                <b-img thumbnail fluid src="https://cdn-icons-png.flaticon.com/512/4571/4571424.png" alt="Image 1"></b-img>
                            </b-col>
                        </b-col>
                    </b-row>
                </b-card>

            </b-container>
        </div>


    </body>
    <script src="script/js/vue.js" type="text/javascript"></script>
    <link href="style/bootstrap/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <script src="style/vue/vue.min.js" type="text/javascript"></script>

    <script src="NewStyle/bootstrap-vue.js" type="text/javascript"></script>

    <script src="style/bootstrap/index.min.js" type="text/javascript"></script>
    <link href="style/css/index.css" rel="stylesheet" type="text/css"/>

    <script src="NewStyle/vue-resource.min.js" type="text/javascript"></script>
    <script src="NewStyle/sweetalert.min.js" type="text/javascript"></script>
    <script src="style/vue/vuesax.umd.min.js" type="text/javascript"></script>
    <script src="script/login.js" type="text/javascript"></script>
    <link href="style/css/efectos.css" rel="stylesheet" type="text/css"/>

    <script src="script/js/PagIndex.js" type="text/javascript"></script>
</html>
