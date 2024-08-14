using System.ComponentModel.DataAnnotations.Schema;

namespace Conference.Entities;

public class InstitutionDetailsEN
{
    public int InstitutionID { get; set; }
    public string Name { get; set; }
    public string Website { get; set; }
    
    [Column("contact_phone")]
    public string ContactPhone { get; set; }

    public string Description { get; set; }
    public int RolID { get; set; }
}