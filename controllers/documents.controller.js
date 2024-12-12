const Document = require('../models/document.model');
const fs = require('fs');

exports.getDocumentsByTravel = async (req, res) => {
    try {
        const { travelId } = req.params;
        const documents = await Document.find({ travelId }).sort({ uploadedAt: 1 });
        res.status(200).json(documents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error obtenint les destinacions' });
    }
};

exports.addDocument = async (req, res) => {
    try {
        let document = new Document(req.body);
        document.owner = req.userId;
        const newDocument = await document.save();
        res.status(201).json(newDocument);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error, message: 'Error afegint la destinació' });
    }
};

exports.updateDocument = async (req, res) => {
    try {
        const document = new Document(req.body);

        if (document._id == req.params.id) {
            const updatedDocument = await Document.findByIdAndUpdate(document._id, document, { new: true });
            res.status(200).send({ message: "Document updated successfully", updatedDocument });
        } else {
            res.status(500).send({ message: "Error updating document" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error updating document", error });
    }
};

exports.deleteDocument = async (req, res) => {
    try {
        const documentId = req.params.id;
        const document = await Document.findById(documentId);

        if (document == null) {
            res.status(404).send({ message: "Document not found" });
        }

        await Document.deleteOne(document);
        fs.unlink('./uploads/documents/' + document.filename, (err) => {
            if (err) throw err;
            console.log('document deleted');
        });
        res.status(201).send({ message: "Document removed successfully", document });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error eliminant la destinació' });
    }
};

