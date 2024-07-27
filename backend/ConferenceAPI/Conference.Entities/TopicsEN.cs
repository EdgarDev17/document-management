using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conference.Entities
{
    public class TopicsEN
    {
        public int topicsID { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string location { get; set; }
        public DateTime startHour { get; set; }
        public DateTime StartEnd { get; set; }
        public int conferenceID { get; set; }
      
    }
}
