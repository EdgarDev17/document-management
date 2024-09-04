using Conference.BL.Utils;
using Conference.DAL;
using Conference.Entities;
using MySqlX.XDevAPI.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static SkiaSharp.HarfBuzz.SKShaper;

namespace Conference.BL
{
    public class ConferenceBL
    {
        private readonly conferenceDAL _conferenceDAL;
        private readonly EmailSend _emailSend;
        public ConferenceBL()
        {
            // Constructor sin parámetros
        }
        public ConferenceBL(conferenceDAL conferenceDAL, EmailSend emailSend)
        {

            _conferenceDAL = conferenceDAL;
            _emailSend = emailSend;
        }
        public List<areaEN> Getarea(int userID)
        {
            List<areaEN> areas = new List<areaEN>();
            areas = _conferenceDAL.Getarea(userID);
            return areas;
        }


        public (int result, int conferenceID) RegisterConference(int userID, int RollID, int institucionID,string nameConference,
            string typeConference, string description, DateTime beggingDate, DateTime finishDate, int areaID, int docuementAttempt, string location, string urlconference)
        {



            var (result, conferenceID) = _conferenceDAL.RegisterConference(userID, RollID, institucionID, nameConference, typeConference, description, beggingDate, finishDate, areaID, docuementAttempt,  location,  urlconference);
            return (result, conferenceID);

        }

        public int RegisterConferenceTopics(string name, string description, string location, DateTime startHour, DateTime startEnd, int conferenceId, int userId,int TotalAttendees, int TotalSpeakers,string nameSpeaker)
        {

            int result = 0;

            result = _conferenceDAL.RegisterConferenceTopics(name, description, location, startHour, startEnd, conferenceId, userId,TotalAttendees,TotalSpeakers, nameSpeaker);
            return result;

        }

        public int UpdateConferenceTopics(string name, string description, string location, DateTime startHour, DateTime startEnd, int conferenceId, int userId, int topicsID, int TotalAttendees,int TotalSpeakers,string nameSpeaker)
        {

            int result = 0;

            result = _conferenceDAL.UpdateConferenceTopics(name, description, location, startHour, startEnd, conferenceId, userId, topicsID,TotalAttendees,TotalSpeakers, nameSpeaker);
            return result;

        }

        public int DeleteConferenceTopics(int topicsID, int userId)
        {

            int result = 0;

            result = _conferenceDAL.DeleteConferenceTopics(topicsID, userId);
            return result;

        }

        public List<TopicsEN> GetTopics(int userID, int conferenceID)
        {
            List<TopicsEN> Topics = new List<TopicsEN>();
            Topics = _conferenceDAL.GetTopics(userID, conferenceID);
            return Topics;
        }
        public virtual List<ConferencesDetailsEN> get_conferences_general(int userID)
        {
            List<ConferencesDetailsEN> conference = new List<ConferencesDetailsEN>();
            conference = _conferenceDAL.get_conferences_general(userID);
            return conference;
        }
        public List<ConferencesDetailsEN> get_conferences_specific(int conferenceID, int userID)
        {
            List<ConferencesDetailsEN> conference = new List<ConferencesDetailsEN>();
            conference = _conferenceDAL.get_conferences_specific(conferenceID, userID);
            return conference;
        }

        public List<ConferencesDetailsEN> get_conferences_specific_by_user(int userID)
        {
            List<ConferencesDetailsEN> conference = new List<ConferencesDetailsEN>();
            conference = _conferenceDAL.get_conferences_specific_by_user(userID);
            return conference;
        }

        public List<ListTopicsEN> get_ListTopicsByConferenceID(int conferenceID, int userID)
        {
            List<ListTopicsEN> conference = new List<ListTopicsEN>();
            conference = _conferenceDAL.get_ListTopicsByConferenceID(conferenceID, userID);
            return conference;
        }


        public List<ListTopicsENU> get_ListTopicsByUserID( int userID)
        {
            List<ListTopicsENU> conference = new List<ListTopicsENU>();
            conference = _conferenceDAL.get_ListTopicsByUserID( userID);
            return conference;
        }
        public List<ListTopicsEN> get_ListTopicsByTopicsID(int TopicsID, int userID)
        {
            List<ListTopicsEN> conference = new List<ListTopicsEN>();
            conference = _conferenceDAL.get_ListTopicsByTopicsID(TopicsID, userID);
            return conference;
        }

        public int MoveConferenceTopics(int conferenceID, int userId)
        {

            int result = 0;

            result = _conferenceDAL.MoveConferenceTopics(conferenceID, userId);
            return result;

        }


        public (int result, string message) RegisterAssignUserTopic(int userID, int TopicsID, int RollID)
        {

            var (result, message) = _conferenceDAL.RegisterAssignUserTopic(userID, TopicsID, RollID);

            if (result == 1)
            {
                DateNotificationEN email = new DateNotificationEN();
                email = _conferenceDAL.Emailnotification(TopicsID, userID);


                // Validación para enviar correo a NameUser
                if (!string.IsNullOrEmpty(email.NameUser))
                {
                    var titleUser = $@"Confirmación de Registro en el Tema :{email.NameTopics}  del Congreso: {email.ConferenceName}";
                    var mensajeBodyUser = $@"Estimado/a {email.NameUser}, Nos complace informarte que te has registrado exitosamente en el Tema {email.NameTopics}. ";
                    _emailSend.Send(email.EmailUser, titleUser, mensajeBodyUser, []);
                }

                // Validación para enviar correo a NameAdmin
                if (!string.IsNullOrEmpty(email.NameAdmin))
                {
                    var titleAdmin = $@"Notificación de Registro de Usuario en un Tema en el Congreso: {email.ConferenceName}";
                    var mensajeBodyAdmin = $@"Estimado/a {email.NameAdmin}, Queremos informarte que el usuario {email.NameUser} se ha registrado exitosamente en el Tema: {email.NameTopics} de la conferencia: {email.ConferenceName}.";
                    _emailSend.Send(email.EmailAdmin, titleAdmin, mensajeBodyAdmin, []);
                }
            }

            return (result, message);

        }

        public List<ConferencesDatailsUser> GetConferenceUsersDetails(int conferenceID, int userID)
        {
            List<ConferencesDatailsUser> conferenceUser = new List<ConferencesDatailsUser>();
            conferenceUser = _conferenceDAL.GetConferenceUsersDetails(conferenceID, userID);
            return conferenceUser;
        }

        public (int result, string message) UpdateUserConferenceRole(int userID, int TopicsID, int RollID)
        {

            var (result, message) = _conferenceDAL.UpdateUserConferenceRole(userID, TopicsID, RollID);

            if (result == 1)
            {
                DateNotificationEN email = new DateNotificationEN();
                email = _conferenceDAL.Emailnotification(TopicsID, userID);


                // Validación para enviar correo a NameUser
                if (!string.IsNullOrEmpty(email.EmailUser))
                {
                    var titleUser = $@"Confirmación de Asignación de jurado en el tema:{email.NameTopics} del Congreso: {email.ConferenceName}";
                    var mensajeBodyUser = $@"Estimado/a {email.NameUser},Nos complace informarte que has sido asignado/a como jurado para el tema: {email.NameTopics} en el Congreso: {email.ConferenceName}.{email.NameAdmin}, uno de los administradores del congreso, ha realizado esta asignación.Agradecemos tu participación y esperamos contar con tu valiosa contribución.
";
                    _emailSend.Send(email.EmailUser, titleUser, mensajeBodyUser, []);
                }

                // Validación para enviar correo a NameAdmin
                if (!string.IsNullOrEmpty(email.EmailAdmin))
                {
                    var titleAdmin = $@"Confirmación de Asignación de jurado en el tema:{email.NameTopics} del Congreso: {email.ConferenceName}";
                    var mensajeBodyAdmin = $@"Estimado/a {email.NameAdmin},Te informamos que has asignado al usuario {email.NameUser} como jurado en el tema: {email.NameTopics} del Congreso: {email.ConferenceName}.Gracias por asegurar la correcta selección del jurado para este tema.";
                    _emailSend.Send(email.EmailAdmin, titleAdmin, mensajeBodyAdmin, []);
                }
            }
            return (result, message);





        }

        public ResponseEvaluationD getDetallesEavliation(int userID)
        {
            ResponseEvaluationD response = new ResponseEvaluationD();

          List< ResponseEvalutionscale> responseScale = new List<ResponseEvalutionscale> ();

            responseScale = _conferenceDAL.getScale(userID);

            response._Evalutionscale = responseScale;

            List <ResponseEvalutioncriteria> responseCriteria = new List<ResponseEvalutioncriteria>();
            responseCriteria = _conferenceDAL.getcriteria(userID);

            response._Evalutioncriteria = responseCriteria;

            return response;
        }
        public int RegisterEvalutionCriteriaConference(List<ConferenceEvaluationCriteria> data, int UserID)
        {



            foreach (var topic in data)
            {
                // Lógica para registrar una conferencia individual
                var result = _conferenceDAL.RegisterEvalutionCriteriaConference(
                    topic.ConferenceID,topic.criterionID,UserID
                );

                // Manejo de errores si es necesario
                if (result != 1)
                {
                    return result; // Retornar el código de error si ocurre algún problema
                }
            }

            return 0; // Retornar 0 si todas las conferencias fueron registradas con éxito
        }

        public List<ConferencesAgenda> GetConferencesAgenda(int conferenceID, int userID)
        {
            List<ConferencesAgenda> conference = new List<ConferencesAgenda>();
            conference = _conferenceDAL.GetConferencesAgenda(conferenceID, userID);
            return conference;
        }


        public List<EvaluationCriteriaConference> GetEvaluationCriteriaByConference(int conferenceID, int userID)
        {
            List<EvaluationCriteriaConference> conference = new List<EvaluationCriteriaConference>();
            conference = _conferenceDAL.GetEvaluationCriteriaByConference(conferenceID, userID);
            return conference;
        }

        public int update_conference_status_to_inactive(int conferenceID, int userId)
        {

            int result = 0;

            result = _conferenceDAL.update_conference_status_to_inactive(conferenceID, userId);
            return result;

        }

        public int RegisterUserAssignedConference(int conferenceID, int userId)
        {

            int result = 0;

            result = _conferenceDAL.RegisterUserAssignedConference(conferenceID, userId);

            if (result==1)
            {
                DateNotificationEN email = new DateNotificationEN();
                email = _conferenceDAL.Emailnotification(conferenceID, userId);


                // Validación para enviar correo a NameUser
                if (!string.IsNullOrEmpty(email.NameUser))
                {
                    var titleUser = $@"Confirmación de Registro en el Congreso: {email.ConferenceName}";
                    var mensajeBodyUser = $@"Estimado/a {email.NameUser}, Nos complace informarte que te has registrado exitosamente en el congreso {email.ConferenceName}. ";
                    _emailSend.Send(email.EmailUser, titleUser, mensajeBodyUser, []);
                }

                // Validación para enviar correo a NameAdmin
                if (!string.IsNullOrEmpty(email.NameAdmin))
                {
                    var titleAdmin = $@"Notificación de Registro de Usuario en el Congreso: {email.ConferenceName}";
                    var mensajeBodyAdmin = $@"Estimado/a {email.NameAdmin}, Queremos informarte que el usuario {email.NameUser} se ha registrado exitosamente en el congreso {email.ConferenceName}.";
                    _emailSend.Send(email.EmailAdmin, titleAdmin, mensajeBodyAdmin, []);
                }
            }
            return result;

        }

        public List<ConferencesDetailsEN> getConferencesByAdminID(int userID)
        {
            List<ConferencesDetailsEN> conference = new List<ConferencesDetailsEN>();
            conference = _conferenceDAL.getConferencesByAdminID(userID);
            return conference;
        }
    }
}
