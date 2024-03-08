package CONTROLADORES;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import MODELO.ConexionesBD;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet(name = "SrvConfiguracionBD", urlPatterns = {"/SrvConfiguracionBD"})
public class SrvConfiguracionBD extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try ( PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet SrvConfiguracionBD</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet SrvConfiguracionBD at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //processRequest(request, response);

        String v_GestorBD = request.getParameter("GestorBD").trim();

        String Resultado = "";

        if (v_GestorBD.equals("sqlserver")) {

            try {

                String v_servidor = request.getParameter("servidor").trim();
                String v_puerto = request.getParameter("puerto").trim();
                String v_basedatos = request.getParameter("basedatos").trim();
                String v_usuariobd = request.getParameter("usuariobd").trim();
                String v_contrasenabd = request.getParameter("contrasenabd").trim();

                Connection pruebacn = ConexionesBD.getConnection(v_servidor, v_puerto, v_basedatos, v_usuariobd, v_contrasenabd);

                if (pruebacn == null) {
                    Resultado = "0";
                } else {
                    Resultado = "1";
                }

            } catch (SQLException ex) {
                Logger.getLogger(SrvConfiguracionBD.class.getName()).log(Level.SEVERE, null, ex);
            }

        }

        if (v_GestorBD.equals("as400")) {
            Resultado = "Este controlador aun no se ha configurado";
        }

        if (v_GestorBD.equals("CrearCon")) {

            try {

                String v_jsonConexiones = request.getParameter("jsonConexiones").trim();
                String v_nomConexion = request.getParameter("nomCon").trim();

                ConexionesBD lb = new ConexionesBD();

                if (v_nomConexion.equals("")) {
                    Resultado = lb.pro_crearConexionArchivo(v_jsonConexiones);
                } else {
                    String v_ExisteConexion = lb.proc_validaConexion(v_nomConexion);

                    if (v_ExisteConexion.equals("1")) {
                        Resultado = "Nombre de conexion ya existe previamente configurada";
                    } else {
                        Resultado = lb.pro_crearConexionArchivo(v_jsonConexiones);
                    }
                }

            } catch (Exception e) {
                Resultado = e.getMessage();
            }
        }

        if (v_GestorBD.equals("cargaConexiones")) {
            try {
                ConexionesBD lb = new ConexionesBD();
                Resultado = "'" + lb.proc_cargaConexiones() + "'";

            } catch (Exception e) {
                Resultado = e.getMessage();
            }
        }

        String greetings = Resultado;

        response.setContentType("text/plain");
        response.getWriter().write(greetings);

    }

}
