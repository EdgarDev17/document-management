using Conference.BL;
using Conference.Entities;
using ConferenceAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ConferenceAPI.Controllers
{
    [Route("api/Conference")]
    [ApiController]
    public class ConferenceController : ControllerBase
    {

        private readonly UserBL _userBL;
        private readonly ConferenceBL _conferenceBL;
        public ConferenceController(ConferenceBL conferenceBL, UserBL userBL)
        {
            _conferenceBL = conferenceBL;
            _userBL = userBL;
        }
        AreasResponse responseD = new AreasResponse();
        TopicsResponse TopicsResponse = new TopicsResponse();

        [HttpGet]
        [Route("areas")]
        public ActionResult<IResponse> Getareas()
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

                List<areaEN> areas = _conferenceBL.Getarea(user.UserID);



                if (areas != null)
                {
                    return Ok(new { areas = areas });
                }
                else
                {
                    var response = new GenericApiRespons { HttpCode = 409, Message = "usuario no encontrado" };
                    return Conflict(response);
                }
            }
            return StatusCode(StatusCodes.Status500InternalServerError, new GenericApiRespons
            {
                HttpCode = 500,
                Message = "Something went wrong"
            });

        }

        [HttpPost("RegisterConference")]
        // (Summary = "Registers a new conference", Description = "Requires Authorization-Token in the header")
        public ActionResult<IResponse> RegisterConference([FromBody] ConferenceRequest data)
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

            if (data.documentAttempt > 3)
            {

                if (user != null)
                {
                    var (result, conferenceID) = _conferenceBL.RegisterConference(user.UserID, data.RollID, data.nameInstitution, data.webSiteInstitution, data.contactPhoneInstitution, data.nameConference, data.typeConference, data.description, data.beggingDate, data.finishDate, data.areaID, data.documentAttempt);
                    if (result == 1)
                    {
                        return Ok(new ConferenceResponse
                        {
                            ConferenceID = conferenceID,
                            Message = "Success"
                        });
                    }

                    else if (result == 0)
                    {
                        return Conflict(new ConferenceResponse
                        {
                            ConferenceID = 0,
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
            else
            {

                return StatusCode(StatusCodes.Status406NotAcceptable, new GenericApiRespons
                {
                    HttpCode = 406,
                    Message = "The number of participants must be greater than 3"
                });


            }


        }

        [HttpPost("RegisterConferenceTopics")]
        // (Summary = "Registers a new conference", Description = "Requires Authorization-Token in the header")
        public ActionResult<IResponse> RegisterConferenceTopics([FromBody] ConferenceTopics data)
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
                var result = _conferenceBL.RegisterConferenceTopics(data.name, data.description, data.location, data.startHour, data.StartEnd, data.conferenceID, user.UserID);
                if (result == 0)
                {
                    var response = new GenericApiRespons { HttpCode = 200, Message = "Success" };
                    return Ok(response);
                }

                else if (result == 1)
                {
                    var response = new GenericApiRespons { HttpCode = 409, Message = "usuario no encontrado" };
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
        [HttpPut("UpdateConferenceTopics")]
        // (Summary = "Updates an existing conference", Description = "Requires Authorization-Token in the header")
        public ActionResult<IResponse> UpdateConferenceTopics([FromBody] ConferenceTopics data)
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
                var result = _conferenceBL.UpdateConferenceTopics(data.name, data.description, data.location, data.startHour, data.StartEnd, data.conferenceID, user.UserID, data.topicsID);
                if (result == 1)
                {
                    var response = new GenericApiRespons { HttpCode = 200, Message = "Success" };
                    return Ok(response);
                }
                else if (result == 0)
                {
                    var response = new GenericApiRespons { HttpCode = 409, Message = "No se puedo actualizar" };
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

        [HttpDelete("DeleteConferenceTopics")]
        // (Summary = "Deletes an existing conference", Description = "Requires Authorization-Token in the header")
        public ActionResult<IResponse> DeleteConferenceTopics([FromBody] ConferenceTopics data)
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
                var result = _conferenceBL.DeleteConferenceTopics(data.topicsID, user.UserID);
                if (result == 0)
                {
                    var response = new GenericApiRespons { HttpCode = 200, Message = "Success" };
                    return Ok(response);
                }
                else if (result == 1)
                {
                    var response = new GenericApiRespons { HttpCode = 404, Message = "Conference not found" };
                    return NotFound(response);
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
        [Route("TopicsList")]
        public ActionResult<IResponse> GetTopics(int conferenceID)
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

                List<TopicsEN> topics = _conferenceBL.GetTopics(user.UserID, conferenceID);



                if (topics != null)
                {
                    return Ok(new { Temas = topics });
                }
                else
                {
                    var response = new GenericApiRespons { HttpCode = 409, Message = "usuario no encontrado" };
                    return Conflict(response);
                }
            }
            return StatusCode(StatusCodes.Status500InternalServerError, new GenericApiRespons
            {
                HttpCode = 500,
                Message = "Something went wrong"
            });

        }
        [HttpPost("MoveConferenceTopics")]
        // (Summary = "Registers a new conference", Description = "Requires Authorization-Token in the header")
        public ActionResult<IResponse> MoveConferenceTopics( int conferenceID)
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
                var result = _conferenceBL.MoveConferenceTopics( conferenceID, user.UserID);
                if (result == 1)
                {
                    var response = new GenericApiRespons { HttpCode = 200, Message = "Success" };
                    return Ok(response);
                }

                else if (result == 0)
                {
                    var response = new GenericApiRespons { HttpCode = 409, Message = "fallo " };
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


    }
}
