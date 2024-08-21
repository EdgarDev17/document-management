using Conference.DAL;
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
        public int ManageRating(int UserConferenceID, int UserID, int TopicID, decimal Score, ref string message)
        {
            int result = 0;

            result = this.ratingDAL.ManageRating(UserConferenceID,UserID,TopicID,Score,ref message);

            return result;
        }
    }
}
