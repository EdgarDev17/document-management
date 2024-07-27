using Conference.DAL;
using Conference.Entities;
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

        public CertificateBL(CertificateDAL certificateDAL)
        {
            this.certificateDAL = certificateDAL;
        }
        public List<CertificateEN> GetCertificatesData(int UserId, int TopicId, ref string message)
        {
            //int result = 0;
            List<CertificateEN> certificatesLst;

            certificatesLst = this.certificateDAL.GetCertificatesData(UserId, TopicId,ref message);

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
