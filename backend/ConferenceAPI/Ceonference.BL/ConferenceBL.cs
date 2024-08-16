using Conference.DAL;
using Conference.Entities;
using MySqlX.XDevAPI.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conference.BL
{
    public class ConferenceBL
    {
        private readonly conferenceDAL _conferenceDAL;
        public ConferenceBL(conferenceDAL conferenceDAL)
        {

            _conferenceDAL = conferenceDAL;
        }
        public List<areaEN> Getarea(int userID)
        {
            List<areaEN> areas = new List<areaEN>();
            areas = _conferenceDAL.Getarea(userID);
            return areas;
        }


        public (int result, int conferenceID) RegisterConference(int userID, int RollID, int institucionID,string nameConference,
            string typeConference, string description, DateTime beggingDate, DateTime finishDate, int areaID, int docuementAttempt)
        {



            var (result, conferenceID) = _conferenceDAL.RegisterConference(userID, RollID, institucionID, nameConference, typeConference, description, beggingDate, finishDate, areaID, docuementAttempt);
            return (result, conferenceID);

        }

        public int RegisterConferenceTopics(string name, string description, string location, DateTime startHour, DateTime startEnd, int conferenceId, int userId,int TotalAttendees, int TotalSpeakers)
        {

            int result = 0;

            result = _conferenceDAL.RegisterConferenceTopics(name, description, location, startHour, startEnd, conferenceId, userId,TotalAttendees,TotalSpeakers);
            return result;

        }

        public int UpdateConferenceTopics(string name, string description, string location, DateTime startHour, DateTime startEnd, int conferenceId, int userId, int topicsID, int TotalAttendees,int TotalSpeakers)
        {

            int result = 0;

            result = _conferenceDAL.UpdateConferenceTopics(name, description, location, startHour, startEnd, conferenceId, userId, topicsID,TotalAttendees,TotalSpeakers);
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
        public List<ConferencesDetailsEN> get_conferences_general(int userID)
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

    }
}
