using Conference.Entities;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conference.DAL
{
    public class ConferenceDocumentDAL
    {
        private readonly Connection _connection;

        public ConferenceDocumentDAL(Connection connection) {
            _connection = connection;
        }

        //Registrar documento a tema 
        public(int result, string message) RegisterDocumentConference(int userID, int TopicsID, string NameDocument, byte[] Document, string DocumentExtension)
        {
            int response = -1;
            string message = string.Empty;
            string ruta = string.Empty;

            try
            {
                // Validar la extensión del documento
                var validExtensions = new List<string> { "PDF" };
                if (validExtensions.Contains(DocumentExtension.ToUpper()))
                {
                    string filename = $"{Guid.NewGuid()}.{DocumentExtension.ToLower()}";
                    string directory = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "UserDocuments");
                    if (!Directory.Exists(directory))
                    {
                        Directory.CreateDirectory(directory);
                    }

                    ruta = Path.Combine(directory);

                    using (var connection = _connection.Cnn)
                    {
                        connection.Open();

                        var parameters = new DynamicParameters();
                        parameters.Add("@p_NameDocument", NameDocument);
                        parameters.Add("@p_filename", filename);
                        parameters.Add("@p_UrlDocument", ruta);
                        parameters.Add("@p_TypeDocument", DocumentExtension);
                        parameters.Add("@p_UserID", userID);
                        parameters.Add("@p_TopicsID", TopicsID);
                        parameters.Add("@result", dbType: DbType.Int32, direction: ParameterDirection.Output);
                        parameters.Add("@message", dbType: DbType.String, size: 255, direction: ParameterDirection.Output);

                        connection.Execute("sp_document_event", parameters, commandType: CommandType.StoredProcedure);
                        message = parameters.Get<string>("@message");
                        response = parameters.Get<int>("@result");
                       

                        if (response == 1)
                        {
                            var ruta2 = Path.Combine(directory, filename);
                            // Guardar el nuevo archivo
                            File.WriteAllBytes(ruta2, Document);
                        }
                        //else if (response == 2)
                        //{
                        //    // Construir la ruta completa del archivo antiguo
                        //    string oldFilePath = Path.Combine(directory, oldFileName);

                        //    // Eliminar el archivo antiguo si existe
                        //    if (File.Exists(oldFilePath))
                        //    {
                        //        File.Delete(oldFilePath);
                        //    }

                        //    // Guardar el nuevo archivo
                        //    File.WriteAllBytes(ruta, Document);
                        //}
                    }
                }
            }
            catch (Exception ex)
            {
                _connection.Cnn.Close();
                InsertErrorLogSession("Error en RegisterDocument en userDAL en sp_document_event BD", ex.Message, userID);
            }

            return (response,message);
        }
        //REGRASAR LOS DATOS DEL USUARIO Y DOCUMENTO

        public List<DocumentEN> GetDocumentsByConference(int TopicsID, int userId)
        {
            List<DocumentEN> users = new List<DocumentEN>();
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@p_TopicsID", TopicsID);

                users = _connection.Cnn.Query<DocumentEN>("sp_GetDocumentAndUserDetailsByTopicsID", parameters, commandType: CommandType.StoredProcedure).ToList();


                foreach (var user in users)
                {
                    if (user != null && !string.IsNullOrEmpty(user.Url))
                    {
                        user.DocumentBase = ConvertFileToBase64(user.Url, user.FileName);
                    }
                }

                //if (user != null && !string.IsNullOrEmpty(user.profilePictureUrl))
                //{
                //    user.imagenBase = ConvertFileToBase64(user.profilePictureUrl, user.profilePictureFile);
                //}
            }

            catch (Exception ex)
            {
                // Manejo de la excepción
               // InsertErrorLog("Error en GetUserProfile en userDAL en sp_user_perfil BD", ex.Message);
            }
            finally
            {
                _connection.Cnn.Close();
            }

            return users!;
        }

        private string ConvertFileToBase64(string filePath, string filename)
        {

            string FilePath = Path.Combine(filePath, filename);
            if (File.Exists(FilePath))
            {
                byte[] fileBytes = File.ReadAllBytes(FilePath);
                return Convert.ToBase64String(fileBytes);
            }
            return null!;
        }

        //Agregar un log  espeficifico de un sessionID

        public void InsertErrorLogSession(string eventText, string message, int UserID)
        {
            try
            {
                _connection.Cnn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("p_UserID", UserID);
                parameters.Add("p_event", eventText);
                parameters.Add("p_message", message);

                _connection.Cnn.Execute("sp_insert_log", parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _connection.Cnn.Close();
            }
        }

    }
}
