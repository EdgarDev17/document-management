using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conference.Entities
{
    public class ConferencesAgenda
    {
        public int TopicsID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string StartHour { get; set; }  // Formatted as HH:mm
        public string StartEnd { get; set; }   // Formatted as HH:mm
    }
}
