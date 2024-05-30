using Conference.DAL;
using Conference.Entities;
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


        public int RegisterConference(int userID, int RollID, string nameInstitution, string webSiteInstitution, string contactPhoneInstitution, string nameConference,
            string typeConference, string description, DateTime beggingDate, DateTime finishDate, int areaID, int docuementAttempt)
        {

            int result = 0;

            result = _conferenceDAL.RegisterConference(userID, RollID, nameInstitution, webSiteInstitution, contactPhoneInstitution, nameConference, typeConference, description, beggingDate, finishDate, areaID, docuementAttempt);
            return result;

        }
    }
}
