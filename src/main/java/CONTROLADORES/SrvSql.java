package CONTROLADORES;

import MODELO.ProcSql;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "SrvSql", urlPatterns = {"/SrvSql"})
public class SrvSql extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try ( PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet SrvSql</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet SrvSql at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // processRequest(request, response);

        String v_opcion = request.getParameter("opcion").trim();

        String Resultado = "";

        String v_servidor = request.getParameter("ip").trim();
        String v_puerto = request.getParameter("puerto").trim();
        String v_bd = request.getParameter("bd").trim();
        String v_usuer = request.getParameter("usuer").trim();
        String v_password = request.getParameter("password").trim();
        String v_SentenciaSql = request.getParameter("SentenciaSql").trim();

        if (v_opcion.equals("1")) {

            try {

                ProcSql lb = new ProcSql();

                Resultado = "'" + lb.procCargaSentencia(v_servidor, v_puerto, v_bd, v_usuer, v_password, v_SentenciaSql) + "'";

            } catch (Exception e) {
                Resultado = "'1" + e.getMessage() + "'";
            }

        }
        
          if (v_opcion.equals("2")) {

            try {

                ProcSql lb = new ProcSql();

                Resultado =  lb.procEjecutaDml(v_servidor, v_puerto, v_bd, v_usuer, v_password, v_SentenciaSql) ;

            } catch (Exception e) {
                Resultado =  e.getMessage() ;


            }

        }

        String greetings = Resultado;

        response.setContentType("text/plain");
        response.getWriter().write(greetings);

    }

}
