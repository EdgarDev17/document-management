using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conference.Entities
{
    public class UserPerfilEN
    {
        public int UserID { get; set; }
        public string name { get; set; }
        public string lastname{ get; set; }
        public string email { get; set; }
        public DateTime birthdate { get; set; }
        public string profilePictureUrl { get; set; }
        public string profilePictureFile { get; set; }
        public int countryID { get; set; }
        public string imagenBase { get; set; }
        
    }
}
