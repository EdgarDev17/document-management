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


        public (int result, int conferenceID) RegisterConference(int userID, int RollID, string nameInstitution, string webSiteInstitution, string contactPhoneInstitution, string nameConference,
            string typeConference, string description, DateTime beggingDate, DateTime finishDate, int areaID, int docuementAttempt)
        {

            

            var (result, conferenceID) = _conferenceDAL.RegisterConference(userID, RollID, nameInstitution, webSiteInstitution, contactPhoneInstitution, nameConference, typeConference, description, beggingDate, finishDate, areaID, docuementAttempt);
            return (result, conferenceID);

        }

        public int RegisterConferenceTopics(string name, string description, string location, DateTime startHour, DateTime startEnd, int conferenceId, int userId)
        {

            int result = 0;

            result = _conferenceDAL.RegisterConferenceTopics( name,  description,  location,  startHour,  startEnd,  conferenceId,  userId);
            return result;

        }

        public int UpdateConferenceTopics(string name, string description, string location, DateTime startHour, DateTime startEnd, int conferenceId, int userId,int topicsID)
        {

            int result = 0;

            result = _conferenceDAL.UpdateConferenceTopics(name, description, location, startHour, startEnd, conferenceId, userId, topicsID);
            return result;

        }

        public int DeleteConferenceTopics(int topicsID, int userId)
        {

            int result = 0;

            result = _conferenceDAL.DeleteConferenceTopics(topicsID, userId);
            return result;

        }

        public List<TopicsEN> GetTopics(int userID,int conferenceID)
        {
            List<TopicsEN> Topics = new List<TopicsEN>();
            Topics = _conferenceDAL.GetTopics(userID, conferenceID);
            return Topics;
        }


        public int MoveConferenceTopics(int conferenceID, int userId)
        {

            int result = 0;

            result = _conferenceDAL.MoveConferenceTopics(conferenceID, userId);
            return result;

        }
    }
}
