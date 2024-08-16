using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conference.Entities
{
    public class ListTopicsEN
    {
        public int? TopicsID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string StartHour { get; set; }
        public string StartEnd { get; set; }
        public int ConferenceID { get; set; }
    }

    public class ListTopicsENU
    {
        public int? TopicsID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string StartHour { get; set; }
        public string StartEnd { get; set; }
        public int ConferenceID { get; set; }
        public int RolID { get; set; }
    }
}
