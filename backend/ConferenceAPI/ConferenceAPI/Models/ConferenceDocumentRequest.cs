namespace ConferenceAPI.Models
{
    public class ConferenceDocumentRequest
    {
       
        public string NameDocument { get; set; }
       
        public int TopicsID { get; set; }
       
        public Byte[] Document { get; set; }
        public string DocumentExtension { get; set; }
    }
}
