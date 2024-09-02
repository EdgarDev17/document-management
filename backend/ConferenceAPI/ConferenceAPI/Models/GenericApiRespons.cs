namespace ConferenceAPI.Models
{
    public class GenericApiRespons: IResponse
    {
        public int HttpCode { get; set; }
       // public string InternalCode { get; set; }
        public string Message { get; set; }
    }
}
