const Destination = require('../models/destination.model');
const countries = require('../data/countries.js');
const cities = require('../data/countries-cities.js');
const ImageController = require('../controllers/images.controller');

exports.getDestinationsByTravel = async (req, res) => {
    try {
        const { travelId } = req.params;
        const destinations = await Destination.find({ travelId }).sort({ dateFrom: 1 });
        res.status(200).json(destinations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error obtenint les destinacions' });
    }
};

exports.getCountryList = async (req, res) => {
    try {
        res.status(200).json(countries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error obtenint els paisos' });
    }
};

exports.getCityList = async (req, res) => {
    try {
        const country = cities.find(obj => obj.country == req.params.country);
        res.status(200).json(country.cities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error obtenint les ciutats' });
    }
};

exports.addDestination = async (req, res) => {
    try {
        const destination = new Destination(req.body);
        //const img = await ImageController.setDestinationImage(destination);
        //destination.imageUrl = "http://localhost:3000/api/image/destinationImage/"+ img;
        const newDestination = await destination.save();
        res.status(201).json(newDestination);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error, message: 'Error afegint la destinació' });
    }
};

exports.updateDestination = async (req, res) => {
    try {
        const destination = new Destination(req.body);

        if (destination._id == req.params.id) {
            const updatedDestination = await Destination.findByIdAndUpdate(destination._id, destination, { new: true });
            res.status(200).send({ message: "Destination updated successfully", updatedDestination });
        } else {
            res.status(500).send({ message: "Error updating destination" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error updating destination", error });
    }
};

exports.deleteDestination = async (req, res) => {
    try {
        const destinationId = req.params.id;
        const destination = await Destination.findById(destinationId);

        if (destination == null) {
            res.status(404).send({ message: "Destination not found" });
        }

        await Destination.deleteOne(destination);
        res.status(201).send({ message: "Destination removed successfully", destination });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error eliminant la destinació' });
    }
};

