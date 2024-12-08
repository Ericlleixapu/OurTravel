const Image = require('../models/image.model');

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
        res.status(201).send({ message: "Image removed successfully", image });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error eliminant la destinació' });
    }
};

