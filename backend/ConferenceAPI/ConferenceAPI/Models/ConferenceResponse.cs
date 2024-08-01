using Conference.Entities;

namespace ConferenceAPI.Models
{
    public class ConferenceResponse
    {
        public int ConferenceID { get; set; }
        public string Message { get; set; }
    }

    public class ConferenceDetailsResponse : IResponse
    {
        public List<ConferencesDetailsEN>? Conference { get; set; }
    }
}
