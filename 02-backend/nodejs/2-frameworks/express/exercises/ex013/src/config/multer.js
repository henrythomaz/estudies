import multer from "multer";
import crypto from "crypto";
import { dirname, extname, resolve } from "path";
import { fileURLToPath } from "url";
import { log } from "console";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// files
// aws s3
// digital ocean spaces
// google
// ms

console.log(resolve(__dirname, "..", "..", "..", "tmp", "uploads"));

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, "..", "..", "tmp", "uploads"),
    filename: (_req, file, callback) => {
      // Nome do arquivo: FOTO da XUXA.jpg => dsaidjsapdjpasjdpasjdpseucu.jpg
      crypto.randomBytes(16,(err, res) => {
        if (err) return callback(err);

        return callback(null, res.toString("hex") + extname(file.originalname));
        
      });
    },
  }),
};
