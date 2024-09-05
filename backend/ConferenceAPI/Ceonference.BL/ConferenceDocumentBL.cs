using Conference.BL.Utils;
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
        private readonly EmailSend _emailSend;

        public ConferenceDocumentBL(ConferenceDocumentDAL conferenceDocumentDAL, EmailSend emailSend) {
            _conferenceDocumentDAL = conferenceDocumentDAL;
            _emailSend = emailSend;
        }

        public (int result, string message) RegisterDocumentConference(int userID, int TopicsID, string NameDocument, byte[] Document, string DocumentExtension )
        {



            var (result, message) = _conferenceDocumentDAL.RegisterDocumentConference(userID, TopicsID,NameDocument,Document,DocumentExtension);
            

            if (result == 1)
            {
                DateNotificationEN email = _conferenceDocumentDAL.Emailnotification(TopicsID, userID);

                // Función auxiliar para enviar correos electrónicos
                void EnviarCorreo(string destinatario, string nombre, string asunto, string mensaje)
                {
                    if (!string.IsNullOrEmpty(destinatario))
                    {
                        _emailSend.Send(destinatario, asunto, mensaje, []);
                    }
                }

                // Enviar correo a NameUser
                var titleUser = $@"Confirmación de Envío de Documento en el tema: {email.NameTopics} del Congreso: {email.ConferenceName}";
                var mensajeBodyUser = $@"Estimado/a {email.NameUser},Nos complace informarte que el envío de tu documento ha sido registrado exitosamente para el tema: {email.NameTopics} en el Congreso: {email.ConferenceName}.Gracias por tu participación.";
                EnviarCorreo(email.EmailUser, email.NameUser, titleUser, mensajeBodyUser);

                // Enviar correo a NameAdmin
                var titleAdmin = $@"Notificación de Envío de Documento en el tema: {email.NameTopics} del Congreso: {email.ConferenceName}";
                var mensajeBodyAdmin = $@"Estimado/a {email.NameAdmin},Te informamos que se ha realizado un envío de documento para el tema: {email.NameTopics} en el Congreso: {email.ConferenceName} por parte del usuario {email.NameUser}.";
                EnviarCorreo(email.EmailAdmin, email.NameAdmin, titleAdmin, mensajeBodyAdmin);

                // Enviar correos a jurados
                var mensajeBodyJury = $@"Estimado/a {0},Te informamos que se ha realizado un envío de documento para el tema: {email.NameTopics} en el Congreso: {email.ConferenceName}. Por favor, revisa el documento para asegurar que cumple con los requisitos necesarios.";

                if (!string.IsNullOrEmpty(email.EmailJury1))
                {
                    EnviarCorreo(email.EmailJury1, email.NameJury1, titleAdmin, string.Format(mensajeBodyJury, email.NameJury1));
                }

                if (!string.IsNullOrEmpty(email.EmailJury2))
                {
                    EnviarCorreo(email.EmailJury2, email.NameJury2, titleAdmin, string.Format(mensajeBodyJury, email.NameJury2));
                }

                if (!string.IsNullOrEmpty(email.EmailJury3))
                {
                    EnviarCorreo(email.EmailJury3, email.NameJury3, titleAdmin, string.Format(mensajeBodyJury, email.NameJury3));
                }
            }

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

            var (result, message,  calification) = _conferenceDocumentDAL.RegisterDocumentVeredict(documentID, veredictID, userId);

            DateNotificationEN email = new DateNotificationEN();
            email = _conferenceDocumentDAL.EmailnotificationDocument(documentID, userId);
            if (result == 1 && calification==0)
            {
                


                // Validación para enviar correo al usuario (User)
                if (!string.IsNullOrEmpty(email.EmailUser))
                {
                    var titleUser = $@"Notificación de Revisión de Documento en el tema: {email.NameTopics} del Congreso: {email.ConferenceName}";
                    var mensajeBodyUser = $@"Estimado/a {email.NameUser},Nos complace informarte que un jurado ha revisado tu documento relacionado con el tema: {email.NameTopics} en el Congreso: {email.ConferenceName}.Gracias por tu participación.Saludos cordiales,\nEl Equipo del Congreso";
                    _emailSend.Send(email.EmailUser, titleUser, mensajeBodyUser, []);
                }

                // Validación para enviar correo al administrador (Admin)
                if (!string.IsNullOrEmpty(email.EmailAdmin))
                {
                    var titleAdmin = $@"Notificación de Revisión de Documento en el tema: {email.NameTopics} del Congreso: {email.ConferenceName}";
                    var mensajeBodyAdmin = $@"Estimado/a {email.NameAdmin},Te informamos que el jurado:{email.NameJury1},  ha completado la revisión del documento relacionado con el tema: {email.NameTopics} en el Congreso: {email.ConferenceName}. La revisión se ha realizado correctamente";
                    _emailSend.Send(email.EmailAdmin, titleAdmin, mensajeBodyAdmin, []);
                }

                // Validación para enviar correo al jurado (Jury)
                if (!string.IsNullOrEmpty(email.EmailJury1))
                {
                    var titleJury = $@"Confirmación de Asignación de Revisión de Documento en el tema: {email.NameTopics} del Congreso: {email.ConferenceName}";
                    var mensajeBodyJury = $@"Estimado/a {email.NameJury1},Te informamos que has realizado exitosamente la revisión del documento relacionado con el tema: {email.NameTopics} en el Congreso: {email.ConferenceName}. Agradecemos tu valiosa colaboración en este proceso.Saludos cordiales,El Equipo del Congreso";
                    _emailSend.Send(email.EmailJury1, titleJury, mensajeBodyJury, []);
                }
            }
            if (result == 1 && calification == 1)
            {

                // Validación para enviar correo al usuario (User)
                if (!string.IsNullOrEmpty(email.EmailUser))
                {
                    var titleUser = $@"Notificación de Revisión de Documento en el tema: {email.NameTopics} del Congreso: {email.ConferenceName}";
                    var mensajeBodyUser = $@"Estimado/a {email.NameUser},Nos complace informarte que el proceso de revisión de tu documento relacionado con el tema: {email.NameTopics} en el Congreso: {email.ConferenceName} ha finalizado.Puedes conocer el resultado de la revisión ingresando a la web del congreso.Gracias por tu participación.Saludos cordiales,El Equipo del Congreso";
                    _emailSend.Send(email.EmailUser, titleUser, mensajeBodyUser, []);
                }

                // Validación para enviar correo al jurado (Jury)
                if (!string.IsNullOrEmpty(email.NameAdmin))
                {
                    var titleJury = $@"Notificación de Finalización de Revisión de Documento en el tema: {email.NameTopics} del Congreso: {email.ConferenceName}";
                    var mensajeBodyJury = $@"Estimado/a {email.NameAdmin},Te informamos que has completado la revisión del documento relacionado con el tema: {email.NameTopics} en el Congreso:{email.ConferenceName}.\Puedes conocer el resultado final del documento ingresando a la web del congreso.Gracias por tu valiosa contribución en este proceso.\n\nSaludos cordiales,El Equipo del Congreso";
                    _emailSend.Send(email.NameAdmin, titleJury, mensajeBodyJury, []);
                }


            }



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


        public List<DocumentUserEN> GetDocumentsByUser( int userID)
        {
            List<DocumentUserEN> conferenceUser = new List<DocumentUserEN>();
            conferenceUser = _conferenceDocumentDAL.GetDocumentsByUser(userID);
            return conferenceUser;
        }


        public List<DocumentUserEN> GetDocumentsByUserTopics(int userID,int TopicsID)
        {
            List<DocumentUserEN> conferenceUser = new List<DocumentUserEN>();
            conferenceUser = _conferenceDocumentDAL.GetDocumentsByUserTopics(userID, TopicsID);
            return conferenceUser;
        }

        public List<DocumentUserEN> GetDocumentsBydocumentID(int userID, int documentID)
        {
            List<DocumentUserEN> conferenceUser = new List<DocumentUserEN>();
            conferenceUser = _conferenceDocumentDAL.GetDocumentsBydocumentID(userID, documentID);
            return conferenceUser;
        }
    }
}
