using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conference.Entities
{
    public class ConferenceEvaluationCriteria
    {
        public int criterionID { get; set; }
        public int ConferenceID { get; set; }
    }

    public class RegisterEvaluationCriteriaDocument
    {
        public int EvaCritConfID { get; set; }
        public int ScaleID { get; set; }
       // public int UserID { get; set; }
        public int DocumentID { get; set; }
    }
}
