using System.Data;
using Conference.Entities;
using Dapper;
using Image = SixLabors.ImageSharp.Image;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Formats.Png;

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
        int response = 0;
        Image newImg = null;
        string imagePath = string.Empty;
        string fileName = string.Empty;

        try
        {
            // Validar y procesar la imagen
            if (institution.Image != null && institution.Image.Length > 0)
            {
                var validExtensions = new List<string> { "JPG", "PNG", "JPEG" };
                // TODO: HACER QUE LA EXTENSION VENGA DESDE EL CLIENTE
                if (validExtensions.Contains("jpg".ToUpper()))
                {
                    
                    byte[] imageBytes = Convert.FromBase64String(institution.Image);

                    using (var ms = new MemoryStream(imageBytes))
                    using (var img = Image.Load(ms))
                    {
                        int width = 400;
                        int height = 250;

                        if (img.Height > img.Width)
                        {
                            width = 250;
                            height = 400;
                        }

                        newImg = img.Clone(x => x.Resize(width, height));

                        // TODO: HACER QUE LA EXTENSION VENGA DESDE EL CLIENTE
                        fileName = $"{Guid.NewGuid()}.{"jpg".ToLower()}";
                        string directory = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "InstitutionImages");
                        if (!Directory.Exists(directory))
                        {
                            Directory.CreateDirectory(directory);
                        }

                        imagePath = Path.Combine(directory, fileName);
                    }
                }
                else
                {
                    throw new ArgumentException("Invalid image format. Only JPG, PNG, and JPEG are allowed.");
                }
            }

            // Insertar datos en la base de datos
            using (var connection = _connection.Cnn)
            {
                connection.Open();

                var parameters = new DynamicParameters();
                parameters.Add("@p_name", institution.Name);
                parameters.Add("@p_website", institution.Website);
                parameters.Add("@p_contact_phone", institution.contact_phone);
                parameters.Add("@p_description", institution.Description);
                parameters.Add("@p_userID", userId);
                parameters.Add("@p_image_url", imagePath);
                parameters.Add("@p_image_name", fileName);
                parameters.Add("@p_institutionID", dbType: DbType.Int32, direction: ParameterDirection.Output);

                connection.Execute("sp_insert_institution", parameters, commandType: CommandType.StoredProcedure);

                response = parameters.Get<int>("@p_institutionID");

                // Si la inserción fue exitosa y tenemos una imagen, la guardamos
                if (response > 0 && newImg != null)
                {
                    SaveImage(newImg, imagePath, "JPG");
                }
            }
        }
        catch (FormatException ex)
        {
            Console.WriteLine($"Error en el formato Base64: {ex.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            _connection.Cnn.Close();
            throw;
        }
        finally
        {
            newImg?.Dispose();
        }
        

        return response;
    }
  
    private void SaveImage(Image image, string path, string extension)
    {
        switch (extension.ToLower())
        {
            case "png":
                image.Save(path, new PngEncoder());
                break;
            case "jpg":
            case "jpeg":
                image.Save(path, new JpegEncoder());
                break;
            default:
                throw new ArgumentException("Unsupported image format");
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
                UserID,
                image_url,
                image_name
            FROM institution 
            WHERE userID = @userId AND institutionID = @institutionId";

        var parameters = new
        {
            userID = userId,
            institutionID = institutionId
        };

        var currentInstitution = await _connection.Cnn.QuerySingleOrDefaultAsync<InstitutionDetailsEN>(query, parameters);
    
        
        if (currentInstitution == null)
        {
            throw new InvalidOperationException("Institution not found or user not authorized to update it");
        }
        
        string imageBase64 = ConvertFileToBase64(currentInstitution.image_url);

        currentInstitution.Image = imageBase64;

        return currentInstitution;
    }
    

    
    // tools
    public string ConvertFileToBase64(string filePath)
    {
        if (string.IsNullOrEmpty(filePath))
        {
            // Log the error
            Console.WriteLine($"Invalid file path or filename. Path: {filePath}");
            return null; // O podrías lanzar una excepción específica
        }

        try
        {
            if (!File.Exists(filePath))
            {
                Console.WriteLine($"File does not exist: {filePath}");
                return null; // O podrías lanzar una excepción específica
            }

            byte[] fileBytes = File.ReadAllBytes(filePath);
            return Convert.ToBase64String(fileBytes);
        }
        catch (Exception ex)
        {
            // Log the exception
            Console.WriteLine($"Error converting file to Base64: {ex.Message}");
            return null; // O podrías re-lanzar la excepción
        }
    }
}
