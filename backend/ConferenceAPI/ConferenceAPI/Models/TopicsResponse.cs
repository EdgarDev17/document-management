using Conference.Entities;

namespace ConferenceAPI.Models
{
    public class TopicsResponse : IResponse
    {
        public List<TopicsEN>? Temas { get; set; }
    }
}
