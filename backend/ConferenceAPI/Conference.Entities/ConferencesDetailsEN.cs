using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conference.Entities
{
    public class ConferencesDetailsEN
    {
        public int conferenceID { get; set; }
        public int userID { get; set; }

        public string conference_name { get; set; }
        public string conference_type { get; set; }
        public string description { get; set; }
        public string conference_RegDate { get; set; }
        public string beggingDate { get; set; }
        public string finishDate { get; set; }
        public int documentAttempt { get; set; }
        public int institutionID { get; set; }
        public int Status { get; set; }
        public string? Location { get; set; }
        public string? urlconference { get; set; }
        public string institution_name { get; set; }
        public string institution_website { get; set; }
        public string institution_contact_phone { get; set; }
        public int? rolID { get; set; }

        public int? TotalCupos { get; set; }
        public int? TotalRegistrados { get; set; }





    }
}
