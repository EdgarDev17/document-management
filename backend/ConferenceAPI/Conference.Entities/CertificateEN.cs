using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conference.Entities
{
    public class CertificateEN
    {
        public int UserId { get; set; }
        public int TopicId { get; set; }
        public string InstitutionName { get; set; }
        public string Content { get; set; }
        public string LogoPath { get; set; }
        public string BackgroundImagePath { get; set; }
        public string OrganizerName1 { get; set; }
        public string OrganizerTitle1 { get; set; }
        public string OrganizerName2 { get; set; }
        public string OrganizerTitle2 { get; set; }
        public string SignatureImagePath1 { get; set; }
        public string SignatureImagePath2 { get; set; }
        public string SealLogo { get; set; }
    }
}
