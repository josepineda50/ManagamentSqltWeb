package MODELO;

import java.sql.Connection;
import java.sql.ResultSetMetaData;
import java.sql.Statement;

public class ProcSql {

    public String procCargaSentencia(String p_servidor,
            String p_puerto,
            String p_baseDatos,
            String p_usuarioBD,
            String p_contrasenaBD,
            String p_sentencia) {
        String Resultado = "0";
        int hay_datos = 0;
        try {
            Connection pruebacn = ConexionesBD.getConnection(p_servidor, p_puerto, p_baseDatos, p_usuarioBD, p_contrasenaBD);
            String sql = p_sentencia;
            Statement st = pruebacn.createStatement();
            java.sql.ResultSet rs;
            rs = st.executeQuery(sql);

            String separadorColumn = "";
            String separadorfilas = "";
            Resultado = "0{\"data\":[";

            // Obtener la información sobre las columnas
            int numeroColumnas = rs.getMetaData().getColumnCount();

            // Iterar sobre las filas
            while (rs.next()) {
                hay_datos = hay_datos + 1;
                // Iterar sobre las columnas
                Resultado = Resultado + separadorfilas + "{";
                for (int i = 1; i <= numeroColumnas; i++) {

                    separadorfilas = ",";

                    Resultado = Resultado + separadorColumn;
                    String nombreColumna = rs.getMetaData().getColumnName(i);
                    String valorColumna = rs.getString(i);

                    Resultado = Resultado + "\"" + nombreColumna + "\":\"" + valorColumna + "\"";
                    separadorColumn = ",";
                }
                separadorColumn = "";
                Resultado = Resultado + "}";

            }

//            while (rs.next()) {
//                hay_datos = hay_datos + 1;
//                Resultado = Resultado + separador;
//
//                // Obtener la información sobre las columnas
//                ResultSetMetaData metaData = rs.getMetaData();
//
//                // Obtener el número de columnas
//                int Column = metaData.getColumnCount();
//
//                Resultado = Resultado + "{\"dato1\":\"" + rs.getString(1).trim() + "\","
//                        + "\"dato2\":\"" + rs.getString(2).trim() + "\","
//                        + "\"dato2\":\"" + rs.getString(3).trim() + "\","
//                        + "\"dato2\":\"" + rs.getString(4).trim() + "\","
//                        + "\"dato2\":\"" + rs.getString(5).trim() + "\","
//                        + "\"dato2\":\"" + rs.getString(6).trim() + "\","
//                        + "\"dato2\":\"" + rs.getString(7).trim() + "\","
//                        + "\"dato3\":\"" + rs.getString(3).trim() + "\"}";
//
//                separador = ",";
//            }
            Resultado += "]}";

            if (hay_datos == 0) {
                Resultado = "1";
            }
        } catch (Exception e) {
            Resultado = "'1" + e.getMessage() + "'";
        }
        return Resultado;
    }

    public String procEjecutaDml(String p_servidor,
            String p_puerto,
            String p_baseDatos,
            String p_usuarioBD,
            String p_contrasenaBD,
            String p_sentencia) {
        String resultado = "";
        try {
            String sql = String.format(p_sentencia);
           Connection pruebacn = ConexionesBD.getConnection(p_servidor, p_puerto, p_baseDatos, p_usuarioBD, p_contrasenaBD);
           
            if (pruebacn != null) {

                Statement stm = pruebacn.createStatement();
                int m = stm.executeUpdate(sql);
                if (m == 1) {
                   resultado = "0";  
                }  else {
                    resultado = "1";
                }
                pruebacn.close();
            } else {
                resultado = pruebacn.toString();
            }

        } catch (Exception e) {
            resultado = e.getMessage();
        }
        return resultado;
    }

}
