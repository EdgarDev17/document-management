using Conference.BL;
using Conference.Entities;
using ConferenceAPI.Models;
using Microsoft.AspNetCore.Mvc;
using MySqlX.XDevAPI.Common;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ConferenceAPI.Controllers
{
    [Route("api/Certificate")]
    [ApiController]
    public class CertificateController : ControllerBase
    {
        private readonly UserBL _userBL;
        private readonly CertificateBL certificateBL;

        public CertificateController(UserBL _userBL,CertificateBL certificateBL)
        {
            this._userBL = _userBL;
            this.certificateBL = certificateBL;
        }

        [HttpPost("SaveCertificateConfigs")]
        public ActionResult<IResponse> SaveCertificateConfigs([FromBody] CertificateRequest certificateRequest)
        {
            if (!Request.Headers.TryGetValue("Authorization-Token", out var token))
            {
                return BadRequest(new GenericApiRespons
                {
                    HttpCode = 400,
                    Message = "Authorization-Token must be provided"
                });
            }

            //var user = _userBL.VerifyPersonAuthentication(token);
            var user = "";
            if (user == string.Empty)
            {
                string message = string.Empty;
                int result = this.certificateBL.SaveCertificateConfigs(certificateRequest.UserId, certificateRequest.TopicId, certificateRequest.InstitutionName,
                             certificateRequest.Content, certificateRequest.LogoPath, certificateRequest.BackgroundImagePath,
                             certificateRequest.OrganizerName1, certificateRequest.OrganizerTitle1, certificateRequest.OrganizerName2, certificateRequest.OrganizerTitle2, certificateRequest.SignatureImagePath1, 
                             certificateRequest.SignatureImagePath2, certificateRequest.SealLogo,ref message);

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
            } else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new GenericApiRespons
                {
                    HttpCode = 500,
                    Message = "Something went wrong"
                });
            }

        }

        [HttpGet("GenerateCertificates/{userId:Int}/{topicId:Int}")]
        public ActionResult<IResponse> GenerateCertificates(int userId,int topicId)
        {
            /*if (!Request.Headers.TryGetValue("Authorization-Token", out var token))
            {
                return BadRequest(new GenericApiRespons
                {
                    HttpCode = 400,
                    Message = "Authorization-Token must be provided"
                });
            }*/

            //var user = _userBL.VerifyPersonAuthentication(token);
            var user = "";
            if (user == string.Empty)
            {
                string message = string.Empty;
                int result = this.certificateBL.( ref message);

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
    }
}
