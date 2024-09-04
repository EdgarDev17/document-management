namespace ConferenceAPI.Models
{
    public class UserRegisterRequest
    {
        public string name { get; set; }
        public string lastname { get; set; }
        public string email { get; set; }
        public DateTime Birthdate { get; set; }
        public string Password { get; set; }
        public string UrlValidateEmail { get; set; }
    }
    
}
