using Conference.BL;
using Conference.Entities;
using ConferenceAPI.Interactors;
using ConferenceAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata;

namespace ConferenceAPI.Controllers
{
    [Route("api/Document")]
    [ApiController]
    public class ConferenceDocumentController : ControllerBase
    {
        private readonly ConferenceDocumentBL _conferenceDocumentBL;
        private readonly UserBL _userBL;

        public ConferenceDocumentController(ConferenceDocumentBL conferenceDocumentBL,UserBL userBL) {
            _conferenceDocumentBL = conferenceDocumentBL;
            _userBL = userBL;
        }

        [HttpPost("SendingDocumentsConference")]
        // (Summary = "Registers a new conference", Description = "Requires Authorization-Token in the header")
        public ActionResult<IResponse> SendingDocumentsConference([FromBody] ConferenceDocumentRequest data)
        {
            if (!Request.Headers.TryGetValue("Authorization-Token", out var token))
            {
                return BadRequest(new GenericApiRespons
                {
                    HttpCode = 400,
                    Message = "Authorization-Token must be provided"
                });
            }

            UserEN user = _userBL.VerifyPersonAuthentication(token);

           

                if (user != null)
                {
                    var (result, message) = _conferenceDocumentBL.RegisterDocumentConference(user.UserID,data.TopicsID,data.NameDocument,data.Document,data.DocumentExtension);
                    if (result == 1)
                    {
                        return Ok(new ConferenceResponse
                        {
                           
                            Message = message
                        });
                    }

                    else if (result == 0)
                    {
                        return Conflict(new ConferenceResponse
                        {
                           
                            Message = message
                        });
                    }
                    else
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError, new GenericApiRespons
                        {
                            HttpCode = 500,
                            Message = "Something went wrong"
                        });
                    }
                }
                else
                {

                    return StatusCode(StatusCodes.Status500InternalServerError, new GenericApiRespons
                    {
                        HttpCode = 500,
                        Message = "Something went wrong"
                    });
                }

           


        }


        [HttpGet]
        [Route("GetDocumentsByConference")]
        public ActionResult<IResponse> GetDocumentsByConference(int TopicsID)
        {

            if (!Request.Headers.TryGetValue("Authorization-Token", out var token))
            {
                return BadRequest(new GenericApiRespons
                {
                    HttpCode = 400,
                    Message = "Authorization-Token must be provided"
                });
            }

            var user = _userBL.VerifyPersonAuthentication(token);
            if (user != null)
            {

                List<DocumentEN> User = _conferenceDocumentBL.GetDocumentsByConference(TopicsID, user.UserID);



                if (User != null)
                {
                    return Ok(new { Document = User });
                }
                else
                {
                    var response = new GenericApiRespons { HttpCode = 409, Message = "No existen documentos" };
                    return Conflict(response);
                }
            }
            return StatusCode(StatusCodes.Status500InternalServerError, new GenericApiRespons
            {
                HttpCode = 500,
                Message = "Something went wrong"
            });

        }


        [HttpGet]
        [Route("GetDocumentsByRolID")]
        public ActionResult<IResponse> GetDocumentsByRolID( int TopicsID, int RolId)
        {

            if (!Request.Headers.TryGetValue("Authorization-Token", out var token))
            {
                return BadRequest(new GenericApiRespons
                {
                    HttpCode = 400,
                    Message = "Authorization-Token must be provided"
                });
            }

            var user = _userBL.VerifyPersonAuthentication(token);
            if (user != null)
            {

                List<DocumentRolIdEN> User = _conferenceDocumentBL.GetDocumentsByRolID( user.UserID,TopicsID,RolId);



                if (User != null)
                {
                    
                    return Ok(new { Document = User });
                }
                else
                {
                    var response = new GenericApiRespons { HttpCode = 409, Message = "No existen documentos" };
                    return Conflict(response);
                }
            }
            return StatusCode(StatusCodes.Status500InternalServerError, new GenericApiRespons
            {
                HttpCode = 500,
                Message = "Something went wrong"
            });

        }
        [HttpPost("RegisterDocumentEvaluationCriteria")]
        public ActionResult<IResponse> RegisterDocumentEvaluationCriteria([FromBody] List<RegisterEvaluationCriteriaDocument> data)
        {
            if (!Request.Headers.TryGetValue("Authorization-Token", out var token))
            {
                return BadRequest(new GenericApiRespons
                {
                    HttpCode = 400,
                    Message = "Authorization-Token must be provided"
                });
            }

            UserEN user = _userBL.VerifyPersonAuthentication(token);

            if (user != null)
            {
                var result = _conferenceDocumentBL.RegisterDocumentEvaluationCriteria(data, user.UserID);

                if (result == 1)
                {
                    return Ok(new GenericApiRespons { HttpCode = 200, Message = "Success" });
                }
                else if (result == 0)
                {
                    return Conflict(new GenericApiRespons { HttpCode = 409, Message = "usuario no encontrado" });
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new GenericApiRespons
                    {
                        HttpCode = 500,
                        Message = "Something went wrong"
                    });
                }
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new GenericApiRespons
                {
                    HttpCode = 500,
                    Message = "Something went wrong"
                });
            }
        }

        [HttpPost("RegisterDocumentVeredict")]
        // (Summary = "Registers a new conference", Description = "Requires Authorization-Token in the header")
        public ActionResult<IResponse> RegisterDocumentVeredict([FromBody] DocumentVeredictRequest data)
        {
            if (!Request.Headers.TryGetValue("Authorization-Token", out var token))
            {
                return BadRequest(new GenericApiRespons
                {
                    HttpCode = 400,
                    Message = "Authorization-Token must be provided"
                });
            }

            UserEN user = _userBL.VerifyPersonAuthentication(token);



            if (user != null)
            {
                var (result, message) = _conferenceDocumentBL.RegisterDocumentVeredict(data.documentID, data.veredictID, user.UserID);
                if (result == 1)
                {
                    var response = new GenericApiRespons { HttpCode = 200, Message = message };
                    return Ok(response);
                }

                else if (result == 0)
                {
                    var response = new GenericApiRespons { HttpCode = 409, Message = message };
                    return Conflict(response);
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new GenericApiRespons
                    {
                        HttpCode = 500,
                        Message = "Something went wrong"
                    });
                }
            }
            else
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new GenericApiRespons
                {
                    HttpCode = 500,
                    Message = "Something went wrong"
                });
            }
        }
        [HttpGet]
        [Route("GetDocumentEvaluationDetails")]
        public ActionResult<IResponse> GetDocumentEvaluationDetails(int documentID)
        {

            if (!Request.Headers.TryGetValue("Authorization-Token", out var token))
            {
                return BadRequest(new GenericApiRespons
                {
                    HttpCode = 400,
                    Message = "Authorization-Token must be provided"
                });
            }

            var user = _userBL.VerifyPersonAuthentication(token);
            if (user != null)
            {
                DocumentEvaluationDetails documentDetails = new DocumentEvaluationDetails();
                documentDetails = _conferenceDocumentBL.GetDocumentEvaluationDetails(documentID, user.UserID);



                if (documentDetails != null)
                {
                    return Ok(new { DocumentoEvaluation = documentDetails });
                }
                else
                {
                    var response = new GenericApiRespons { HttpCode = 409, Message = "No existen datos" };
                    return Conflict(response);
                }
            }
            return StatusCode(StatusCodes.Status500InternalServerError, new GenericApiRespons
            {
                HttpCode = 500,
                Message = "Something went wrong"
            });

        }

        [HttpGet]
        [Route("GetValidateDocumentVerdict")]
        public ActionResult<IResponse> GetValidateDocumentVerdict(int documentID)
        {

            if (!Request.Headers.TryGetValue("Authorization-Token", out var token))
            {
                return BadRequest(new GenericApiRespons
                {
                    HttpCode = 400,
                    Message = "Authorization-Token must be provided"
                });
            }

            var user = _userBL.VerifyPersonAuthentication(token);
            if (user != null)
            {
               
                string message = _conferenceDocumentBL.GetValidateDocumentVerdict(documentID, user.UserID);



                if (!string.IsNullOrEmpty(message))
                {
                    var response = new GenericApiRespons { HttpCode = 200, Message = message };
                    return Ok(response);
                }
                else
                {
                    var response = new GenericApiRespons { HttpCode = 409, Message = "No existen datos" };
                    return Conflict(response);
                }
            }
            return StatusCode(StatusCodes.Status500InternalServerError, new GenericApiRespons
            {
                HttpCode = 500,
                Message = "Something went wrong"
            });

        }

    }
}
