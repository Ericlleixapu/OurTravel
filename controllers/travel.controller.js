const Travel = require('../models/travel.model');
const Destination = require('../models/destination.model');
const Journey = require('../models/journey.model');
const Hotel = require('../models/hotel.model');
const Activity = require('../models/activity.model');

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

        } else {
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

        } else {
            res.status(401).send({ message: "Unauthorized" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error removing travel", error });
    }
};


exports.getAllTravels = async (req, res) => {
    try {
        const travels = await Travel.find({ members: req.userId }).populate({ path: 'members', select: '-password' });
        res.status(200).send(travels);
    } catch (error) {
        res.status(500).send({ message: "Error fetching travels", error });
    }

};

exports.addMemberToTravel = async (req, res) => {

    const user = req.body;
    try {
        let travel = await Travel.findOne({ _id: req.params.travelId, members: req.userId }).populate({ path: 'members', select: '-password' });
        if (travel == null) {
            res.status(404).send({ message: "Travel not found" });
        } else {
            travel = await Travel.findByIdAndUpdate(travel._id, { $addToSet: { members: user._id } }, { new: true }).populate({ path: 'members', select: '-password' });
            res.status(200).send({ message: "Member added to travel successfully", travel });
        }
    } catch (error) {
        res.status(500).send({ message: "Error adding the member", error });
    }

};

exports.removeMemberToTravel = async (req, res) => {

    const user = req.body;
    try {
        let travel = await Travel.findOne({ _id: req.params.travelId, members: req.userId }).populate({ path: 'members', select: '-password' });

        if (user._id == travel.owner) {
            res.status(401).send({ message: "Owner cannot be removed" });
        } else {
            if (travel == null) {
                res.status(404).send({ message: "Travel not found" });
            } else {
                const travel = await Travel.findByIdAndUpdate(
                    req.params.travelId,
                    { $pull: { members: user._id } },
                    { new: true }
                ).populate({ path: 'members', select: '-password' });
                res.status(200).send({ message: "Member added to travel successfully", travel });
            }
        }
    } catch (error) {
        res.status(500).send({ message: "Error adding the member", error });
    }

};

exports.getTravelById = async (req, res) => {

    try {
        const travel = await Travel.findOne({ _id: req.params.id, members: req.userId }).populate({ path: 'members', select: '-password' });
        travel.destinations = await Destination.find({ travelId: travel._id }).sort({ dateFrom: 1 });
        travel.journeys = await Journey.find({ travelId: travel._id }).sort({ dateTimeFrom: 1, dateTimeTo: 1 });
        travel.hotels = await Hotel.find({ travelId: travel._id }).sort({ dateFrom: 1 });
        travel.activities = await Activity.find({ travelId: travel._id }).sort({ date: 1 });
        res.status(200).send(travel);
    } catch (error) {
        res.status(500).send({ message: "Error fetching travels", error });
        console.log(error);
    }

};

