const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'./uploads/');
    },
    filename: function(req, file, cb) {
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, data + file.originalname );
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
    } else {
    cb(null, false);
}
};

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const imagensController = require('../controllers/imagens-controller');

router.post(
    '/:id_produto',
    login.obrigatorio, 
    upload.single('produto_imagem'), 
    imagensController.postImagem
);

router.get('/:id_produto', imagensController.getImagem)
router.delete('/:id_imagem', login.obrigatorio, imagensController.deleteImagem);

module.exports = router