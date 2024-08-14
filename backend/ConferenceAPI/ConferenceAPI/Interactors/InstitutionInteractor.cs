using Conference.Entities;
using ConferenceAPI.Models;

namespace ConferenceAPI.Interactors
{
    public class InstitutionInteractor
    {
        public IResponse createSuccessResponse(List<InstitutionDetailsEN> institutionDetailsList)
        {
            InstitutionsResponse response = new();
            try
            {
                response.Institutions = institutionDetailsList;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.InnerException);
            }

            return response;
        }
    }
}