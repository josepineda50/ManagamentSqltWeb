package MODELO;

import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONObject;

public class ConexionesBD {

    private static Connection cn;

    public static Connection getConnection(String p_servidor,
            String p_puerto,
            String p_baseDatos,
            String p_usuarioBD,
            String p_contrasenaBD) throws SQLException {
        String resultado = "";
        try {
            /*Desarrollo*/
            String ip = p_servidor + ":" + p_puerto;
            String usuario = p_usuarioBD;
            String contrasena = p_contrasenaBD;
            String basedatos = p_baseDatos;

            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            cn = DriverManager.getConnection("jdbc:sqlserver://" + ip + ";DatabaseName=" + basedatos, usuario, contrasena);
            resultado = "0";
        } catch (ClassNotFoundException | SQLException e) {
            resultado = e.getMessage();
            cn = null;
        }
        return cn;
    }

    public String pro_crearConexionArchivo(String p_jsonConexiones) {
        String resultado = "0";

        try {
            
          
            
            File archivo = new File("C:\\ManagamentSqltWeb\\prop.properties");
            try ( OutputStream outputStream = new FileOutputStream(archivo)) {
                //  System.out.println("\tCreando el objeto Properties");
                Properties prop = new Properties();

                //  System.out.println("\tCreamos las claves del archivo properties y sus valores");
                // set key and value
                prop.setProperty("ConexionesBD", p_jsonConexiones);
//                prop.setProperty("db.usuario", "hashSoft");
//                prop.setProperty("db.password", "password");

                // System.out.println("\tAlmacenamos el arhivo");
                // System.out.println("\tCon un comentario al inicio");
                prop.store(outputStream, "Config");

                //System.out.println("\tEl archivo se cierra en este punto gracias al Try-catch con recursos");
                resultado = "0";
            }

        } catch (Exception e) {
            resultado = e.getMessage();
        }

        return resultado;

    }

    public String proc_cargaConexiones() {
        String resultado = "";
        try {
            Properties propiedades = new Properties();
            InputStream entrada = null;
            entrada = new FileInputStream("C:\\ManagamentSqltWeb\\prop.properties");
            propiedades.load(entrada);
            
            String conexiones = propiedades.getProperty("ConexionesBD");
            resultado = conexiones;
            
        } catch (Exception e) {
            resultado = e.getMessage();
        }
        return resultado;
    }
    
    public String proc_validaConexion(String p_nomConexion){
    String result = "";
        
        try {
            Properties propiedades = new Properties();
            InputStream entrada = null;
            entrada = new FileInputStream("C:\\ManagamentSqltWeb\\prop.properties");
            propiedades.load(entrada);
            
            String JsonConexiones = propiedades.getProperty("ConexionesBD");
            
             JSONObject InfoGeneral = new JSONObject(JsonConexiones);
            
              int i = 0;

            i = InfoGeneral.getJSONArray("Conexiones").length() ;
            
            String v_gestorBD = "";
            
            //List<Pais> ListaPais = new ArrayList<>();
            
             for (int j = 1; j <= i; j += 1) {
                String paises = InfoGeneral.getJSONArray("Conexiones").get(j).toString();
                JSONObject objPaises = new JSONObject(paises);

                v_gestorBD = objPaises.get("nomConexion").toString();
              
                 if (p_nomConexion.equals(v_gestorBD)){
                     
                     return "1";
                 }
                //ListaPais.add(new Pais(CodPais, DescPais));

            }
             result = "0";
             
            
        } catch (Exception e) {
        result = e.getMessage();
        }
    return result;
    }

}
