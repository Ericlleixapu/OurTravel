const Journey = require('../models/journey.model');

exports.getJourneysByTravel = async (req, res) => {
    try {
        const { travelId } = req.params;
        const journeys = await Journey.find({ travelId }).sort({ dateFrom: 1 }).populate('from').populate('to');
        res.status(200).json(journeys);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error obtenint les destinacions' });
    }
};

exports.addJourney = async (req, res) => {
    try {
        const journey = new Journey(req.body);
        const newJourney = await journey.save();
        res.status(201).json(newJourney);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error, message: 'Error afegint la destinació' });
    }
};

exports.updateJourney = async (req, res) => {
    try {
        const journey = new Journey(req.body);

        if (journey._id == req.params.id) {
            const updatedJourney = await Journey.findByIdAndUpdate(journey._id, journey, { new: true });
            res.status(200).send({ message: "Journey updated successfully", updatedJourney });
        } else {
            res.status(500).send({ message: "Error updating journey" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error updating journey", error });
    }
};

exports.deleteJourney = async (req, res) => {
    try {
        const journeyId = req.params.id;
        const journey = await Journey.findById(journeyId);

        if (journey == null) {
            res.status(404).send({ message: "Journey not found" });
        }

        await Journey.deleteOne(journey);
        res.status(201).send({ message: "Journey removed successfully", journey });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error eliminant la destinació' });
    }
};

