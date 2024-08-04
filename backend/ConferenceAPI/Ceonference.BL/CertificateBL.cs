using Conference.BL.Utils;
using Conference.DAL;
using Conference.Entities;
using Org.BouncyCastle.Tls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conference.BL
{
    public class CertificateBL
    {
        private readonly CertificateDAL certificateDAL;
        private readonly EmailSend emailSend;

        public CertificateBL(CertificateDAL certificateDAL, EmailSend emailSend)
        {
            this.certificateDAL = certificateDAL;
            this.emailSend = emailSend;
        }
        public List<CertificateEN> GetCertificatesData(int UserId, int TopicId, ref string message)
        {
            //int result = 0;
            List<CertificateEN> certificatesLst;

            certificatesLst = this.certificateDAL.GetCertificatesData(UserId, TopicId,ref message);

            if(certificatesLst.Count > 0)
            {
                foreach (var item in certificatesLst)
                {
                    string RegDate = string.Empty;
                    string DateModified = string.Empty;
                    RegDate = item.RegDate.ToString();
                    DateModified = item.DateModified.ToString();

                    byte[] pdf =Certificates.GeneratePDF(item.Title,item.Description,item.Signed,item.CongressLogo,item.CongressSeal,
                        RegDate,DateModified,item.BackGroundImgURL,item.OrganizerName1,item.OrganizerName2,
                        item.OrganizerTitle1,item.OrganizerTitle2,item.SignatureImagePath1,item.SignatureImagePath2,item.EventDate,
                        item.ParticipantName,item.InstitutionName,item.TitleTopic);

                    emailSend.Send("perez.vasquez.1812@gmail.com", "Prueba", "Diploma de participacion", pdf);

                }
            }
            return certificatesLst;
        }

        public int SaveCertificateConfigs(int UserId, int TopicId, string InstitutionName,
            string Content, string LogoPath, string BackgroundImagePath,
            string OrganizerName1, string OrganizerTitle1, string OrganizerName2, string OrganizerTitle2, 
            string SignatureImagePath1, string SignatureImagePath2, string SealLogo, ref string message)
        {
            int result = 0;

            result = this.certificateDAL.SaveCertificateConfigs(UserId,TopicId,InstitutionName,
                     Content,LogoPath,BackgroundImagePath,OrganizerName1,
                     OrganizerTitle1,OrganizerName2,OrganizerTitle2,SignatureImagePath1,SignatureImagePath2,
                     SealLogo,ref message);

            return result;
        }


    }
}
