using Conference.BL;
using Conference.BL.Utils;
using ConferenceAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace ConferenceAPI.Controllers
{
    [Route("api/Certificate")]
    [ApiController]
    public class CertificateController : ControllerBase
    {
        private readonly UserBL _userBL;
        private readonly CertificateBL certificateBL;
        private readonly IHttpContextAccessor httpContext;
        private readonly IWebHostEnvironment env;
        private readonly IOptions<Settings> settings;
        public readonly string container = "certificates";

        public CertificateController(UserBL _userBL,CertificateBL certificateBL, IHttpContextAccessor httpContext,
            IWebHostEnvironment env, IOptions<Settings> settings)
        {
            this._userBL = _userBL;
            this.certificateBL = certificateBL;
            this.httpContext = httpContext;
            this.env = env;
            this.settings = settings;
        }

        [HttpPost("SaveCertificateConfigs")]
        public ActionResult<IResponse> SaveCertificateConfigs([FromForm] CertificateRequest certificateRequest)
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
                string logoPath = string.Empty;
                string signatureImagePath1 = string.Empty;
                string signatureImagePath2 = string.Empty;
                string sealLogo = string.Empty;

                if (!Directory.Exists(settings.Value.RutaArchivos))
                {
                    //env.WebRootPath = Path.Combine(env.ContentRootPath, "wwwroot");

                    Directory.CreateDirectory(settings.Value.RutaArchivos);
                }

                string folder = Path.Combine(settings.Value.RutaArchivos, container);

                if (certificateRequest.LogoPath != null)
                {
                  logoPath = LocalFileSaver.SaveLocalFile(httpContext.HttpContext.Request.Scheme,httpContext.HttpContext.Request.Host.ToString(),
                        container,folder,certificateRequest.LogoPath);
                }

                if (certificateRequest.SignatureImagePath1 != null)
                {
                   signatureImagePath1 = LocalFileSaver.SaveLocalFile(httpContext.HttpContext.Request.Scheme, httpContext.HttpContext.Request.Host.ToString(),
                        container, folder, certificateRequest.SignatureImagePath1);
                }

                if (certificateRequest.SignatureImagePath2 != null)
                {
                    signatureImagePath2 = LocalFileSaver.SaveLocalFile(httpContext.HttpContext.Request.Scheme, httpContext.HttpContext.Request.Host.ToString(),
                         container, folder, certificateRequest.SignatureImagePath2);
                }

                if (certificateRequest.SealLogo != null)
                {
                    signatureImagePath1 = LocalFileSaver.SaveLocalFile(httpContext.HttpContext.Request.Scheme, httpContext.HttpContext.Request.Host.ToString(),
                         container, folder, certificateRequest.SealLogo);
                }

                int result = this.certificateBL.SaveCertificateConfigs(certificateRequest.UserId, certificateRequest.TopicId, certificateRequest.InstitutionName,
                             certificateRequest.Content, logoPath, certificateRequest.BackgroundImagePath,
                             certificateRequest.OrganizerName1, certificateRequest.OrganizerTitle1, certificateRequest.OrganizerName2, 
                             certificateRequest.OrganizerTitle2, signatureImagePath1, 
                             signatureImagePath2, sealLogo,ref message);

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
                int result = 1;

                var lst = this.certificateBL.GetCertificatesData(userId, topicId, ref message);

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
