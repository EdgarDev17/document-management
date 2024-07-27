using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conference.DAL
{
    public class CertificateDAL
    {
        private readonly Connection connection;

        public CertificateDAL(Connection connection)
        {
            this.connection = connection;
        }

        public int SaveCertificateConfigs(int UserId,int TopicId,string InstitutionName,
            string ConferenceTitle,string Content,DateTime Date,string LogoPath,string BackgroundImagePath,
            string OrganizerName1, string OrganizerTitle1, string OrganizerName2,string OrganizerTitle2,string SignatureImagePath1, string SignatureImagePath2)
        {
            // TODO: Falta desarrollo
            return 1;
        }
    }
}
