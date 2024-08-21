using Conference.Entities;
using ConferenceAPI.Models;

namespace ConferenceAPI.Interactors
{
    public class UserInteractor
    {

        public IResponse createSuccessResponse(UserPerfilEN PerfilUser)
        {
            UserPerfilResponse response = new();
            try
            {

               
                response.UserID = PerfilUser.UserID;
                response.email = PerfilUser.email;
                response.name = PerfilUser.name;
                response.lastname = PerfilUser.lastname;
                response.birthdate = PerfilUser.birthdate;
                response.countryID = PerfilUser.countryID;
                response.countryName = PerfilUser.countryName;
                response.imagenBase = PerfilUser.imagenBase;
               






            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.InnerException);
            }

            return response;


        }
        
        
    }

}
