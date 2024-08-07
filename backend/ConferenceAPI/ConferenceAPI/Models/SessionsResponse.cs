namespace ConferenceAPI.Models
{
    public class SessionsResponse:IResponse
    {
        public int UserID { get; set; }
        public String email { get; set; }
        public String token { get; set; }
    }
}
