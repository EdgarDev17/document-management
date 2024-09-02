using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conference.Entities
{
    public class DocumentEN
    {
        // Datos del documento
        public int DocumentID { get; set; }
        public string Name { get; set; }
        public DateTime RegDate { get; set; }
        public string Review { get; set; }
        public int UserID { get; set; }
        public int TopicsID { get; set; }
        public string Url { get; set; }
        public string FileName { get; set; }

        // Datos del usuario
        public string UserName { get; set; }
        public string UserLastname { get; set; }
        public string UserEmail { get; set; }

        // Otros datos que podrías necesitar, como la imagen convertida a Base64
        public string DocumentBase { get; set; }
    }

    public class DocumentRolIdEN
    {
        public int DocumentID { get; set; }
        public string Name { get; set; }
        public DateTime RegDate { get; set; }
        public string Review { get; set; }
        public int UserID { get; set; }
        public int TopicsID { get; set; }
        public string Url { get; set; }
        public string FileName { get; set; }
        public string ReviewJury { get; set; }
        public string DocumentBase { get; set; }
    }

    public class DocumentUserEN
    {
        // Datos del documento
        public int DocumentID { get; set; }
        public string Name { get; set; }
        public int review {  get; set; }
        public DateTime RegDate { get; set; }
        public int UserID { get; set; }
        public int TopicsID { get; set; }
        public string Url { get; set; }
        public string FileName { get; set; }
        public string status  { get; set; }
        public string DocumentBase { get; set; }
    }
}
