using System.ComponentModel.DataAnnotations;

namespace ConferenceAPI.Models
{
    public class RatingRequest
    {
       // [Required(ErrorMessage = "Este campo es requerido")]
       // public int UserConferenceID { get; set; }
        [Required(ErrorMessage = "Este campo es requerido")]
        public int UserID { get; set; }
        [Required(ErrorMessage = "Este campo es requerido")]
        public int TopicID { get; set; }
        [Required(ErrorMessage = "Este campo es requerido")]
        public decimal score { get; set; }
    }
}
