const Travel = require('../models/travel.model');
exports.createTravel = async (req, res) => {
    try {
        let travel = new Travel();
        travel.owner = req.userId;
        travel.members = [];
        travel.members.push(req.userId);
        travel.createdAt = Date.now();
        travel.name = "De moment enlloc";

        await travel.save();
        res.status(201).send({ message: "Travel created successfully", travel });
    } catch (error) {
        res.status(500).send({ message: "Error creating travel", error });
    }
};

exports.removeTravel = async (req, res) => {
    try {
        travelId = req.params.travelId;
        const travel = await Travel.findById(travelId);

        if (travel == null) {
            res.status(404).send({ message: "Travel not found" });
        }

        if (travel.owner == req.userId) {
            await Travel.deleteOne(travel);
            res.status(201).send({ message: "Travel removed successfully", travel });

        }else{
            res.status(401).send({ message: "Unauthorized" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error removing travel", error });
    }
};
exports.createTravel = async (req, res) => {
    try {
        let travel = new Travel();
        travel.owner = req.userId;
        travel.members = [];
        travel.members.push(req.userId);
        travel.createdAt = Date.now();
        travel.name = "De moment enlloc";

        await travel.save();
        res.status(201).send({ message: "Travel created successfully", travel });
    } catch (error) {
        res.status(500).send({ message: "Error creating travel", error });
    }
};

exports.removeTravel = async (req, res) => {
    try {
        travelId = req.params.travelId;
        const travel = await Travel.findById(travelId);

        if (travel == null) {
            res.status(404).send({ message: "Travel not found" });
        }

        if (travel.owner == req.userId) {
            await Travel.deleteOne(travel);
            res.status(201).send({ message: "Travel removed successfully", travel });

        }else{
            res.status(401).send({ message: "Unauthorized" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error removing travel", error });
    }
};


exports.getAllTravels = async (req, res) => {
    try {
        const travels = await Travel.find({ owner: req.userId });
        res.status(200).send(travels);
    } catch (error) {
        res.status(500).send({ message: "Error fetching travels", error });
    }
};

