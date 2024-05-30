using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using Conference.Entities;
using MySql.Data.MySqlClient;
namespace Conference.DAL
{
    public class conferenceDAL
    {
        private readonly Connection _connection;
        public conferenceDAL(Connection connection)
        {
            _connection = connection;

        }

        public List<areaEN> Getarea(int userID)
        {
            List<areaEN> areas = new List<areaEN>();
            try
            {
                _connection.Cnn.Open();

                areas = _connection.Cnn.Query<areaEN>("sp_get_area", commandType: CommandType.StoredProcedure).AsList();
            }
            catch (Exception ex)
            {

                _connection.Cnn.Close();
                InsertErrorLogSession("Error en Getarea en conferenceDAL en  sp_get_area BD", ex.Message, userID);
            }
            finally
            {
                _connection.Cnn.Close();
            }
            return areas;
        }


        //Registrar una conferencia 

        public int RegisterConference(int userID, int RollID, string nameInstitution, string webSiteInstitution, string contactPhoneInstitution, string nameConference,
            string typeConference, string description, DateTime beggingDate, DateTime finishDate, int areaID, int docuementAttempt)
        {
            int result = 0;
            try
            {
                _connection.Cnn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("@p_UserID", userID);
                parameters.Add("@p_RollID", RollID);
                parameters.Add("@p_nameInstitution", nameInstitution);
                parameters.Add("@p_websiteInstitution", webSiteInstitution);
                parameters.Add("@p_contactPhoneInstitution", contactPhoneInstitution);
                parameters.Add("@p_nameConference", nameConference);
                parameters.Add("@p_typeConference", typeConference);
                parameters.Add("@p_description", description);
                parameters.Add("@p_beggingDate", beggingDate);
                parameters.Add("@p_finishDate", finishDate);
                parameters.Add("@p_areaID", areaID);
                parameters.Add("@p_documentAttempt", docuementAttempt);
                parameters.Add("@result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                _connection.Cnn.Execute("sp_registration_conference", parameters, commandType: CommandType.StoredProcedure);

                result = parameters.Get<int>("@result");
            }
            catch (Exception ex)
            {
                //Console.WriteLine("Error: " + ex.Message);

                _connection.Cnn.Close();
                InsertErrorLogSession("Error en egisterConference en conferenceDAL en  sp_registration_conference BD", ex.Message, userID);
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
