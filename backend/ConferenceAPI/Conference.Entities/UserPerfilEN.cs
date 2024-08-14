using System;

namespace Conference.Entities
{
    public class UserPerfilEN
    {
        public int UserID { get; set; }
        public string name { get; set; }
        public string lastname { get; set; }
        public string email { get; set; }
        
        public DateTime birthdate { get; set; }
        public string profilePictureUrl { get; set; }
        public string profilePictureFile { get; set; }
        public int countryID { get; set; }
        
        public string countryName { get; set; } // Nueva propiedad
        public string imagenBase { get; set; }
    }
}