using Conference.DAL;
using Conference.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conference.BL
{
    public class ConferenceDocumentBL
    {
        private readonly ConferenceDocumentDAL _conferenceDocumentDAL;

        public ConferenceDocumentBL(ConferenceDocumentDAL conferenceDocumentDAL) {
            _conferenceDocumentDAL = conferenceDocumentDAL;
        }

        public (int result, string message) RegisterDocumentConference(int userID, int TopicsID, string NameDocument, byte[] Document, string DocumentExtension )
        {



            var (result, message) = _conferenceDocumentDAL.RegisterDocumentConference(userID, TopicsID,NameDocument,Document,DocumentExtension);
            return (result, message);

        }

        public List<DocumentEN> GetDocumentsByConference(int TopicsID, int userID)
        {
            List<DocumentEN> conferenceUser = new List<DocumentEN>();
            conferenceUser = _conferenceDocumentDAL.GetDocumentsByConference(TopicsID, userID);
            return conferenceUser;
        }

        public List<DocumentRolIdEN> GetDocumentsByRolID(int userId, int TopicsID, int RolId)
        {
            List<DocumentRolIdEN> conferenceUser = new List<DocumentRolIdEN>();
            conferenceUser = _conferenceDocumentDAL.GetDocumentsByRolID(userId,TopicsID,RolId);
            return conferenceUser;
        }
    }
}
