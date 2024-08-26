using Conference.BL;
using Conference.Entities;
using ConferenceAPI;
using ConferenceAPI.Interactors;
using ConferenceAPI.Models;
using ConferenceAPI.Models.Institution;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace ConferenceAPI.Controllers
{
    [Route("api/Institutions/")]
    [ApiController]
    public class InstitutionController : ControllerBase
    {
        private readonly InstitutionBL _institutionBl;
        private readonly UserBL _userBl;
        
        public InstitutionController(InstitutionBL institutionBl, UserBL userBl)
        {
            _institutionBl = institutionBl;
            _userBl = userBl;
        }
        
        [HttpPut("Update")]
        public async Task<ActionResult<IResponse>> UserUpdateInstitution([FromBody] InstitutionDetailsEN data)
        {
            if (!Request.Headers.TryGetValue("Authorization-Token", out var token))
            {
                return BadRequest(new GenericApiRespons
                {
                    HttpCode = 400,
                    Message = "Authorization-Token must be provided"
                });
            }

            var user = _userBl.VerifyPersonAuthentication(token);

            try
            {
                var result = await _institutionBl.UpdateInstitutionById(user.UserID, data);
                return Ok(result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        
        [HttpDelete("Delete")]
        public async Task<ActionResult<IResponse>> UserDeleteInstitution([FromBody] DeleteInstitutionReq data)
        {
            if (!Request.Headers.TryGetValue("Authorization-Token", out var token))
            {
                return BadRequest(new GenericApiRespons
                {
                    HttpCode = 400,
                    Message = "Authorization-Token must be provided"
                });
            }

            var user = _userBl.VerifyPersonAuthentication(token);

            if (user != null)
            {
                try
                {
                    var result = await _institutionBl.DeleteInstitutionById(user.UserID, data.InstitutionId);
                    return Ok(result);
                }
                catch (MySqlException ex) when (ex.Number == 1451) // Código de error para violación de restricción de clave foránea
                {
                    return Conflict(new DatabaseErrorResponse 
                    { 
                        Message = "Cannot delete the institution because it has associated conferences. Please delete the conferences first.",
                        ErrorCode = "FOREIGN_KEY_CONSTRAINT"
                    });
                }
                catch (Exception ex)
                {
                    // Manejar el error y devolver una respuesta apropiada
                    Console.WriteLine(ex);
                    return StatusCode(500, "Ha ocurrido un error al obtener las instituciones.");
                }
            }

            return StatusCode(StatusCodes.Status500InternalServerError, new GenericApiRespons
            {
                HttpCode = 500,
                Message = "Something went wrong"
            });
        }
        
        [HttpPost("Create")]
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

            var user = _userBl.VerifyPersonAuthentication(token);
            
            if (user != null && data != null)
            {
                
                var result = _institutionBl.CreateInstitutionByUser(user.UserID, new InstitutionDetailsEN
                {
                    Description = data.Description,
                    contact_phone = data.Phone,
                    Name = data.Name,
                    Website = data.Website,
                    UserID = data.UserID,
                    Image = data.Image
                    
                });
                
                if (result > 0)
                {
                    return Ok(new GenericApiRespons
                    {
                        HttpCode = 200,
                        Message = "Institution created successfully"
                    });
                }
                

            }

            return StatusCode(StatusCodes.Status500InternalServerError, new GenericApiRespons
            {
                HttpCode = 500,
                Message = "Something went wrong"
            });
        }
        
        [HttpGet]
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

            var user = _userBl.VerifyPersonAuthentication(token);

            if (user != null)
            {
                try
                {
                    var institutions = await _institutionBl.GetInstitutionsByUserAsync(user.UserID);
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

        [HttpGet("{institutionId}")]
        public async Task<ActionResult<IResponse>> GetInstitutionById(int institutionId)
        {
            if (!Request.Headers.TryGetValue("Authorization-Token", out var token))
            {
                return BadRequest(new GenericApiRespons
                {
                    HttpCode = 400,
                    Message = "Authorization-Token must be provided"
                });
            }

            var user = _userBl.VerifyPersonAuthentication(token);
            try
            {
                var institution = await _institutionBl.GetInstitutionById(user.UserID, institutionId);
                return Ok(institution);

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        
    }
}