using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conference.Entities
{
    public class CertificateEN
    {
        public int DiplomaID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Signed { get; set; }
        public string CongressLogo { get; set; }
        public string CongressSeal { get; set; }
        public int TopicsID { get; set; }
        public int UserID { get; set; }
        public DateTime RegDate { get; set; }
        public DateTime DateModified { get; set; }
        public string BackGroundImgURL { get; set; }
        public string OrganizerName1 { get; set; }
        public string OrganizerName2 { get; set; }
        public string OrganizerTitle1 { get; set; }
        public string OrganizerTitle2 { get; set; }
        public string SignatureImagePath1 { get; set; }
        public string SignatureImagePath2 { get; set; }
        public string EventDate { get; set; }
        public string ParticipantName { get; set; }
        public string InstitutionName { get; set; }
        public string Email { get; set; }
        public string TitleTopic { get; set; }
    }
}
