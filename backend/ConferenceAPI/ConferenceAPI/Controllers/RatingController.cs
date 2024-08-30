using Conference.BL;
using Conference.Entities;
using ConferenceAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace ConferenceAPI.Controllers
{
    [Route("api/Rating")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        private readonly RatingBL ratingBL;
        private readonly UserBL _userBL;

        public RatingController(RatingBL ratingBL, UserBL _userBL)
        {
            this.ratingBL = ratingBL;
            this._userBL = _userBL;
        }

        [HttpPost("ManageRating")]
        public ActionResult<IResponse> GenerateCertificates([FromBody] RatingRequest ratingRequest)
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
                string message = string.Empty;
                int result = 0;

                result = this.ratingBL.ManageRating( ratingRequest.UserID, ratingRequest.TopicID, ratingRequest.score,
                    ref message);

                if (result == 1)
                {
                    var response = new GenericApiRespons { HttpCode = 200, Message = "Success" };
                    return Ok(response);
                }
                else if (result == 0)
                {
                    if (string.IsNullOrEmpty(message))
                    {
                        message = "usuario no encontrado";
                    }

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
        [Route("ScoreTopicsPromedio")]
        public ActionResult<IResponse> ScoreTopicsPromedio(int TopicID)
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

                PromedioScoreEN Score = this.ratingBL.ScoreTopicsPromedio(TopicID, user.UserID);



                if (Score != null)
                {
                    return Ok(new { RatingTopics = Score });
                }
                else
                {
                    var response = new GenericApiRespons { HttpCode = 409, Message = "¡Algo salio mal!" };
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
        [Route("ScoreTopicsUser")]
        public ActionResult<IResponse> ScoreTopicsUser(int TopicID)
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

                ScoreEN Score = this.ratingBL.ScoreTopicsUser(TopicID, user.UserID);



                if (Score != null)
                {
                    return Ok(new { ScoreTopics = Score });
                }
                else
                {
                    var response = new GenericApiRespons { HttpCode = 409, Message = "¡Algo salio mal!" };
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
