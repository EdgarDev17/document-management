using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conference.Entities
{
    public class UserEN
    {
        public int UserID { get; set; }
        public int ResponseCode { get; set; }
        public string email { get; set; }
        public bool confirmedMail { get; set; }
        public bool state { get; set; }
        public bool completeProfile { get; set; }
        public int countryID { get; set; }
        public DateTime TokenExpiration { get; set; }
        public String CurrentToken { get; set; }
        public String Password { get; set; }
        public int Active { get; set; }
        public bool IsValidToken { get; set; }
        public bool IsValidPassword { get; set; }  
    }
}
