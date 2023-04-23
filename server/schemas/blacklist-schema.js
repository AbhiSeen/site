import mongoose from "mongoose";

const BlackListSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId },
    expiredTokens: {
      type:Array,
    },
  },
  {
    collection: "BlackList",
  }
);

const BlackList = mongoose.model("BlackListSchema", BlackListSchema);

export default BlackList;
