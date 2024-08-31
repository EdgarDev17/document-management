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
                Console.WriteLine(ex);
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
        //REGRASAR LOS DATOS DEL  DOCUMENTO por rolID

        public List<DocumentRolIdEN> GetDocumentsByRolID(int userId,int TopicsID,int RolId )
        {
            List<DocumentRolIdEN> users = new List<DocumentRolIdEN>();
            try
            {

                
                var parameters = new DynamicParameters();
                parameters.Add("@p_UserID", userId);
                parameters.Add("@p_TopicsID", TopicsID);
                parameters.Add("@p_RolID", RolId);
                users = _connection.Cnn.Query<DocumentRolIdEN>("sp_GetDocumentsByUserAndRole", parameters, commandType: CommandType.StoredProcedure).ToList();


                foreach (var user in users)
                {
                    if (user != null && !string.IsNullOrEmpty(user.Url))
                    {
                        user.DocumentBase = ConvertFileToBase64(user.Url, user.FileName);
                    }
                }

               
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

        public int RegisterDocumentEvaluationCriteria(int EvaCritConfID, int ScaleID, int UserID, int DocumentID)
        {
            int result = 0;
            try
            {
                _connection.Cnn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("@p_evaCritConfID", EvaCritConfID);
                parameters.Add("@p_scaleID", ScaleID);
                parameters.Add("@p_UserID", UserID);
                parameters.Add("@p_documentID", DocumentID);

                parameters.Add("@result", dbType: DbType.Int32, direction: ParameterDirection.Output);


                _connection.Cnn.Execute("sp_RegisterDocumentEvaluationCriteria", parameters, commandType: CommandType.StoredProcedure);

                result = parameters.Get<int>("@result");


            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);

                _connection.Cnn.Close();
                InsertErrorLogSession("Error en conferenceDAL en sp_RegisterDocumentEvaluationCriteria", ex.Message, UserID);
            }
            finally
            {
                _connection.Cnn.Close();
            }

            return result;
        }

        //Registrar veredicto del documento

        public  (int result, string message) RegisterDocumentVeredict(int documentID, int veredictID, int userId)
        {
            int result = 0;
            string message = string.Empty;
            try
            {
                _connection.Cnn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("@p_documentID", documentID);
                parameters.Add("@p_veredictID", veredictID);
                parameters.Add("@p_UserID", userId);


                parameters.Add("@result", dbType: DbType.Int32, direction: ParameterDirection.Output);
                parameters.Add("@message", dbType: DbType.String, size: 255, direction: ParameterDirection.Output);

                _connection.Cnn.Execute("sp_RegisterDocumentVeredict", parameters, commandType: CommandType.StoredProcedure);

                result = parameters.Get<int>("@result");
                message = parameters.Get<string>("@message");

            }
            catch (Exception ex)
            {
                //Console.WriteLine("Error: " + ex.Message);

                _connection.Cnn.Close();
                InsertErrorLogSession("Error en conferenceDAL en sp_RegisterDocumentVeredict", ex.Message, userId);
            }
            finally
            {
                _connection.Cnn.Close();
            }

            return (result, message);
        }

        //listar los criterios evaluados del documento 

        public DocumentEvaluationDetails GetDocumentEvaluationDetails(int documentID, int userID)

        {


            var documentEvaluationDetails = new DocumentEvaluationDetails
            {
                Evaluations = new List<ResponseDocumentEvaluation>()
            };
            //List<ResponseDocumentEvaluation> Evaluation = new List<ResponseDocumentEvaluation>();
            try
            {
                var parameters = new DynamicParameters();
                _connection.Cnn.Open();
                parameters.Add("@p_documentID", documentID);
                using (var multi = _connection.Cnn.QueryMultiple("GetDocumentEvaluationDetails", parameters, commandType: CommandType.StoredProcedure))
                {
                    documentEvaluationDetails.Evaluations = multi.Read<ResponseDocumentEvaluation>().AsList();
                    documentEvaluationDetails.Veredict = multi.ReadFirstOrDefault<ResponseDocumentVeredict>();
                }
            }
            catch (Exception ex)
            {


                _connection.Cnn.Close();
                InsertErrorLogSession("Error en GetTopics en conferenceDAL en GetDocumentEvaluationDetails", ex.Message, userID);
            }
            finally
            {
                _connection.Cnn.Close();
            }
            return documentEvaluationDetails;
        }
        //estado del documento 
        public string  GetValidateDocumentVerdict(int documentID, int userID)
        {
           
            string message = string.Empty;
            try
            {
                _connection.Cnn.Open();

                var parameters = new DynamicParameters();

                parameters.Add("@p_documentID",documentID);
               

               
                parameters.Add("@p_status", dbType: DbType.String, size: 255, direction: ParameterDirection.Output);
                _connection.Cnn.Execute("GetValidateDocumentVerdict", parameters, commandType: CommandType.StoredProcedure);

              
                message = parameters.Get<string>("@p_status");
            }
            catch (Exception ex)
            {
                //Console.WriteLine("Error: " + ex.Message);

                _connection.Cnn.Close();
                InsertErrorLogSession("Error en conferenceDAL en  GetValidateDocumentVerdict BD", ex.Message, userID);
            }
            finally
            {
                _connection.Cnn.Close();
            }

            return  message;
        }
    }
}
