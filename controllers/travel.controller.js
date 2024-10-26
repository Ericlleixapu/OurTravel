const Travel = require('../models/travel.model');

exports.createTravel = async (req, res) => {
    try {
        const { name, destinations, dates } = req.body;
        const travel = new Travel({ name, destinations, dates, createdBy: req.userId });
        
        await travel.save();
        res.status(201).send({ message: "Travel created successfully", travel });
    } catch (error) {
        res.status(500).send({ message: "Error creating travel", error });
    }
};

exports.getAllTravels = async (req, res) => {
    try {
        const travels = await Travel.find({ createdBy: req.userId });
        res.status(200).send(travels);
    } catch (error) {
        res.status(500).send({ message: "Error fetching travels", error });
    }
};

exports.addDestination = async (req, res) => {
    try {
        const { destination } = req.body;
        const travel = await Travel.findByIdAndUpdate(
            req.params.travelId,
            { $push: { destinations: destination } },
            { new: true }
        );

        res.status(200).send({ message: "Destination added", travel });
    } catch (error) {
        res.status(500).send({ message: "Error adding destination", error });
    }
};

exports.addActivity = async (req, res) => {
    try {
        const { activity } = req.body;
        const travel = await Travel.findByIdAndUpdate(
            req.params.travelId,
            { $push: { activities: activity } },
            { new: true }
        );

        res.status(200).send({ message: "Activity added", travel });
    } catch (error) {
        res.status(500).send({ message: "Error adding activity", error });
    }
};