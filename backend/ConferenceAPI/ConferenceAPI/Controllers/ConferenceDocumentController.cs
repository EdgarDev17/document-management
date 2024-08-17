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
    }
}
