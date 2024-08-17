namespace ConferenceAPI.Models
{
    public class ConferenceTopics
    {
    
        public string? name { get; set; }
        public string? description { get; set; }
        public string? location { get; set; }
        public DateTime startHour { get; set; }
        public DateTime StartEnd { get; set; }
        public int conferenceID { get; set; }
        public int TotalSpeakers { get; set; }
        public int TotalAttendees { get; set; }
        public int topicsID { get; set; }

    }
    public class ConferenceTopicstopicsID
    {
        public int topicsID { get; set; }
    }

    public class ConferenceUserRol
    {
        public int topicsID { get; set; }
        public int UserID { get; set; }
        public int NewRolID { get; set; }
    }

    public class ConferenceAssignUserTopic
        
    {
        public int UserID { get; set; }
        public int TopicsID { get; set; }
        public int RolID { get; set; }
    }
    public class ConferenceEvalutionCriteria

    {
        public int criterionID { get; set; }
        public int ConferenceID { get; set; }
      
    }
}
