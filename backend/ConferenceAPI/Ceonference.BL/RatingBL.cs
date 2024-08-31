using Conference.DAL;
using Conference.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conference.BL
{
    public class RatingBL
    {
        private readonly RatingDAL ratingDAL;

        public RatingBL(RatingDAL ratingDAL)
        {
            this.ratingDAL = ratingDAL;
        }
        public int ManageRating(int UserID, int TopicID, decimal Score, ref string message)
        {
            int result = 0;

            result = this.ratingDAL.ManageRating(UserID,TopicID,Score,ref message);

            return result;
        }

        public PromedioScoreEN ScoreTopicsPromedio(int TopicID, int userId)
        {

            PromedioScoreEN Score = new PromedioScoreEN();

           Score= this.ratingDAL.ScoreTopicsPromedio(TopicID, userId);
            return Score;

        }

        public ScoreEN ScoreTopicsUser(int TopicID, int userId)
        {

            ScoreEN Score = new ScoreEN();

            Score = this.ratingDAL.ScoreTopicsUser(TopicID, userId);
            return Score;

        }

    }
}
