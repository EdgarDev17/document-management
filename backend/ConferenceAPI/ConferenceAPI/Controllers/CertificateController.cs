using Conference.BL;
using Conference.Entities;
using ConferenceAPI.Models;
using Microsoft.AspNetCore.Mvc;
using MySqlX.XDevAPI.Common;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ConferenceAPI.Controllers
{
    [Route("api/Certificate/")]
    public class CertificateController : ControllerBase
    {
        private readonly UserBL _userBL;

        public CertificateController(UserBL _userBL,CertificateBL certificateBL)
        {
            this._userBL = _userBL;
            CertificateBL = certificateBL;
        }

        public CertificateBL CertificateBL { get; }

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

            var user = _userBL.VerifyPersonAuthentication(token);
            if (user != null)
            {
                int result = this.CertificateBL.SaveCertificateConfigs(certificateRequest.UserId, certificateRequest.TopicId, certificateRequest.InstitutionName,
                             certificateRequest.ConferenceTitle, certificateRequest.Content, certificateRequest.Date, certificateRequest.LogoPath, certificateRequest.BackgroundImagePath,
                             certificateRequest.OrganizerName1, certificateRequest.OrganizerTitle1, certificateRequest.OrganizerName2, certificateRequest.OrganizerTitle2, certificateRequest.SignatureImagePath1, certificateRequest.SignatureImagePath2);

                if (result == 1)
                {
                    var response = new GenericApiRespons { HttpCode = 200, Message = "Success" };
                    return Ok(response);
                }

                else if (result == 0)
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
            } else
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
