import DatauriParser from "datauri/parser.js";
import path from "path";
import multer from "multer";

const memstorage = multer.memoryStorage();

var uploadFile = multer({ memstorage }).single("image");

const parser = new DatauriParser();

const dataUri = (req) =>
  parser.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  );

export { uploadFile, dataUri };
