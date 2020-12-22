import UploadService from "../services/UploadService";

export default class UsersAvatarController {
    async update(req, res) {
        const uploadService = new UploadService();

        const user = await uploadService.execute({
            id: req.user.id,
            avatarFilename: req.file.filename
        });

        res.json(user);
    }
}
