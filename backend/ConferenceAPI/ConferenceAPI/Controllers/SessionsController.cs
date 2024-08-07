using Conference.BL;
using Conference.Entities;
using ConferenceAPI.Interactors;
using ConferenceAPI.Models;
using Microsoft.AspNetCore.Http;

using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ConferenceAPI.Controllers
{
    [Route("api/Sessions/")]
    [ApiController]
    public class SessionsController : ControllerBase
    {
        private readonly UserBL _userBL;

        public SessionsController(UserBL userBL)
        {
            _userBL = userBL;
        }
        [HttpPost("Signin")]
        public ActionResult <GenericApiRespons> Signin([FromBody] SigninRequest signinRequest)
        {
            try
            {
                if (string.IsNullOrEmpty(signinRequest.email) || string.IsNullOrEmpty(signinRequest.password))
                {
                    return BadRequest(new GenericApiRespons { HttpCode = 400, Message = "Email or password cannot be empty" });
                }
                else
                {
                    var user = _userBL.AuthenticatePerson(signinRequest.email, signinRequest.password, false);
                    if (user != null)
                    {
                        if (!user.confirmedMail)
                        {
                            return StatusCode(403, new GenericApiRespons { HttpCode = 403, Message = "Your Email is not verified." });
                        }
                        else if (user.state == true)
                        {
                            _userBL.SessionStart(user.UserID);
                            //Crear respuesta exitosa
                            SessionsInteractor interactor = new SessionsInteractor();
                            var responseSuccess = interactor.createSuccessResponse(user);
                            return Ok(responseSuccess);
                        }
                        else
                        {
                            // Ninguna de las condiciones se cumple, por lo tanto, credenciales no válidas.
                            return Unauthorized(new GenericApiRespons { HttpCode = 401, Message = "Invalid credentials" });
                        }
                    }
                    else
                    {
                        return Unauthorized(new GenericApiRespons { HttpCode = 401, Message = "Invalid credentials" });
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new GenericApiRespons { HttpCode = 500, Message = ex.Message });
            }
        }



        [HttpGet("SessionEnd")]
        public ActionResult<IResponse> SessionEnd()
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
                _userBL.SessionEND(user.UserID);
                return Ok(new GenericApiRespons
                {
                    HttpCode = 200,
                    Message = "Success"
                });
            }

            return StatusCode(StatusCodes.Status500InternalServerError, new GenericApiRespons
            {
                HttpCode = 500,
                Message = "Something went wrong"
            });
        }

    }

}
