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
