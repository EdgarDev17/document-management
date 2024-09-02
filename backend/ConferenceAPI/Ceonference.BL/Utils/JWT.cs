using Conference.Entities;
using Jose;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conference.BL.Utils
{
    public class JWT
    {
        private string input = "ConferenceAPI";

        public String encode(UserEN user)
        {
            byte[] secretKey = Encoding.ASCII.GetBytes(input);
            string token;
            try
            {
                token = Jose.JWT.Encode(createToken(user), secretKey, JwsAlgorithm.HS256);
            }
            catch (Exception)
            {
                throw;
            }
            return token;



        }

        public UserEN decode(String token)
        {
            UserEN user = new UserEN();

            try
            {
                byte[] secretKey = Encoding.ASCII.GetBytes(input);
                var tokenDecoded = Jose.JWT.Decode<TokenEN>(token, secretKey);
                user = createUserToken(tokenDecoded);
            }
            catch (Exception)
            {

                throw;
            }
            return user;
        }

        private TokenEN createToken(UserEN user)
        {
            TokenEN token = new TokenEN();
            try
            {
                token.UserID = user.UserID;
                token.email = user.email;
                token.Password = user.Password;
                token.ExpirationDate = user.TokenExpiration;
                token.completeProfile = user.completeProfile;
                token.countryID = user.countryID;
                token.State = user.state;
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex.InnerException);
            }
            return token;
        }

        private UserEN createUserToken(TokenEN pToken)
        {
            UserEN user = new UserEN();
            try
            {
                user.UserID = pToken.UserID;
                user.email = pToken.email;
                user.Password = pToken.Password;
                user.TokenExpiration = pToken.ExpirationDate;
                user.completeProfile = pToken.completeProfile;
                user.countryID = pToken.countryID;
                user.state = pToken.State;
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex.InnerException);
            }
            return user;
        }
    }
}
