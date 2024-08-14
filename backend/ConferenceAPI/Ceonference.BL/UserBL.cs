using Conference.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;

using System.Text;
using System.Threading.Tasks;
using Conference.BL.Utils;
using Conference.Entities;
using Microsoft.Extensions.Configuration;
using System.Configuration;
using Microsoft.Extensions.Options;
using static System.Net.Mime.MediaTypeNames;
using System.Drawing;
using MySqlX.XDevAPI.Common;
using Mysqlx.Session;

namespace Conference.BL
{
    public class UserBL
    {



        private readonly UserDAL _userDAL;
        private readonly IOptions<Settings> settings;
        private readonly JWT jwt;
        private readonly EmailSend _emailSend;
        public UserBL()
        {
            // Constructor sin parámetros
        }


        public UserBL(UserDAL userDAL, IOptions<Settings> settings, EmailSend emailSend)
        {
            _userDAL = userDAL;
            this.settings = settings;
            jwt = new JWT();
            _emailSend = emailSend;
        }
        private readonly Utils.Constants _constants;



        //Registar datos del usuario
        public int RegisterUsers(string email, string name, string lastname, DateTime birthdate, string password)
        {
            string passwordHash = "";
            string passwordSalt = "";
            // Quitar espacios en blanco al inicio y al final de las cadenas de texto
            name = name.Trim();
            lastname = lastname.Trim();
            password = password.Trim();

            passwordSalt = Encrypt.EncryptStringAES(password);


            passwordHash = HashPassword(password);

            int result = 0;

            var User = _userDAL.RegisterUsers(email, name, lastname, birthdate, passwordSalt, passwordHash);
            if (User.ResponseCode == 1)
            {
                // Correo ya se encuentra registrado
                result = 400;
            }
            else if (User.ResponseCode == 2)
            {
                ;
                var title = "Valida tu Email para hacer uso de CongresDocs";

                var mensajeBody = $@"
<!DOCTYPE html>
<html lang=""es"">
<head>
<meta charset=""UTF-8"">
<meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
<title>Validación de Correo Electrónico</title>
<style>
  /* Import a modern font like Roboto */
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

  /* Body styles */
  body {{
    font-family: 'Roboto', sans-serif;
    background-color: #f7f7f7; /* Light gray background */
    color: #333; /* Dark gray text */
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* Fallback for browsers not supporting viewport height */
  }}

  /* Container styles */
  .container {{
    max-width: 600px;
    width: 80%; /* Responsive container using viewport width */
    margin: 2rem auto; /* Add some margin for better spacing */
    padding: 2rem;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle box-shadow for depth */
  }}

  /* Heading styles */
  h2 {{
    color: #212529; /* Darker heading color */
    font-weight: 500;
    margin-bottom: 1rem; /* Add some space after heading */
  }}

  /* Paragraph styles */
  p {{
    line-height: 1.6;
    margin: 0 0 1.5rem;
  }}

  /* Button (styled anchor tag) styles */
  a {{
    display: inline-block;
    padding: 12px 24px;
    background-color: #38aadc; /* Primary button color (blue) */
    color: #fff; /* White text color */
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
    font-weight: bold; /* Bold text for emphasis */
  }}

  /* Button hover styles */
  a:hover {{
    background-color: #2e8dbc; /* Darken button on hover */
  }}
</style>
</head>
<body>
  <div class=""container"">
    <h2>Validación de Correo Electrónico</h2>
    <p>Haga clic en el siguiente enlace para validar su correo electrónico:</p>
    <a href=""https://localhost:44396/ValidateEmial/?userID={User.UserID}"">Validar Correo Electrónico</a>
  </div>
</body>
</html>
";


                _emailSend.Send(email, title, mensajeBody, []);




                result = 200;
            }
            else
            {
                result = 400;
            }

            return result;
        }

        public int ValidateEmail(int userID)
        {
            int result;

            result = _userDAL.ValidateEmail(userID);

            return result;
        }
        public int EmailExists(string pEmail)
        {
            var result = _userDAL.EmailExists(pEmail);
            return result;
        }

        private string HashPassword(string password)
        {
            byte[] salt;
            byte[] buffer2;
            if (password == null)
            {
                throw new ArgumentNullException("password");
            }
            using (Rfc2898DeriveBytes bytes = new Rfc2898DeriveBytes(password, 0x10, 0x3e8))
            {
                salt = bytes.Salt;
                buffer2 = bytes.GetBytes(0x20);
            }
            byte[] dst = new byte[0x31];
            Buffer.BlockCopy(salt, 0, dst, 1, 0x10);
            Buffer.BlockCopy(buffer2, 0, dst, 0x11, 0x20);
            return Convert.ToBase64String(dst);
        }

        public void SessionStart(int userID)
        {
            _userDAL.SessionStart(userID);

        }
        public UserEN AuthenticatePerson(string pEmail, string pPassword, bool pEncrypted)
        {
            UserEN user = new UserEN();

            try
            {

                if (pEncrypted)
                {
                    pPassword = Encrypt.DecryptStringAESVector2(pPassword);
                }

                var nepass = Encrypt.EncryptStringAES(pPassword);
                pPassword = nepass;

                //revisar el hast de la contraseña
                user = _userDAL.AuthenticatePerson(pEmail, pPassword);




                if (user != null)
                {


                    // Asignar la fecha de vencimiento al token de autenticación
                    //  user.TokenExpiration = DateTime.Now.AddHours(Utils.Constants.TokenLifetime);

                    if (string.IsNullOrEmpty(settings.Value.TiempoVidaToken))
                    {
                        settings.Value.TiempoVidaToken = "8";
                    }

                    user.TokenExpiration = DateTime.Now.AddHours(Int32.Parse(settings.Value.TiempoVidaToken));
                    user.CurrentToken = jwt.encode(user);
                    user.UserID = user.UserID;
                    user.email = user.email;
                    user.confirmedMail = user.confirmedMail;
                    user.state = user.state;
                    user.completeProfile = user.completeProfile;
                    user.countryID = user.countryID;

                    //int sessionID = sessionDAL.InsertAuthenticationLog(person.PersonID, CentralAmericaDateTime(DateTime.Now), person.ProfileCompleted, ClientApp);
                    //person.SessionID = sessionID;

                    //ManageUserSessions(sessionID, person);


                }

            }
            catch (Exception ex)
            {
                user = null!;
                Console.WriteLine(ex.InnerException);
                // EventViewerLoggerBL.LogError("AuthenticatePersonBL, InnerException: " + ex.InnerException + " Message: " + ex.Message);
            }


            return user!;
        }



        public virtual UserEN VerifyPersonAuthentication(IEnumerable<String> pToken)
        {
            UserEN verifiedPerson = new();

            try
            {
                var decryptedData = jwt.decode(pToken.First().ToString());

                verifiedPerson = _userDAL.VerifyUser(decryptedData);

                if (verifiedPerson != null)
                {
                    verifiedPerson.state = decryptedData.state;
                    if (verifiedPerson.state == false)
                    {
                        verifiedPerson.IsValidToken = false;
                    }
                    else
                        verifiedPerson.IsValidToken = (decryptedData.TokenExpiration < DateTime.Now) ? false : true;
                }
            }
            catch (Exception ex)
            {
                verifiedPerson = null;
                Console.WriteLine(ex.InnerException);

            }

            return verifiedPerson;
        }

        public void SessionEND(int userID)
        {
            _userDAL.SessionEND(userID);

        }

        public int imagen(byte[] image, string extension, int UserID)
        {
            int result;

            result = _userDAL.RegisterImagens(image, extension, UserID);

            return result;
        }


        public UserPerfilEN GetUserProfile(int userID)
        {
            UserPerfilEN user = new UserPerfilEN();
            user = _userDAL.GetUserProfile(userID);
            return user;
        }
    }

}
