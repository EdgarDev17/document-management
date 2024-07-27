using Conference.Entities;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conference.DAL
{
    public class CertificateDAL
    {
        private readonly Connection _connection;

        public CertificateDAL(Connection _connection)
        {
            this._connection = _connection;
        }

        public List<CertificateEN> GetCertificatesData(int userID, int topicId, ref string message)
        {
            List<CertificateEN> certificates = new List<CertificateEN>();
            try
            {
                _connection.Cnn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("@p_TopicsID", topicId);
                parameters.Add("@p_UserID", userID);

                certificates = _connection.Cnn.Query<CertificateEN>("CertificateEN", parameters, commandType: CommandType.StoredProcedure).AsList();
            }
            catch (Exception ex)
            {

                _connection.Cnn.Close();
                InsertErrorLogSession("Error en GetCertificates en certificateDAL en sp_get_diplomadata BD", ex.Message, userID);
            }
            finally
            {
                _connection.Cnn.Close();
            }
            return certificates;
        }

        public int SaveCertificateConfigs(int UserId,int TopicId,string InstitutionName,
            string Content,string LogoPath,string BackgroundImagePath,string OrganizerName1, 
            string OrganizerTitle1, string OrganizerName2,string OrganizerTitle2,
            string SignatureImagePath1,string SignatureImagePath2, string SealLogo, ref string message)
        {
            int result = 0;
            try
            {
                _connection.Cnn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("@p_Description", Content);
                parameters.Add("@p_Signed", string.Empty);
                parameters.Add("@p_CongresLogoURL", LogoPath);
                parameters.Add("@p_CongresSealURL", SealLogo);
                parameters.Add("@p_TopicsID", TopicId);
                parameters.Add("@p_UserID", UserId);
                parameters.Add("@p_BackgroundImgURL", BackgroundImagePath);
                parameters.Add("@p_OrganizerName1", OrganizerName1);
                parameters.Add("@p_OrganizerName2", OrganizerName2);
                parameters.Add("@p_OrganizerTitle1", OrganizerTitle1);
                parameters.Add("@p_OrganizerTitle2", OrganizerTitle2);
                parameters.Add("@p_SignatureImagePath1", SignatureImagePath1);
                parameters.Add("@p_SignatureImagePath2", SignatureImagePath2);
                parameters.Add("@result", dbType: DbType.Int32, direction: ParameterDirection.Output);
                parameters.Add("@message", dbType: DbType.String, direction: ParameterDirection.Output);

                _connection.Cnn.Execute("sp_insert_diplomadata", parameters, commandType: CommandType.StoredProcedure);

                result = parameters.Get<int>("@result");
                message = parameters.Get<string>("@message");

            }
            catch (Exception ex)
            {
                //Console.WriteLine("Error: " + ex.Message);

                _connection.Cnn.Close();
                InsertErrorLogSession("Error en SaveCertificateConfigs en CertificateDAL en sp_insert_diplomadata BD", ex.Message, UserId);
            }
            finally
            {
                _connection.Cnn.Close();
            }

            return result;
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
