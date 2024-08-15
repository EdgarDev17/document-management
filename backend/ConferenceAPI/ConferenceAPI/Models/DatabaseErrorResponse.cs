namespace ConferenceAPI.Models;

public class DatabaseErrorResponse
{
    public int HttpCode { get; set; }
    public string Message { get; set; }
    public string ErrorCode { get; set; }
}