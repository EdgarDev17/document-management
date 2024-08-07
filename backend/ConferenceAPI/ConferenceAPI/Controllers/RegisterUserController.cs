using Conference.BL;
using Conference.BL.Utils;
using Conference.Entities;
using ConferenceAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace ConferenceAPI.Controllers
{
    [Route("api/RegisterUsers/")]
    [ApiController]
    public class RegisterUserController : ControllerBase
    {

        private readonly UserBL _userBL;
        private readonly IOptions<Settings> settings;

        public RegisterUserController  (UserBL userBL,IOptions<Settings> settings)
        {
            _userBL = userBL;
            this.settings = settings;
        }

        [HttpGet("ValidateEmail/{userID:int}")]
        public ActionResult<GenericApiRespons> ValidateEmail(int userID)
        {
            var prueba= settings.Value.TiempoVidaToken;

            if (userID != 0)
            {
                var result = _userBL.ValidateEmail(userID);

                if (result == 0)
                {
                    return Ok(new GenericApiRespons { HttpCode = 200, Message = "Email confirmed in database" });
                }
                else if (result == 1)
                {
                    return Conflict(new GenericApiRespons { HttpCode = 409, Message = "The email has already been validated" });
                }
                else
                {
                    return StatusCode(500, new GenericApiRespons { HttpCode = 500, Message = "Something went wrong" });
                }
            }
            else
            {
                return BadRequest(new GenericApiRespons { HttpCode = 400, Message = "Invalid UserID" });
            }

            
        }

        [HttpPost("RegisterUser")]
        public ActionResult<GenericApiRespons> RegisterUser([FromBody] UserRegisterRequest data)
        {


            try
            {
                if (data != null)
                {
                    var resultValidate = _userBL.EmailExists(data.email);

                    if (resultValidate == 0)
                    {
                        var result = _userBL.RegisterUsers(data.email, data.name, data.lastname, data.Birthdate, data.Password);

                        if (result == 200)
                        {
                            var response = new GenericApiRespons { HttpCode = 200, Message = "Success" };
                            return Ok(response);
                        }
                        else
                        {
                            var response = new GenericApiRespons { HttpCode = 404, Message = "Something went wrong" };
                            return NotFound(response);
                        }
                    }
                    else
                    {
                        var response = new GenericApiRespons { HttpCode = 409, Message = "Email already registered" };
                        return Conflict(response);
                    }
                }
                else
                {
                    var response = new GenericApiRespons { HttpCode = 500, Message = "Something went wrong" };
                    return StatusCode(500, response);
                }
            }
            catch (Exception)
            {
                var response = new GenericApiRespons { HttpCode = 500, Message = "Something went wrong" };
                return StatusCode(500, response);
            }
        }


        [HttpPost("Imagen")]
        public ActionResult<IResponse> Imagen([FromBody] ImageUserRequest data)
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
               var result =_userBL.imagen(data.Image,data.ImageExtension,user.UserID);

                if (result == 1 || result==2)
                {
                    var response = new GenericApiRespons { HttpCode = 200, Message = "Success" };
                    return Ok(response);
                }
            
                else if(result == 0)
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
            else { 
            return StatusCode(StatusCodes.Status500InternalServerError, new GenericApiRespons
            {
                HttpCode = 500,
                Message = "Something went wrong"
            });

            }

        }
    }
}
