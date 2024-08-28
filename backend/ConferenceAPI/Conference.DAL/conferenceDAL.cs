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
using static Google.Protobuf.Reflection.SourceCodeInfo.Types;
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
        public (int result, int conferenceID) RegisterConference(int userID, int RollID, int institucionID, string nameConference,
            string typeConference, string description, DateTime beggingDate, DateTime finishDate, int areaID, int docuementAttempt,string location,string urlconference)
        {
            int result = 0;
            int conferenceID = 0;
            try
            {
                
                _connection.Cnn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("@p_UserID", userID);
                parameters.Add("@p_RollID", RollID);
                parameters.Add("@p_institucionID", institucionID);
                parameters.Add("@p_nameConference", nameConference);
                parameters.Add("@p_typeConference", typeConference);
                parameters.Add("@p_description", description);
                parameters.Add("@p_beggingDate", beggingDate);
                parameters.Add("@p_finishDate", finishDate);
                parameters.Add("@p_areaID", areaID);
                parameters.Add("@p_documentAttempt", docuementAttempt);
                // Manejar el par�metro location
                if (string.IsNullOrEmpty(location))
                {
                    parameters.Add("@p_Location", DBNull.Value, DbType.String);
                }
                else
                {
                    parameters.Add("@p_Location", location);
                }
                // Manejar el par�metro urlconference
                if (string.IsNullOrEmpty(urlconference))
                {
                    parameters.Add("@p_urlconference", DBNull.Value, DbType.String);
                }
                else
                {
                    parameters.Add("@p_urlconference", urlconference);
                }
                parameters.Add("@result", dbType: DbType.Int32, direction: ParameterDirection.Output);
                parameters.Add("@conferenceID", dbType: DbType.Int32, direction: ParameterDirection.Output);
                _connection.Cnn.Execute("sp_registration_conferences", parameters, commandType: CommandType.StoredProcedure);

                result = parameters.Get<int>("@result");
                conferenceID = parameters.Get<int>("@conferenceID");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);

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

        public int RegisterConferenceTopics(string name, string description, string location, DateTime startHour, DateTime startEnd, int conferenceId, int userId ,int TotalAttendees,int TotalSpeakers,string nameSpeaker)
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
                parameters.Add("@p_TotalAttendees", TotalAttendees);
                parameters.Add("@p_TotalSpeakers", TotalSpeakers);
                parameters.Add("@p_nameSpeaker", nameSpeaker);

                //  parameters.Add("@result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                _connection.Cnn.Execute("sp_insert_temp_conferencetopics", parameters, commandType: CommandType.StoredProcedure);

                // result = parameters.Get<int>("@result");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
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

        public int UpdateConferenceTopics(string name, string description, string location, DateTime startHour, DateTime startEnd, int conferenceId, int userId, int topicsID, int TotalAttendees, int TotalSpeakers,string nameSpeaker)
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
                parameters.Add("@p_TotalAttendees", TotalAttendees);
                parameters.Add("@p_TotalSpeakers", TotalSpeakers);
                parameters.Add("@p_nameSpeaker", nameSpeaker);
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
                Console.WriteLine(ex);
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
                Console.WriteLine(ex);
        
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
               
                Console.WriteLine(ex);
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

                Console.WriteLine(ex);
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
        //listar topics de conferencias por userID

        public List<ListTopicsENU> get_ListTopicsByUserID(int userID)
        {
            List<ListTopicsENU> topics = new List<ListTopicsENU>();
            try
            {
                var parameters = new DynamicParameters();
                _connection.Cnn.Open();
                parameters.Add("@p_UserID", userID);
                topics = _connection.Cnn.Query<ListTopicsENU>("sp_ListTopicsByUserID", parameters, commandType: CommandType.StoredProcedure).AsList();
            }
            catch (Exception ex)
            {


                _connection.Cnn.Close();
                InsertErrorLogSession("Error en GetTopics en conferenceDAL en  sp_ListTopicsByUserID", ex.Message, userID);
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
                parameters.Add("@p_TopicsID", TopicsID);
                parameters.Add("@p_RolID", RollID);
               
             
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
                parameters.Add("@conferenceId", conferenceID);
                Users= _connection.Cnn.Query<ConferencesDatailsUser>("sp_GetConferenceUsers", parameters, commandType: CommandType.StoredProcedure).AsList();
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

        //asignacion de nuevo rol jurado
        public (int result, string message) UpdateUserConferenceRole(int userID, int TopicsID, int RollID)
        {
            int result = 0;
            string message = string.Empty;
            try
            {
                _connection.Cnn.Open();

                var parameters = new DynamicParameters();
                                                                                
                parameters.Add("@p_UserID", userID);
                parameters.Add("@p_NewRolID ", RollID);
                parameters.Add("@p_TopicsID", TopicsID);

                parameters.Add("@result", dbType: DbType.Int32, direction: ParameterDirection.Output);
                parameters.Add("@message", dbType: DbType.String, size: 255, direction: ParameterDirection.Output);
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



        public List<ResponseEvalutionscale> getScale(int userID)
        {
            List<ResponseEvalutionscale> areas = new List<ResponseEvalutionscale>();
            try
            {
                _connection.Cnn.Open();

                areas = _connection.Cnn.Query<ResponseEvalutionscale>("sp_get_Evalutionscale", commandType: CommandType.StoredProcedure).AsList();
            }
            catch (Exception ex)
            {

                _connection.Cnn.Close();
                InsertErrorLogSession("Error  en conferenceDAL en  sp_get_Evalutionscale", ex.Message, userID);
            }
            finally
            {
                _connection.Cnn.Close();
            }
            return areas;
        }


        public List<ResponseEvalutioncriteria> getcriteria(int userID)
        {
            List<ResponseEvalutioncriteria> areas = new List<ResponseEvalutioncriteria>();
            try
            {
                _connection.Cnn.Open();

                areas = _connection.Cnn.Query<ResponseEvalutioncriteria>("sp_get_evalutioncriteria", commandType: CommandType.StoredProcedure).AsList();
            }
            catch (Exception ex)
            {

                _connection.Cnn.Close();
                InsertErrorLogSession("Error  en conferenceDAL en  sp_get_evalutioncriteria", ex.Message, userID);
            }
            finally
            {
                _connection.Cnn.Close();
            }
            return areas;
        }


        //Registrar criterios en conferencias

        public int RegisterEvalutionCriteriaConference(int conferenceID,int criterionID, int userId)
        {
            int result = 0;
            try
            {
                _connection.Cnn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("@p_ConferenceID", conferenceID);
                parameters.Add("@p_CriterionID", criterionID);
               

                parameters.Add("@p_Result", dbType: DbType.Int32, direction: ParameterDirection.Output);


                _connection.Cnn.Execute("sp_InsertEvaluationCriteriaConference", parameters, commandType: CommandType.StoredProcedure);

                result = parameters.Get<int>("@p_Result");


            }
            catch (Exception ex)
            {
                //Console.WriteLine("Error: " + ex.Message);

                _connection.Cnn.Close();
                InsertErrorLogSession("Error en conferenceDAL en sp_InsertEvaluationCriteriaConference ", ex.Message, userId);
            }
            finally
            {
                _connection.Cnn.Close();
            }

            return result;
        }

        //Agenda de la conferencia

        public List<ConferencesAgenda> GetConferencesAgenda(int conferenceID, int userID)
        {
            List<ConferencesAgenda> conferences = new List<ConferencesAgenda>();
            try
            {
                var parameters = new DynamicParameters();
                _connection.Cnn.Open();
                parameters.Add("@p_ConferenceID", conferenceID);
                conferences = _connection.Cnn.Query<ConferencesAgenda>("sp_GetConferenceAgenda", parameters, commandType: CommandType.StoredProcedure).AsList();
            }
            catch (Exception ex)
            {


                _connection.Cnn.Close();
                InsertErrorLogSession("Error en conferenceDAL en  sp_GetConferenceAgenda`", ex.Message, userID);
            }
            finally
            {
                _connection.Cnn.Close();
            }
            return conferences;
        }
        //Lista de evaluation criteria por conferences

        public List<EvaluationCriteriaConference> GetEvaluationCriteriaByConference(int conferenceID, int userID)
        {
            List<EvaluationCriteriaConference> conferences = new List<EvaluationCriteriaConference>();
            try
            {
                var parameters = new DynamicParameters();
                _connection.Cnn.Open();
                parameters.Add("@p_ConferenceID", conferenceID);
                conferences = _connection.Cnn.Query<EvaluationCriteriaConference>("sp_GetEvaluationCriteriaByConference", parameters, commandType: CommandType.StoredProcedure).AsList();
            }
            catch (Exception ex)
            {


                _connection.Cnn.Close();
                InsertErrorLogSession("Error en conferenceDAL en  sp_GetConferenceAgenda`", ex.Message, userID);
            }
            finally
            {
                _connection.Cnn.Close();
            }
            return conferences;
        }
        //Actualizar el estado de la conferencia
        public int update_conference_status_to_inactive(int conferenceID, int userId)
        {
            int result = 0;
            try
            {
                _connection.Cnn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("@p_conferenceID", conferenceID);


                parameters.Add("@p_result", dbType: DbType.Int32, direction: ParameterDirection.Output);


                _connection.Cnn.Execute("sp_update_conference_status_to_inactive", parameters, commandType: CommandType.StoredProcedure);

                result = parameters.Get<int>("p_result");


            }
            catch (Exception ex)
            {
                //Console.WriteLine("Error: " + ex.Message);

                _connection.Cnn.Close();
                InsertErrorLogSession("Error  en conferenceDAL sp_update_conference_status_to_inactive ", ex.Message, userId);
            }
            finally
            {
                _connection.Cnn.Close();
            }

            return result;
        }


        //registrar usurio en conferencia
        public int RegisterUserAssignedConference(int conferenceID, int userId)
        {
            int result = 0;
            try
            {
                _connection.Cnn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("@p_UserID", userId);
                parameters.Add("@p_conferenceID", conferenceID);

                parameters.Add("@result", dbType: DbType.Int32, direction: ParameterDirection.Output);


                _connection.Cnn.Execute("RegisterUserAssignedConference", parameters, commandType: CommandType.StoredProcedure);

                result = parameters.Get<int>("result");


            }
            catch (Exception ex)
            { 
                Console.WriteLine(ex);

                _connection.Cnn.Close();
                InsertErrorLogSession("Error  en conferenceDAL RegisterUserAssignedConference ", ex.Message, userId);
            }
            finally
            {
                _connection.Cnn.Close();
            }

            return result;
        }


        public DateNotificationEN Emailnotification(int conferenceID, int userId)
        {
            DateNotificationEN email = new DateNotificationEN();
            
            try
            {
                _connection.Cnn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("@p_UserID", userId);
                parameters.Add("@p_conferenceID", conferenceID);



                email= _connection.Cnn.QuerySingleOrDefault<DateNotificationEN>( "sp_get_emails_by_conference", parameters, commandType: CommandType.StoredProcedure);






            }
            catch (Exception ex)
            {
                //Console.WriteLine("Error: " + ex.Message);

                _connection.Cnn.Close();
                InsertErrorLogSession("Error  en conferenceDAL RegisterUserAssignedConference ", ex.Message, userId);
            }
            finally
            {
                _connection.Cnn.Close();
            }

            return email;
        }


        public DateNotificationEN EmailnotificationTopics(int userID, int TopicsID)
        {
            DateNotificationEN email = new DateNotificationEN();

            try
            {
                _connection.Cnn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("@p_userID", userID);
                parameters.Add("@p_TopicsID", TopicsID);



                email = _connection.Cnn.QuerySingleOrDefault<DateNotificationEN>("sp_get_emails_by_conference", parameters, commandType: CommandType.StoredProcedure);






            }
            catch (Exception ex)
            {
                //Console.WriteLine("Error: " + ex.Message);

                _connection.Cnn.Close();
                InsertErrorLogSession("Error  en conferenceDAL RegisterUserAssignedConference ", ex.Message, userID);
            }
            finally
            {
                _connection.Cnn.Close();
            }

            return email;
        }
    }

}
