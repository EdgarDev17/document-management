using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MimeKit;
using MailKit.Net.Smtp;
using MimeKit.Utils;


namespace Conference.BL.Utils
{
    public class EmailSend
    {
        private readonly IOptions<SettingsEmail> settingsEmail;

        public EmailSend(IOptions<SettingsEmail> SettingsEmail)
        {
            settingsEmail = SettingsEmail;
        }

        public  void Send(string Email,string Title, string MensajeBody, byte[] pdfData)
        {

            try
            {

                MimeMessage mensaje = new MimeMessage();
                mensaje.From.Add(new MailboxAddress("CongresApps", settingsEmail.Value.OutlookUser));
                mensaje.To.Add(new MailboxAddress("Destino", Email));// destino a quie va dirigido

                mensaje.Subject = Title;   //titulo//

                // Construye el cuerpo del mensaje utilizando HTML
                BodyBuilder CuerpoMensaje = new BodyBuilder();

                CuerpoMensaje.HtmlBody = MensajeBody;         

                if(pdfData.Length > 0 && pdfData != null)
                { 

                    CuerpoMensaje.Attachments.Add("Diploma_participante.pdf",pdfData,new ContentType("application", "pdf"));
                }

                mensaje.Body = CuerpoMensaje.ToMessageBody();

                // Evitar caer es SPAM (generando un ID unico)
                mensaje.MessageId = MimeUtils.GenerateMessageId();

                SmtpClient ClienteSmtp = new SmtpClient();
                ClienteSmtp.CheckCertificateRevocation = false;
                ClienteSmtp.Connect(settingsEmail.Value.Servidor, Int32.Parse(settingsEmail.Value.Puerto), MailKit.Security.SecureSocketOptions.StartTls);

                ClienteSmtp.Authenticate(settingsEmail.Value.OutlookUser, settingsEmail.Value.OutlookPass);

                ClienteSmtp.Send(mensaje);

                ClienteSmtp.Disconnect(true);

            }

            catch (Exception ex)
            {
                // Manejar la excepción (puedes registrar el error, volver a lanzar la excepción, etc.)
                Console.WriteLine($"Error al enviar el correo: {ex.Message}");
                // Puedes agregar más lógica aquí para manejar el error según sea necesario
            }

        }
    }
}
