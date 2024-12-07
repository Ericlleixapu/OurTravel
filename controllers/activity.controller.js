const Activity = require('../models/activity.model');

exports.getActivitiesByTravel = async (req, res) => {
    try {
        const { travelId } = req.params;
        const activities = await Activity.find({ travelId }).sort({ date: 1 }).populate('destination');
        res.status(200).json(activities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error obtenint les destinacions' });
    }
};

exports.addActivity = async (req, res) => {
    try {
        const activity = new Activity(req.body);
        const newActivity = await activity.save();
        res.status(201).json(newActivity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error, message: 'Error afegint la destinació' });
    }
};

exports.updateActivity = async (req, res) => {
    try {
        const activity = new Activity(req.body);

        if (activity._id == req.params.id) {
            const updatedActivity = await Activity.findByIdAndUpdate(activity._id, activity, { new: true });
            res.status(200).send({ message: "Activity updated successfully", updatedActivity });
        } else {
            res.status(500).send({ message: "Error updating activity" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error updating activity", error });
    }
};

exports.deleteActivity = async (req, res) => {
    try {
        const activityId = req.params.id;
        const activity = await Activity.findById(activityId);

        if (activity == null) {
            res.status(404).send({ message: "Activity not found" });
        }

        await Activity.deleteOne(activity);
        res.status(201).send({ message: "Activity removed successfully", activity });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error eliminant la destinació' });
    }
};

