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


        public int RegisterDocumentEvaluationCriteria(List<RegisterEvaluationCriteriaDocument> data, int UserID)
        {

            foreach (var Criteria in data)
            {
                // Lógica para registrar una conferencia individual
                var result = _conferenceDocumentDAL.RegisterDocumentEvaluationCriteria(
                    Criteria.EvaCritConfID,
                    Criteria.ScaleID,
                    UserID,
                    Criteria.DocumentID
                );

                // Manejo de errores si es necesario
                if (result != 1)
                {
                    return result; // Retornar el código de error si ocurre algún problema
                }
            }

            return 1; // Retornar 0 si todas las conferencias fueron registradas con éxito
        }


        public (int result, string message) RegisterDocumentVeredict(int documentID, int veredictID, int userId)
        {

            var (result, message) = _conferenceDocumentDAL.RegisterDocumentVeredict(documentID, veredictID, userId);
            return (result, message);

        }

        public DocumentEvaluationDetails GetDocumentEvaluationDetails(int documentID, int userID)
        {
            DocumentEvaluationDetails documentDetails = new DocumentEvaluationDetails();
            documentDetails = _conferenceDocumentDAL.GetDocumentEvaluationDetails(documentID, userID);
            return documentDetails;
        }

        public string GetValidateDocumentVerdict(int documentID, int userID)
        {

            var message=_conferenceDocumentDAL.GetValidateDocumentVerdict(documentID,  userID);
            return  message;

        }
    }
}
