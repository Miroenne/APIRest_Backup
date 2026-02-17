const { name } = require('ejs');
const {storage} = require('../middlewares/files-storage');
const File = require('../models/file');
const fs = require('fs');


exports.createOneFile = (req, res, next) => {
    const file = new File({
        name: req.file.originalname,
        description : req.body.description,
        fileUrl: '${req.protocol}://localhost:3000/uploads/${req.file.filename}',
        userId: req.body.userId
    });

    file.save()
        .then(() => res.status(201).json({message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({error}));
};

exports.getOneFile = (req, res, next) => {
    File.findOne({_id: req.params.id})
    .then((file) => res.status(200).json(file))
    .catch(error => res.status(404).json({error}));
};

exports.modifyOneFile = (req, res, next) => {

    const file = new File({
        name: req.file.originalname,
        description : req.body.description,
        fileUrl: '${req.protocol}://localhost:3000/uploads/${req.file.filename}',
        userId: req.body.userId
    });

    Fileile.findOne({_id: req.params.id})
        .then((thing) => {
            if(file.userId == thing.userId){
                File.updateOne({_id: req.params.id}, {...file, _id: req.params.id})
                .then(()=> res.status(200).json({message: 'Objet modifié !'}))
                .catch(error => res.status(400).json({error}));
            }
        })
        .catch((error) => {
            res.status(400).json({error});
        });
}

exports.deleteOneFile = (req, res, next) => {
    File.findOne({_id: req.body.id})
    .then((file) => {
        const filename = file.fileUrl.split('/uploads/')[1];
        fs.unlink(`uploads/${filename}`, () => {
            File.deleteOne({_id: req.body.id})
            .then(() => res.status(200).json({message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({error}));
        });
    })
    .catch(error => res.status(500).json({error}));
};