namespace ConferenceAPI.Models;

public class InstitutionRegisterRequest
{
  
    public string Name { get; set; }
    public string Website { get; set; }
    public string Phone { get; set; }
    public string Description { get; set; }
    
    public string Image { get; set; }
    
    public int UserID { get; set; }

}