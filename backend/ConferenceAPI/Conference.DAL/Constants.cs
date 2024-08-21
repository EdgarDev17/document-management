using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System;

namespace Conference.DAL
{
   public class Constants
    {
        private readonly IConfiguration _configuration;

        public Constants(IConfiguration configuration)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public string GetConnectionString()
        {
            var connectionString = _configuration.GetConnectionString("ConferenceBD");
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new InvalidOperationException("La cadena de conexión 'ConferenceBD' no está configurada.");
            }
            return connectionString;
        }
    }
}
