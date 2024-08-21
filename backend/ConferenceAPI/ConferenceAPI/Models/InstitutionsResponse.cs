using Conference.Entities;

namespace ConferenceAPI.Models
{
    public class InstitutionsResponse : IResponse
    {
        public List<InstitutionDetailsEN> Institutions { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }
    }
}