import multer from "multer"
import { v4 as uuidv4 } from 'uuid';

const fileUpload = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cp) => {
            cp(null, './Users_Resumes')
        },
        filename: (req, file, cp) => {
            cp(null, `${uuidv4()}-${file.originalname}`)
        },
    })

    const upload = multer({storage});
    return upload
}

const fileUploadHost = () => {
    const storage = multer.diskStorage({})
    const upload = multer({storage});
    return upload
}

export {
    fileUpload,
    fileUploadHost
}