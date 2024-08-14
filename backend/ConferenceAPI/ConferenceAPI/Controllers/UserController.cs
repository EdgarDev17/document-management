using Conference.BL;
using Conference.DAL;
using Conference.Entities;
using ConferenceAPI.Interactors;
using ConferenceAPI.Models;
using Microsoft.AspNetCore.Http;
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
        public ActionResult<IResponse> UserInstitution()
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

                List<InstitutionDetailsEN> resp = _userBL.GetInstitutionsByUser(user.UserID);
               
                if (resp != null)
                {
                    //Crear respuesta exitosa
                    InstitutionInteractor interactor = new InstitutionInteractor();
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
    }
}
