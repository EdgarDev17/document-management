using Conference.BL;
using Conference.Entities;
using ConferenceAPI.Interactors;
using ConferenceAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace ConferenceAPI.Controllers
{
    [Route("api/User/")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserBL _userBL;

        public UserController(UserBL userBL)
        {
            _userBL = userBL;
        }

        [HttpGet("UserPerfil")]
        public ActionResult<IResponse> Perfil()
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

                UserPerfilEN resp = new();
                resp = _userBL.GetUserProfile(user.UserID);
                if (resp != null)
                {
                    //Crear respuesta exitosa
                    UserInteractor interactor = new UserInteractor();
                    var responseSuccess = interactor.createSuccessResponse(resp);
                    return Ok(responseSuccess);

                }
                else
                {

                    return Unauthorized(new GenericApiRespons { HttpCode = 401, Message = "no data" });
                }
            }

            return StatusCode(StatusCodes.Status500InternalServerError, new GenericApiRespons
            {
                HttpCode = 500,
                Message = "Something went wrong"
            });
        }


        [HttpGet("Institutions")]
        public async Task<ActionResult<IResponse>> UserInstitution()
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
                try
                {
                    var institutions = await _userBL.GetInstitutionsByUserAsync(user.UserID);
                    return Ok(institutions);
                }
                catch (Exception ex)
                {
                    // Manejar el error y devolver una respuesta apropiada
                    return StatusCode(500, "Ha ocurrido un error al obtener las instituciones.");
                }
            }

            return StatusCode(StatusCodes.Status500InternalServerError, new GenericApiRespons
            {
                HttpCode = 500,
                Message = "Something went wrong"
            });
        }

        [HttpPost("CreateInstitution")]
        public ActionResult<IResponse> UserCreateInstitution([FromBody] InstitutionRegisterRequest data)
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
            
            if (user != null && data != null)
            {
                
                var result = _userBL.CreateInstitutionByUser(user.UserID, new InstitutionDetailsEN
                {
                    Description = data.Description,
                    ContactPhone = data.Phone,
                    Name = data.Name,
                    Website = data.Wesbite,
                    UserID = data.UserID,
                });
                
                if (result > 0)
                {
                    return Ok(new GenericApiRespons
                    {
                        HttpCode = 200,
                        Message = "Institution created successfully",
                    });
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
