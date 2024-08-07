using Conference.Entities;
using ConferenceAPI.Models;

namespace ConferenceAPI.Interactors
{
    public class SessionsInteractor
    {
        public IResponse createSuccessResponse(UserEN pPersonAuthenticated)
        {
            SessionsResponse response = new SessionsResponse();
            try
            {

                response.token = pPersonAuthenticated.CurrentToken;
                response.UserID = pPersonAuthenticated.UserID;
                response.email = pPersonAuthenticated.email;







            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.InnerException);
            }

            return response;
        }
    }
}
