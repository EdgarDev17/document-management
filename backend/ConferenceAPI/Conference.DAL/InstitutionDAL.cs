using System.Data;
using Conference.Entities;
using Dapper;

namespace Conference.DAL;

public class InstitutionDAL
{
    private readonly Connection _connection;

    public InstitutionDAL(Connection connection)
    {
        _connection = connection;
    }

    public async Task<List<InstitutionDetailsEN>> GetInstitutionsByUserAsync(int userId)
    {
        try
        {
            const string sql = @"
            SELECT 
                InstitutionID, 
                Name, 
                Website, 
                contact_phone, 
                Description, 
                UserID 
            FROM institution 
            WHERE userID = @UserId";

            var institutions = await _connection.Cnn.QueryAsync<InstitutionDetailsEN>(sql, new { UserId = userId });
            return institutions.ToList();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            throw; // Re-lanzar la excepción para que el llamador pueda manejarla
        }
        finally
        {
            if (_connection.Cnn.State == ConnectionState.Open)
            {
                await _connection.Cnn.CloseAsync();
            }
        }
    }

    public int InsertNewInstitutionByUser(int userId, InstitutionDetailsEN institution)
    {
        try
        {
            _connection.Cnn.Open();

            // Define la consulta de inserción
            string query = @"
            INSERT INTO institution 
            (Name, Website, contact_phone, Description, UserID)  
            VALUES (@Name, @Website, @contact_phone, @Description, @UserID);   
            SELECT LAST_INSERT_ID();";  // Esto devolverá el ID del registro insertado

            // Ejecuta la consulta usando Dapper
            int newInstitutionId = _connection.Cnn.QuerySingle<int>(query, new
            {
                institution.Name,
                institution.Website,
                institution.contact_phone,
                institution.Description,
                UserID = userId
            });

            return newInstitutionId;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task<int> DeleteInstitutionById(int userId, int institutionId)
    {
        try
        {
            await _connection.Cnn.OpenAsync();

            string query = @"
                DELETE FROM institution 
                WHERE institutionID = @InstitutionId AND userID = @UserId;
                SELECT ROW_COUNT();";

            int rowsAffected = await _connection.Cnn.QuerySingleAsync<int>(query, new
            {
                InstitutionId = institutionId,
                UserId = userId
            });

            return rowsAffected;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
        finally
        {
            if (_connection.Cnn.State == ConnectionState.Open)
            {
                await _connection.Cnn.CloseAsync();
            }
        }
    }

    public async Task<InstitutionDetailsEN> UpdateInstitutionById(int userId, InstitutionDetailsEN institution)
    {
        try
        {
            await _connection.Cnn.OpenAsync();

            string query = @"
            UPDATE institution 
            SET Name = @Name, 
                Website = @Website, 
                contact_phone = @contact_phone, 
                Description = @Description,
                DateModified = @DateModified
            WHERE institutionID = @InstitutionId AND userID = @UserId;
            
            SELECT * FROM institution 
            WHERE institutionID = @InstitutionId AND userID = @UserId;";

            var parameters = new
            {
                institution.Name,
                institution.Website,
                institution.contact_phone,
                institution.Description,
                DateModified = DateTime.UtcNow,
                InstitutionId = institution.InstitutionID,
                UserId = userId
            };

            var updatedInstitution = await _connection.Cnn.QuerySingleOrDefaultAsync<InstitutionDetailsEN>(query, parameters);

            if (updatedInstitution == null)
            {
                throw new InvalidOperationException("Institution not found or user not authorized to update it");
            }

            return updatedInstitution;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
        finally
        {
            if (_connection.Cnn.State == ConnectionState.Open)
            {
                await _connection.Cnn.CloseAsync();
            }
        }
    }

    public async Task<InstitutionDetailsEN> GetInstitutionById(int userId, int institutionId)
    {
        await _connection.Cnn.OpenAsync();
        const string query = @"
            SELECT 
                InstitutionID, 
                Name, 
                Website, 
                contact_phone, 
                Description, 
                UserID 
            FROM institution 
            WHERE userID = @userId AND institutionID = @institutionId";

        var parameters = new
        {
            userID = userId,
            institutionID = institutionId,
        };

        var institution = await _connection.Cnn.QuerySingleOrDefaultAsync<InstitutionDetailsEN>(query, parameters);

        
        if (institution == null)
        {
            throw new InvalidOperationException("Institution not found or user not authorized to update it");
        }

        return institution;
    }
}
