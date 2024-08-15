using Conference.DAL;
using Conference.BL.Utils;
using Conference.Entities;
using Microsoft.Extensions.Options;


namespace Conference.BL;

public class InstitutionBL
{
    
    private readonly InstitutionDAL _institutionDal;
 
    public InstitutionBL(InstitutionDAL institutionDal)
    {
        _institutionDal = institutionDal;
    }            
    
    public async Task<List<InstitutionDetailsEN>> GetInstitutionsByUserAsync(int userId)
    {
        try
        {
            return await _institutionDal.GetInstitutionsByUserAsync(userId);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            throw; // Re-lanzar la excepción para que el controlador pueda manejarla
        }
    }

    public int CreateInstitutionByUser(int userId, InstitutionDetailsEN institution)
    {
        return _institutionDal.InsertNewInstitutionByUser(userId, institution);
    }

    public async Task<int> DeleteInstitutionById(int userId, int institutionId)
    {
        return await _institutionDal.DeleteInstitutionById(userId, institutionId);
    }

    public async Task<InstitutionDetailsEN> UpdateInstitutionById(int userId, InstitutionDetailsEN institution)
    {
        return await _institutionDal.UpdateInstitutionById(userId, institution);
    }
    
    public async Task<InstitutionDetailsEN> GetInstitutionById(int userId, int institutionId)
    {
        return await _institutionDal.GetInstitutionById(userId, institutionId);
    }
}