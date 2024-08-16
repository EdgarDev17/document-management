using Conference.BL;
using Conference.Entities;
using ConferenceAPI.Interactors;
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
        ConferenceDetailsResponse ConferenceDetailsResponse=new ConferenceDetailsResponse();
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
                    var (result, conferenceID) = _conferenceBL.RegisterConference(user.UserID, data.RollID, data.institucionID, data.nameConference, data.typeConference, data.description, data.beggingDate, data.finishDate, data.areaID, data.documentAttempt);
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

            if (data.TotalSpeakers>3) { 

            if (user != null)
            {
                var result = _conferenceBL.RegisterConferenceTopics(data.name, data.description, data.location, data.startHour, data.StartEnd, data.conferenceID, user.UserID,data.TotalAttendees,data.TotalSpeakers);
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
            else
            {
                return StatusCode(StatusCodes.Status406NotAcceptable, new GenericApiRespons
                {
                    HttpCode = 406,
                    Message = "The number of participants Speakers must be greater than 3"
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
                var result = _conferenceBL.UpdateConferenceTopics(data.name, data.description, data.location, data.startHour, data.StartEnd, data.conferenceID, user.UserID, data.topicsID,data.TotalAttendees,data.TotalSpeakers);
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

        [HttpPost("DeleteConferenceTopics")]
        // (Summary = "Deletes an existing conference", Description = "Requires Authorization-Token in the header")
        public ActionResult<IResponse> DeleteConferenceTopics([FromBody] ConferenceTopicstopicsID data)
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
                if (result == 1)
                {
                    var response = new GenericApiRespons { HttpCode = 200, Message = "Success" };
                    return Ok(response);
                }
                else if (result == 0)
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
        public ActionResult<IResponse> MoveConferenceTopics([FromBody] ConferenceRequestID data)
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
                var result = _conferenceBL.MoveConferenceTopics( data.ConferenceID, user.UserID);
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

        [HttpGet]
        [Route("ConferencesDetailsGeneral")]
        public ActionResult<IResponse> GetConferencesDetails()
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

                List<ConferencesDetailsEN> Conference = _conferenceBL.get_conferences_general(user.UserID);



                if (Conference != null)
                {
                    return Ok(new { Conference = Conference });
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

        [HttpGet]
        [Route("ConferencesDetailsSpecific")]
        public ActionResult<IResponse> GetConferencesDetailsSpecific(int conferenceID)
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

                List<ConferencesDetailsEN> Conference = _conferenceBL.get_conferences_specific(conferenceID,user.UserID);



                if (Conference != null)
                {
                    return Ok(new { Conference = Conference });
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

        [HttpGet]
        [Route("ConferencesDetailsByUser")]
        public ActionResult<IResponse> GetConferencesDetailsSpecificByUser()
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

                List<ConferencesDetailsEN> Conference = _conferenceBL.get_conferences_specific_by_user( user.UserID);



                if (Conference != null)
                {
                    return Ok(new { Conference = Conference });
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
        [HttpGet]
        [Route("ConferencesListTopicsByConferenceID")]
        public ActionResult<IResponse> get_ListTopicsByConferenceID(int ConferenceID)
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

                List<ListTopicsEN> Topics = _conferenceBL.get_ListTopicsByConferenceID(ConferenceID, user.UserID);



                if (Topics != null)
                {
                    return Ok(new { Topics = Topics });
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

        [HttpGet]
        [Route("ConferencesListTopicsByUserID")]
        public ActionResult<IResponse> get_ListTopicsByUserID()
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

                List<ListTopicsENU> Topics = _conferenceBL.get_ListTopicsByUserID( user.UserID);



                if (Topics != null)
                {
                    return Ok(new { Topics = Topics });
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

        [HttpGet]
        [Route("ConferencesListTopicsByTopicsID")]
        public ActionResult<IResponse> get_ListTopicsByTopicsID(int TopicsID)
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

                List<ListTopicsEN> Topics = _conferenceBL.get_ListTopicsByTopicsID(TopicsID, user.UserID);



                if (Topics != null)
                {
                    return Ok(new { Topics = Topics });
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

        [HttpPost("ConferenceAssignUserTopic")]
        // (Summary = "Registers a new conference", Description = "Requires Authorization-Token in the header")
        public ActionResult<IResponse> ConferenceAssignUserTopic([FromBody] ConferenceAssignUserTopic data)
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
                var (result, message) = _conferenceBL.RegisterAssignUserTopic(data.UserID, data.TopicsID, data.RolID);
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
            [Route("GetConferenceUsersDetails")]
            public ActionResult<IResponse> GetConferenceUsersDetails(int conferenceID)
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

                    List<ConferencesDatailsUser> User = _conferenceBL.GetConferenceUsersDetails(conferenceID, user.UserID);



                    if (User != null)
                    {
                        return Ok(new { UserConference = User });
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



        [HttpPost("UpdateUserConferenceRole")]
        // (Summary = "Deletes an existing conference", Description = "Requires Authorization-Token in the header")
        public ActionResult<IResponse> UpdateUserConferenceRole([FromBody] ConferenceUserRol data)
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
                var (result, message) = _conferenceBL.UpdateUserConferenceRole(data.UserID,data.topicsID,data.NewRolID);
                if (result == 1)
                {
                    var response = new GenericApiRespons { HttpCode = 200, Message = message };
                    return Ok(response);
                }
                else if (result == 0)
                {
                    var response = new GenericApiRespons { HttpCode = 404, Message = message };
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
        [Route("GetEvalutionCriteriaScaleDetails")]
        public ActionResult<IResponse> GetEvalutionCriteriaScaleDetails()
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

                var ResponseE = _conferenceBL.getDetallesEavliation( user.UserID);



                if (ResponseE != null)
                {
                    //Crear respuesta exitosa
                    EvaluationInteractor interactor = new EvaluationInteractor();
                    var responseSuccess = interactor.responsePurchaseInteractor(ResponseE);

                    return Ok(responseSuccess);
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
    }


}
