import File from "../models/File.js";

class FilesController {
  async create(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({ name, path });

// Lá no upload.single pôe uma propriedade chamada file
    return res.json(file);
  }
}

export default new FilesController();
