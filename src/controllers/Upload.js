import multer from 'multer';
import { Upload } from './../configs';
import { Media } from './../models';
import { getErrorMessage } from './Error';

let myUpload = multer({ dest: Upload.image.dest }).single('image');

class UploadController {

    /**
     * @api {post} /api/v1/upload Upload image
     * @apiGroup Media
     * @apiPermission auth
     * @apiParam {File} image Image file
     * @apiSuccess {String} url Image url
     * @apiVersion 1.0.0
     */
    upload(req, res) {

        myUpload(req, res, (err) => {
            if (err) {
                // An error occurred when uploading
                return res.status(400).send(err);
            }

            const name = req.file.originalname;

            const path = `${Upload.image.link + req.file.filename}`;

            const media = new Media({
                path: path,
                name: name,
                userId: req.auth.id
            });
            media.save().then(response => {
                return res.json({ url: path });
            }, error => {
                return res.status(400).send({
                    message: getErrorMessage(error)
                });
            });
        });
    }
}

export default new UploadController();