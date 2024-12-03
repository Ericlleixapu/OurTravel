const Hotel = require('../models/hotel.model');

exports.getHotelsByTravel = async (req, res) => {
    try {
        const { travelId } = req.params;
        const hotels = await Hotel.find({ travelId }).sort({ dateFrom: 1 });
        res.status(200).json(hotels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error obtenint les destinacions' });
    }
};

exports.addHotel = async (req, res) => {
    try {
        const hotel = new Hotel(req.body);
        const newHotel = await hotel.save();
        res.status(201).json(newHotel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error, message: 'Error afegint la destinació' });
    }
};

exports.updateHotel = async (req, res) => {
    try {
        const hotel = new Hotel(req.body);

        if (hotel._id == req.params.id) {
            const updatedHotel = await Hotel.findByIdAndUpdate(hotel._id, hotel, { new: true });
            res.status(200).send({ message: "Hotel updated successfully", updatedHotel });
        } else {
            res.status(500).send({ message: "Error updating hotel" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error updating hotel", error });
    }
};

exports.deleteHotel = async (req, res) => {
    try {
        const hotelId = req.params.id;
        const hotel = await Hotel.findById(hotelId);

        if (hotel == null) {
            res.status(404).send({ message: "Hotel not found" });
        }

        await Hotel.deleteOne(hotel);
        res.status(201).send({ message: "Hotel removed successfully", hotel });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error eliminant la destinació' });
    }
};

