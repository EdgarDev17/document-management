namespace ConferenceAPI.Models
{
    public class UserPerfilResponse:IResponse
    {
        public int UserID { get; set; }
        public string name { get; set; }
        public string lastname { get; set; }
        public string email { get; set; }
        public DateTime birthdate { get; set; }
        public int countryID { get; set; }
        public string imagenBase { get; set; }
        
    }
}
