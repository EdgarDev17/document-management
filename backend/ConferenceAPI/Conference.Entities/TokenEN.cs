using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conference.Entities
{
    public class TokenEN
    {
        public int UserID { get; set; }
        public String email { get; set; }
        public String Password { get; set; }
        public bool completeProfile { get; set; }
        public int countryID { get; set; }
        public DateTime ExpirationDate { get; set; }
        public bool State { get; set; }
    }
}
