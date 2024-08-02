using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conference.Entities
{
    public class ConferencesDatailsUser
    {
        public int? UserID { get; set; }
        public string? Name { get; set; }
        public string? Lastname { get; set; }
        public string? Email { get; set; }
        public string? ProfilePictureFile { get; set; }
        public string? ProfilePictureUrl { get; set; }
        public int? RolID { get; set; }
        public int? TopicsID { get; set; }
    }
}
