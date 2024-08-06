using Dapper;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Conference.Entities;

namespace Conference.DAL
{
    public class RatingDAL
    {
        private readonly Connection _connection;

        public RatingDAL(Connection _connection)
        {
            this._connection = _connection;
        }

        public int ManageRating(int UserConferenceID, int UserID, int TopicID, decimal Score, ref string message)
        {
            int result = 0;
            try
            {
                _connection.Cnn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("@p_UserConferenceID", UserConferenceID);
                parameters.Add("@p_UserID", UserID);
                parameters.Add("@p_TopicsID", TopicID);
                parameters.Add("@p_Score", Score);
                parameters.Add("@result", dbType: DbType.Int32, direction: ParameterDirection.Output);
                parameters.Add("@message", dbType: DbType.String, direction: ParameterDirection.Output);

                _connection.Cnn.Execute("sp_manage_score", parameters, commandType: CommandType.StoredProcedure);

                result = parameters.Get<int>("@result");
                message = parameters.Get<string>("@message");
            }
            catch (Exception ex)
            {
                // Console.WriteLine("Error: " + ex.Message);
                _connection.Cnn.Close();
                InsertErrorLogSession("Error en ManageRating en RatingDAL en sp_manage_score BD", ex.Message, UserID);
            }
            finally
            {
                _connection.Cnn.Close();
            }

            return result;
        }

        public void InsertErrorLogSession(string eventText, string message, int UserID)
        {
            try
            {
                _connection.Cnn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("p_UserID", UserID);
                parameters.Add("p_event", eventText);
                parameters.Add("p_message", message);

                _connection.Cnn.Execute("sp_insert_log", parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _connection.Cnn.Close();
            }
        }
    }
}
