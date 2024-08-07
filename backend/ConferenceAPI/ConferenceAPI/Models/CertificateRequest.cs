namespace ConferenceAPI.Models
{
    public class CertificateRequest
    {
        public int UserId { get; set; }
        public int TopicId { get; set; }
        public string? InstitutionName { get; set; }
        public string Content { get; set; }
        public IFormFile LogoPath { get; set; }
        public string? BackgroundImagePath { get; set; }
        public string OrganizerName1 { get; set; }
        public string OrganizerTitle1 { get; set; }
        public string OrganizerName2 { get; set; }
        public string OrganizerTitle2 { get; set; }
        public IFormFile SignatureImagePath1 { get; set; }
        public IFormFile SignatureImagePath2 { get; set; }
        public IFormFile? SealLogo { get; set; }
    }
}
