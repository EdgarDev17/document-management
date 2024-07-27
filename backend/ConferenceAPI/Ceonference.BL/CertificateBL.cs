using Conference.DAL;
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

        public int SaveCertificateConfigs(int UserId, int TopicId, string InstitutionName,
            string ConferenceTitle, string Content, DateTime Date, string LogoPath, string BackgroundImagePath,
            string OrganizerName1, string OrganizerTitle1, string OrganizerName2, string OrganizerTitle2, string SignatureImagePath1, string SignatureImagePath2)
        {
            int result = 0;

            result = this.certificateDAL.SaveCertificateConfigs(UserId,TopicId,InstitutionName,
                     ConferenceTitle,Content,Date,LogoPath,BackgroundImagePath,OrganizerName1,
                     OrganizerTitle1,OrganizerName2,OrganizerTitle2,SignatureImagePath1,SignatureImagePath2);

            return result;
        }
    }
}
