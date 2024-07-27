namespace ConferenceAPI.Models
{
    public class CertificateRequest
    {
        public int UserId { get; set; }
        public int TopicId { get; set; }
        public string InstitutionName { get; set; }
        public string ParticipantName { get; set; }
        public string ConferenceTitle { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public string LogoPath { get; set; }
        public string BackgroundImagePath { get; set; }
        public string OrganizerName1 { get; set; }
        public string OrganizerTitle1 { get; set; }
        public string OrganizerName2 { get; set; }
        public string OrganizerTitle2 { get; set; }
        public string SignatureImagePath1 { get; set; }
        public string SignatureImagePath2 { get; set; }
    }
}
