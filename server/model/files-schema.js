import mongoose from "mongoose";

const Schema = mongoose.Schema;
const UploadFiles = mongoose.model(
  "uploadFiles",
  new Schema({ length: { type: Number }, contentType: { type: String },filename:{type: String} }),
  "uploads.files"
);

const UploadChunks = mongoose.model(
  "uploadChunks",
  new Schema({ data: { type: Buffer },files_id:{type:mongoose.Types.ObjectId} }),
  "uploads.chunks"
);

export { UploadChunks, UploadFiles };