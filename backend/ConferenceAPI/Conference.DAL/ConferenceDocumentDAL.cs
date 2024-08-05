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
        public int RegisterDocument(int userID, int TopicsID, string NameDocument, byte[] Document, string DocumentExtension)
        {
            int response = -1;
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

                    ruta = Path.Combine(directory, filename);

                    using (var connection = _connection.Cnn)
                    {
                        connection.Open();

                        var parameters = new DynamicParameters();
                        parameters.Add("@p_UserID", userID);
                        parameters.Add("@p_url", ruta);
                        parameters.Add("@p_name", filename);
                        parameters.Add("@result", dbType: DbType.Int32, direction: ParameterDirection.Output);
                        parameters.Add("@DocumentFile", dbType: DbType.String, direction: ParameterDirection.Output);
                        connection.Execute("sp_register_document", parameters, commandType: CommandType.StoredProcedure);

                        response = parameters.Get<int>("@result");
                        string oldFileName = parameters.Get<string>("@DocumentFile");

                        if (response == 1)
                        {
                            // Guardar el nuevo archivo
                            File.WriteAllBytes(ruta, Document);
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
                InsertErrorLogSession("Error en RegisterDocument en userDAL en sp_register_document BD", ex.Message, userID);
            }

            return response;
        }

    }
}
