using Conference.Entities;

namespace ConferenceAPI.Models
{
    public class AreasResponse : IResponse
    {
        public List<areaEN>? Areas { get; set; }
    }
}
