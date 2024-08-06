using Microsoft.AspNetCore.Http;

namespace Conference.BL.Utils
{
    public class LocalFileSaver
    {
        public static string SaveLocalFile(string RequestScheme,string RequestHost, string container,string folder, IFormFile file)
        {
            var extension = Path.GetExtension(file.FileName);
            var fileName = $"{Guid.NewGuid()}{extension}";

            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }

            string path = Path.Combine(folder, fileName);

            using(var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                var contain = memoryStream.ToArray();
                File.WriteAllBytes(path, contain);
            }

            // Para devolver ruta al cliente
            //var currentURL = $"{RequestScheme}://{RequestHost}";
            //var pathDB = Path.Combine(currentURL, container, fileName).Replace("\\", "/");

            //var pathDB = Path.Combine(path,container,fileName).Replace("\\", "/");

            return path;
        }
    }
}
