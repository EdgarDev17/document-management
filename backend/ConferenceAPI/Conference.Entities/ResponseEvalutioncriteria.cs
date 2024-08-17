using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conference.Entities
{
   public class ResponseEvalutioncriteria
    {
        public int criterionID { get; set; }
        public string aspect {  get; set; }
        public string description { get; set; }
    }

    public class EvaluationCriteriaConference
    {
        // Properties with Getters and Setters

        public int CriterionID { get; set; }          // Corresponds to ec.criterionID
        public int ConferenceID { get; set; }         // Corresponds to ec.conferenceID
        public string Aspect { get; set; }            // Corresponds to c.aspect
        public string Description { get; set; }       // Corresponds to c.description
    }
}
