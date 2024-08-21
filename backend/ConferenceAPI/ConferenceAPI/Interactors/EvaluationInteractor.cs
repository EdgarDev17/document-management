using Conference.Entities;
using ConferenceAPI.Models;

namespace ConferenceAPI.Interactors
{
    public class EvaluationInteractor
    {
        public ResponseAPI responsePurchaseInteractor(ResponseEvaluationD _ResponseEvaluationD)
        {
            ResponseAPI response = new ResponseAPI();
            response._ResponseEvaluationD = _ResponseEvaluationD;

            return response;


        }
    }
}
