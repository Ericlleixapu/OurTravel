const Travel = require('../models/travel.model');
const Destination = require('../models/destination.model');
const Journey = require('../models/journey.model');
const Hotel = require('../models/hotel.model');
const Activity = require('../models/activity.model');
const Image = require('../models/image.model');
const Document = require('../models/document.model');
const filesController = require('../controllers/files.controller');

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
        const travelId = req.params.travelId;
        const travel = await Travel.findById(travelId);

        if (travel == null) {
            res.status(404).send({ message: "Travel not found" });
        }

        if (travel.owner == req.userId) {
            await Destination.deleteMany({ travelId: travel._id });
            await Journey.deleteMany({ travelId: travel._id });
            await Hotel.deleteMany({ travelId: travel._id });
            await Activity.deleteMany({ travelId: travel._id });
            await Image.deleteMany({ travelId: travel._id });
            await Document.deleteMany({ travelId: travel._id });

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

exports.getAllPublicTravels = async (req, res) => {
    try {
        const travels = await Travel.find({ public: true })
            .populate({ path: 'owner', select: '-password -name -email -surname -travels -_id' })
            .select('-members -images -documents');
        res.status(200).send(travels);
    } catch (error) {
        res.status(500).send({ message: "Error fetching travels", error });
    }
}
exports.getPublicTravelByUser = async (req, res) => {
    try {
        const travels = await Travel.find({ public: true, followers: req.userId })
            .populate({ path: 'owner', select: '-password -name -email -surname -travels -_id' })
            .select('-members')
            .select('-images')
            .select('-documents');
        res.status(200).send(travels);
    } catch (error) {
        res.status(500).send({ message: "Error fetching travels", error });
    }
}
exports.getPublicTravelByCountry = async (req, res) => {
    try {
        const regex = new RegExp(req.params.country, 'i');
        const destinations = await Destination.find({ country: regex });
        const travels = await Travel.find({ _id: { $in: destinations.map(destination => destination.travelId) }, public: true })
            .populate({ path: 'owner', select: '-password -name -email -surname -travels -_id' })
            .select('-members')
            .select('-images')
            .select('-documents');
        res.status(200).send(travels);
    } catch (error) {
        res.status(500).send({ message: "Error fetching travels", error });
    }
}

exports.getPublicTravelById = async (req, res) => {
    try {
        const travel = await Travel.findOne({ _id: req.params.id, public: true })
            .populate({ path: 'owner', select: '-password -name -email -surname -travels -_id' })
            .select('-members')
            .select('-images')
            .select('-documents');
        travel.destinations = await Destination.find({ travelId: req.params.id }).sort({ dateFrom: 1 });
        travel.journeys = await Journey.find({ travelId: req.params.id }).populate('from').populate('to');
        travel.hotels = await Hotel.find({ travelId: req.params.id }).populate('destination');
        travel.activities = await Activity.find({ travelId: req.params.id }).populate('destination').sort({ date: 1 });
        res.status(200).send(travel);
    } catch (error) {
        res.status(500).send({ message: "Error fetching travels", error });
    }
}

exports.addFollowerToTravel = async (req, res) => {
    const userId = req.userId;
    try {
        let travel = await Travel.findOne({ _id: req.params.travelId, public: true });
        if (travel == null) {
            res.status(404).send({ message: "Travel not found" });
        } else {
            await Travel.findByIdAndUpdate(travel._id, { $addToSet: { followers: userId } }, { new: true });
            res.status(200).send({ message: "Follower added to travel successfully" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error adding the member", error });
    }
}

exports.removeFollowerToTravel = async (req, res) => {
    const userId = req.userId;
    try {
        let travel = await Travel.findOne({ _id: req.params.travelId });
        if (travel == null) {
            res.status(404).send({ message: "Travel not found" });
        } else {
            await Travel.findByIdAndUpdate(travel._id, { $pull: { followers: userId } }, { new: true });
            res.status(200).send({ message: "Follower removed from the travel successfully" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error adding the member", error });
    }
}
exports.changeVisibility = async (req, res) => {
    try {
        let travel = await Travel.findOne({ _id: req.params.travelId, owner: req.userId });
        if (travel == null) {
            res.status(401).send({ message: "Only the owner can change the visibility" });
        } else {
            await Travel.findByIdAndUpdate(travel._id, { $set: { public: !travel.public } }, { new: true });
            res.status(200).send({ message: "Visibility changed successfully" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error adding the member", error });
    }
}

exports.getTravelById = async (req, res) => {

    try {
        const travel = await Travel.findOne({ _id: req.params.id, members: req.userId }).populate({ path: 'members', select: '-password' });
        travel.destinations = await Destination.find({ travelId: travel._id }).sort({ dateFrom: 1 });
        travel.journeys = await Journey.find({ travelId: travel._id }).populate('from').populate('to').sort({ dateTimeFrom: 1, dateTimeTo: 1 });
        travel.hotels = await Hotel.find({ travelId: travel._id }).populate('destination').sort({ dateFrom: 1 });
        travel.activities = await Activity.find({ travelId: travel._id }).populate('destination').sort({ date: 1 });
        travel.images = await Image.find({ travelId: travel._id }).sort({ uploadedAt: 1 });
        travel.documents = await Document.find({ travelId: travel._id }).sort({ uploadedAt: 1 });
        res.status(200).send(travel);
    } catch (error) {
        res.status(500).send({ message: "Error fetching travels", error });
        console.log(error);
    }

};

exports.setTravelName = async (travelId) => {
    let travel = await Travel.findOne({ _id: travelId });
    let destinations = await Destination.find({ travelId: travel._id }).sort({ dateFrom: 1 });
    travel.dateFrom = destinations[0].dateFrom;
    travel.dateTo = destinations[destinations.length - 1].dateTo;

    if (destinations.length == 1) {
        if (travel.name == 'De moment enlloc') {
            travel.name = destinations[0].location + ' ' + travel.dateFrom.getFullYear();
        }
        travel.imageFile = destinations[0].imageFile;
    } else if (destinations.length > 1) {
        travel.name = destinations[0].country + ' ' + travel.dateFrom.getFullYear();

        const img = await filesController.setDestinationImage({ country: destinations[0].country, location: '' });
        travel.imageFile = img;
    }

    travel.save();
}

