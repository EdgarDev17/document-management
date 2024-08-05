﻿using Conference.BL;
using Conference.Entities;
using ConferenceAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
                           
                            Message = "usuario no encontrado"
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
    }
}
