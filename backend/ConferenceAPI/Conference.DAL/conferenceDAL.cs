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

        public (int result, int conferenceID) RegisterConference(int userID, int RollID, string nameInstitution, string webSiteInstitution, string contactPhoneInstitution, string nameConference,
            string typeConference, string description, DateTime beggingDate, DateTime finishDate, int areaID, int docuementAttempt)
        {
            int result = 0;
            int conferenceID = 0;
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
                parameters.Add("@conferenceID", dbType: DbType.Int32, direction: ParameterDirection.Output);
                _connection.Cnn.Execute("sp_registration_conferences", parameters, commandType: CommandType.StoredProcedure);

                result = parameters.Get<int>("@result");
                conferenceID = parameters.Get<int>("@conferenceID");
            }
            catch (Exception ex)
            {
                //Console.WriteLine("Error: " + ex.Message);

                _connection.Cnn.Close();
                InsertErrorLogSession("Error en registerConference en conferenceDAL en  sp_registration_conference BD", ex.Message, userID);
            }
            finally
            {
                _connection.Cnn.Close();
            }

            return (result, conferenceID);
        }

        //Registrar una conferencia topics

        public int RegisterConferenceTopics(string name, string description, string location, DateTime startHour, DateTime startEnd, int conferenceId, int userId)
        {
            int result = 0;
            try
            {
                _connection.Cnn.Open();

                var parameters = new DynamicParameters();

                parameters.Add("@p_Name", name);
                parameters.Add("@p_Description", description);
                parameters.Add("@p_Location", location);
                parameters.Add("@p_StartHour", startHour);
                parameters.Add("@p_StartEnd", startEnd);
                parameters.Add("@p_conferenceID", conferenceId);
                parameters.Add("@p_userID", userId);

                //  parameters.Add("@result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                _connection.Cnn.Execute("sp_insert_temp_conferencetopics", parameters, commandType: CommandType.StoredProcedure);

                // result = parameters.Get<int>("@result");
            }
            catch (Exception ex)
            {
                //Console.WriteLine("Error: " + ex.Message);
                result = 1;
                _connection.Cnn.Close();
                InsertErrorLogSession("Error en registerConferenceTopics en conferenceDAL en sp_insert_temp_conferencetopics BD", ex.Message, userId);
            }
            finally
            {
                _connection.Cnn.Close();
            }

            return result;
        }

        //actualizar una conferencia topics

        public int UpdateConferenceTopics(string name, string description, string location, DateTime startHour, DateTime startEnd, int conferenceId, int userId, int topicsID)
        {
            int result = 0;
            try
            {
                _connection.Cnn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("@p_TopicsID", topicsID);
                parameters.Add("@p_Name", name);
                parameters.Add("@p_Description", description);
                parameters.Add("@p_Location", location);
                parameters.Add("@p_StartHour", startHour);
                parameters.Add("@p_StartEnd", startEnd);
                parameters.Add("@p_conferenceID", conferenceId);
                parameters.Add("@p_userID", userId);

                 parameters.Add("@result", dbType: DbType.Int32, direction: ParameterDirection.Output);


                _connection.Cnn.Execute("sp_update_temp_conferencetopics", parameters, commandType: CommandType.StoredProcedure);

                result = parameters.Get<int>("@result");


            }
            catch (Exception ex)
            {
                //Console.WriteLine("Error: " + ex.Message);
              
                _connection.Cnn.Close();
                InsertErrorLogSession("Error en actualizarConferenceTopics en conferenceDAL en  sp_update_temp_conferencetopics BD", ex.Message, userId);
            }
            finally
            {
                _connection.Cnn.Close();
            }

            return result;
        }


        //eliminar una conferencia topics

        public int DeleteConferenceTopics( int topicsID,int userId)
        {
            int result = 0;
            try
            {
                _connection.Cnn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("@p_TopicsID", topicsID);
            

                parameters.Add("@result", dbType: DbType.Int32, direction: ParameterDirection.Output);


                _connection.Cnn.Execute("sp_delete_temp_conferencetopics", parameters, commandType: CommandType.StoredProcedure);

                result = parameters.Get<int>("@result");


            }
            catch (Exception ex)
            {
                //Console.WriteLine("Error: " + ex.Message);

                _connection.Cnn.Close();
                InsertErrorLogSession("Error en eliminarConferenceTopics en conferenceDAL en sp_delete_temp_conferencetopics ", ex.Message, userId);
            }
            finally
            {
                _connection.Cnn.Close();
            }

            return result;
        }


        //mover una conferencia topics

        public int MoveConferenceTopics(int conferenceID, int userId)
        {
            int result = 0;
            try
            {
                _connection.Cnn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("@p_conferenceID", conferenceID);
                parameters.Add("@p_userID", userId);


                parameters.Add("@result", dbType: DbType.Int32, direction: ParameterDirection.Output);


                _connection.Cnn.Execute("sp_Move_Topics", parameters, commandType: CommandType.StoredProcedure);

                result = parameters.Get<int>("@result");


            }
            catch (Exception ex)
            {
                //Console.WriteLine("Error: " + ex.Message);

                _connection.Cnn.Close();
                InsertErrorLogSession("Error en moveConferenceTopics en conferenceDAL en sp_Move_Topics ", ex.Message, userId);
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

        //listar topics de conferencia

        public List<TopicsEN> GetTopics(int userID, int conferenceID)
        {
            List<TopicsEN> areas = new List<TopicsEN>();
            try
            {
                var parameters = new DynamicParameters();
                _connection.Cnn.Open();
                parameters.Add("@p_conferenceID", conferenceID);
                areas = _connection.Cnn.Query<TopicsEN>("sp_list_temp_conferencetopics", parameters, commandType: CommandType.StoredProcedure).AsList();
            }
            catch (Exception ex)
            {
               
               
                _connection.Cnn.Close();
                InsertErrorLogSession("Error en GetTopics en conferenceDAL en  sp_list_temp_conferencetopics", ex.Message, userID);
            }
            finally
            {
                _connection.Cnn.Close();
            }
            return areas;
        }

        //listar conferencias de manera geral 

        public List<ConferencesDetailsEN> get_conferences_general(int userID)
        {
            List<ConferencesDetailsEN> conferences = new List<ConferencesDetailsEN>();
            try
            {
                var parameters = new DynamicParameters();
                _connection.Cnn.Open();
              
                conferences= _connection.Cnn.Query<ConferencesDetailsEN>("sp_get_conferences_general",  commandType: CommandType.StoredProcedure).AsList();
            }
            catch (Exception ex)
            {


                _connection.Cnn.Close();
                InsertErrorLogSession("Error en GetTopics en conferenceDAL en  sp_get_conferences_general", ex.Message, userID);
            }
            finally
            {
                _connection.Cnn.Close();
            }
            return conferences;
        }


        //listar conferencias de manera especifico por conferenceID

        public List<ConferencesDetailsEN> get_conferences_specific(int conferenceID,int userID)
        {
            List<ConferencesDetailsEN> conferences = new List<ConferencesDetailsEN>();
            try
            {
                var parameters = new DynamicParameters();
                _connection.Cnn.Open();
                parameters.Add("@p_conferenceID", conferenceID);
                conferences = _connection.Cnn.Query<ConferencesDetailsEN>("sp_get_conference_details", parameters, commandType: CommandType.StoredProcedure).AsList();
            }
            catch (Exception ex)
            {


                _connection.Cnn.Close();
                InsertErrorLogSession("Error en GetTopics en conferenceDAL en  sp_get_conference_details`", ex.Message, userID);
            }
            finally
            {
                _connection.Cnn.Close();
            }
            return conferences;
        }

        //listar conferencias de manera especifico por usuario

        public List<ConferencesDetailsEN> get_conferences_specific_by_user( int userID)
        {
            List<ConferencesDetailsEN> conferences = new List<ConferencesDetailsEN>();
            try
            {
                var parameters = new DynamicParameters();
                _connection.Cnn.Open();
                parameters.Add("@p_userID", userID);
                conferences = _connection.Cnn.Query<ConferencesDetailsEN>("sp_get_conference_details_by_user", parameters, commandType: CommandType.StoredProcedure).AsList();
            }
            catch (Exception ex)
            {


                _connection.Cnn.Close();
                InsertErrorLogSession("Error en GetTopics en conferenceDAL en  sp_get_conference_details`", ex.Message, userID);
            }
            finally
            {
                _connection.Cnn.Close();
            }
            return conferences;
        }

        //listar topics de conferencias por conferenceID

        public List<ListTopicsEN> get_ListTopicsByConferenceID(int conferenceID,int userID)
        {
            List<ListTopicsEN> topics = new List<ListTopicsEN>();
            try
            {
                var parameters = new DynamicParameters();
                _connection.Cnn.Open();
                parameters.Add("@p_conferenceID", conferenceID);
                topics = _connection.Cnn.Query<ListTopicsEN>("sp_ListTopicsByConferenceID", parameters, commandType: CommandType.StoredProcedure).AsList();
            }
            catch (Exception ex)
            {


                _connection.Cnn.Close();
                InsertErrorLogSession("Error en GetTopics en conferenceDAL en  sp_ListTopicsByConferenceID", ex.Message, userID);
            }
            finally
            {
                _connection.Cnn.Close();
            }
            return topics;
        }

        //listar topics de conferencias por TopicsID

        public List<ListTopicsEN> get_ListTopicsByTopicsID(int topicsID, int userID)
        {
            List<ListTopicsEN> topics = new List<ListTopicsEN>();
            try
            {
                var parameters = new DynamicParameters();
                _connection.Cnn.Open();
                parameters.Add("@p_topicsID", topicsID);
                topics = _connection.Cnn.Query<ListTopicsEN>("sp_ListTopicsByTopicsID", parameters, commandType: CommandType.StoredProcedure).AsList();
            }
            catch (Exception ex)
            {


                _connection.Cnn.Close();
                InsertErrorLogSession("Error en GetTopics en conferenceDAL en  sp_ListTopicsByTopicsID", ex.Message, userID);
            }
            finally
            {
                _connection.Cnn.Close();
            }
            return topics;
        }

        //Registrar una conferencia 

        public (int result, string message) RegisterAssignUserTopic(int userID,int TopicsID, int RollID)
        {
            int result = 0;
            string message = string.Empty;
            try
            {
                _connection.Cnn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("@p_UserID", userID);
                parameters.Add("@p_RollID", RollID);
                parameters.Add("@p_TopicsID", TopicsID);
             
                parameters.Add("@result", dbType: DbType.Int32, direction: ParameterDirection.Output);
                parameters.Add("@message", dbType: DbType.String,size:255, direction: ParameterDirection.Output);
                _connection.Cnn.Execute("sp_assign_user_topic", parameters, commandType: CommandType.StoredProcedure);

                result = parameters.Get<int>("@result");
                message = parameters.Get<string>("@message");
            }
            catch (Exception ex)
            {
                //Console.WriteLine("Error: " + ex.Message);

                _connection.Cnn.Close();
                InsertErrorLogSession("Error en registerConference en conferenceDAL en  sp_assign_user_topic BD", ex.Message, userID);
            }
            finally
            {
                _connection.Cnn.Close();
            }

            return (result, message);
        }

        //listar usuarios de la conferencias por conferencID

        public List<ConferencesDatailsUser> GetConferenceUsersDetails(int conferenceID, int userID)
        {
            List<ConferencesDatailsUser> Users = new List<ConferencesDatailsUser>();
            try
            {
                var parameters = new DynamicParameters();
                _connection.Cnn.Open();
                parameters.Add("@p_topicsID", conferenceID);
                Users= _connection.Cnn.Query<ConferencesDatailsUser>("GetConferenceUsersDetails", parameters, commandType: CommandType.StoredProcedure).AsList();
            }
            catch (Exception ex)
            {


                _connection.Cnn.Close();
                InsertErrorLogSession("Error en GetTopics en conferenceDAL en  GetConferenceUsersDetails", ex.Message, userID);
            }
            finally
            {
                _connection.Cnn.Close();
            }
            return Users;
        }
    }
}
