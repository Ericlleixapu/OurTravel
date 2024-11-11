const fs = require('fs');
const User = require('../models/user.model');


exports.uploadProfileImage = async (req, res) => {

  if (req.file) {
    let user = await User.findById(req.userId).select('-password');
    // Assuming that 'path/file.txt' is a regular file.
    if (user.profileImage) {
      fs.unlink('./uploads/profileImages/' + user.profileImage, (err) => {
        if (err) throw err;
        console.log('path/file.txt was deleted');
      });
    }
    user.profileImage = req.file.filename;
    await user.save();
    res.status(200).json({ message: 'Imagen subida con éxito', file: req.file.filename });
  } else {
    res.status(400).json({ error: 'Error al subir la imagen' });
  }
};

exports.getProfileImage = async (req, res) => {
  let profileImage = req.params.profileImage;


  fs.exists('./uploads/profileImages/' + profileImage, (exists) => {
    if (exists) {
      fs.createReadStream('./uploads/profileImages/' + profileImage).pipe(res);
    } else {
      res.status(404).send({ '404': '404' });
    }
  })
}
