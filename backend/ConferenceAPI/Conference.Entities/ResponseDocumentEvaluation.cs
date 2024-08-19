using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conference.Entities
{
    public class ResponseDocumentEvaluation
    {
       
        public string? aspect { get; set; }
        public string? criterionDescription { get; set; }
        public string? scale { get; set; }
        public string? scaleDescription { get; set; }
      
       
    }
    public class ResponseDocumentVeredict
    {
        public string veredict { get; set; }
    }

    public class DocumentEvaluationDetails
    {
        public List<ResponseDocumentEvaluation> Evaluations { get; set; }
        public ResponseDocumentVeredict Veredict { get; set; }
    }

}
