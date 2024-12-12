const Image = require('../models/image.model');
const User = require('../models/user.model');
const fs = require('fs');

exports.getImagesByTravel = async (req, res) => {
    try {
        const { travelId } = req.params;
        const images = await Image.find({ travelId }).sort({ uploadedAt: 1 });
        res.status(200).json(images);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error obtenint les destinacions' });
    }
};

exports.addImage = async (req, res) => {
    try {
        let image = new Image(req.body);
        image.owner = req.userId;
        const newImage = await image.save();
        res.status(201).json(newImage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error, message: 'Error afegint la destinació' });
    }
};
exports.addComment = async (req, res) => {
    try {
        let user = await User.findById(req.userId);
        let comment = user.alias + ' : ' + req.body.comment;
        let image = await Image.findByIdAndUpdate(req.params.id, { $push: { comments: comment } }, { new: true })
        res.status(201).send(image);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error, message: 'Error afegint el comentari' });
    }
};

exports.updateImage = async (req, res) => {
    try {
        const image = new Image(req.body);

        if (image._id == req.params.id) {
            const updatedImage = await Image.findByIdAndUpdate(image._id, image, { new: true });
            res.status(200).send({ message: "Image updated successfully", updatedImage });
        } else {
            res.status(500).send({ message: "Error updating image" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error updating image", error });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const imageId = req.params.id;
        const image = await Image.findById(imageId);

        if (image == null) {
            res.status(404).send({ message: "Image not found" });
        }

        await Image.deleteOne(image);
        fs.unlink('./uploads/images/' + image.filename, (err) => {
            if (err) throw err;
            console.log('image deleted');
        });
        res.status(201).send({ message: "Image removed successfully", image });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error eliminant la destinació' });
    }
};

