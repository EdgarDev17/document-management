using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using Dapper;
using Microsoft.VisualBasic;

namespace Conference.DAL
{
    using Microsoft.Extensions.Options;
    using MySql.Data.MySqlClient;
    using System.Data;



    public class Connection
    {



        private MySqlConnection cnn;
        private MySqlCommand com;

        public MySqlConnection Cnn => cnn;
        public MySqlCommand Com => com;

        public Connection(IOptions<ConnectionStrings> connectionStrings)
        {
            var connectionString = connectionStrings.Value.ConferenceBD;
            IniciarObjetos(connectionString);
        }

        private void IniciarObjetos(string connectionString)
        {
            cnn = new MySqlConnection(connectionString);
            com = new MySqlCommand { Connection = cnn, CommandType = CommandType.StoredProcedure };
        }

        public DataTable Seleccionar()
        {
            DataTable dt = new DataTable();
            try
            {
                com.CommandType = CommandType.StoredProcedure;
                com.Connection.Open();
                MySqlDataReader dr = com.ExecuteReader(CommandBehavior.CloseConnection);
                dt.Load(dr);
            }
            catch
            {
                dt = null;
            }
            finally
            {
                if (com.Connection != null)
                    com.Connection.Close();
            }
            return dt;
        }

        public DataTable Seleccionar(string query)
        {
            DataTable dt = new DataTable();
            try
            {
                com.CommandText = query;
                com.CommandType = CommandType.Text;
                com.Connection.Open();
                MySqlDataReader dr = com.ExecuteReader(CommandBehavior.CloseConnection);
                dt.Load(dr);
            }
            catch
            {
                dt = null;
            }
            finally
            {
                if (com.Connection != null)
                    com.Connection.Close();
            }
            return dt;
        }

        public int Ejecutar(bool auto)
        {
            int resultado;
            try
            {
                com.Connection.Open();
                if (auto)
                    resultado = Convert.ToInt32(com.ExecuteScalar());
                else
                    resultado = com.ExecuteNonQuery();
            }
            catch (MySqlException ex)
            {
                resultado = ex.Number; // Usamos ex.Number en lugar de ex.ErrorCode para MySQL
            }
            finally
            {
                if (com.Connection != null) com.Connection.Close();
            }
            return resultado;
        }

        public int EjecutarTransaccion()
        {
            try
            {
                return com.ExecuteNonQuery();
            }
            catch (MySqlException ex)
            {
                return ex.Number; // Usamos ex.Number en lugar de ex.ErrorCode para MySQL
            }
        }

        public static IEnumerable<T> Query<T>(string sql, object param = null)
        {
            string connectionString = GetConnectionString();

            using (MySqlConnection mconn = new MySqlConnection(connectionString))
            {
                MySqlTransaction transaction = null;

                mconn.Open();

                transaction = mconn.BeginTransaction();

                try
                {
                    var query = mconn.Query<T>(sql, param, transaction);

                    transaction.Commit();

                    mconn.Close();
                    return query;
                }
                catch (Exception ex)
                {
                    if (transaction != null)
                    {
                        transaction.Rollback();
                    }
                    Console.WriteLine("Error Connection: " + ex.Message);
                    return null;
                }
            }
        }

        private static string GetConnectionString()
        {
            // Método para obtener la cadena de conexión, si es necesario
            return "your_connection_string_here";
        }
    }

}
