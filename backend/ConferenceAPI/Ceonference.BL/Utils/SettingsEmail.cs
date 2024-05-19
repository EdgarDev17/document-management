using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conference.BL.Utils
{
    public class SettingsEmail
    {
        public string OutlookUser { get; set; }
        public string OutlookPass { get; set; }

        public string Servidor { get; set; }
        public string Puerto { get; set; }
    }
}
