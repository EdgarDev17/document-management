namespace ConferenceAPI.Models
{
    public class ConferenceRequest
    {

        public int RollID { get; set; }
        public int institucionID { get; set; }
        // public string nameInstitution { get; set; }
        //  public string webSiteInstitution { get; set; }
        //  public string contactPhoneInstitution { get; set; }
        public string nameConference { get; set; }
        public string typeConference { get; set; }
        public string description { get; set; }
        public DateTime beggingDate { get; set; }
        public DateTime finishDate { get; set; }
        public int areaID { get; set; }
        public int documentAttempt { get; set; }


    }

    public class ConferenceRequestID
    {
        public int ConferenceID { get; set; }
    }
}
