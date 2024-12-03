const fs = require('fs');
const https = require('https');
const request = require('request');
const path = require('path');
const User = require('../models/user.model');
const Image = require('../models/image.model');


const apiKey = 'AIzaSyC9I6QsbPJLoIfVXx3V4kywGLxsYblbrhU';
const searchEngineId = 'a5e4686f379c243b5';
const imgSize = '';

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
      user.profileImageUrl = "http://localhost:3000/api/image/profileImage/" + user.profileImage;
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

  exports.getDestinationImage = async (req, res) => {
    let destinationImage = req.params.destinationImage;
  
    fs.exists('./uploads/images/' + destinationImage, (exists) => {
      if (exists) {
        fs.createReadStream('./uploads/images/' + destinationImage).pipe(res);
      } else {
        res.status(404).send({ '404': '404' });
      }
    })
  }


  

exports.setDestinationImage = async (destination) => {

    const query = destination.country + '%20' + destination.location;
    
    https.get('https://www.googleapis.com/customsearch/v1?key='+ apiKey +'&cx='+ searchEngineId +'&searchType=image&q=' + destination.country + '%20' + destination.location, (res) => {
        let data = '';
        // Recull les dades a mesura que arriben
        res.on('data', (chunk) => {
            data += chunk;
        });

        // Quan finalitza la resposta
        res.on('end', () => {
            try {
                const jsonData = JSON.parse(data);
                const  imgItem = jsonData.items[0];
                const format = imgItem.fileFormat.split("/")[1];
                const filename = Date.now() + '.' + format;
                const folder = path.join(__dirname, '../uploads/images/');
                return download(jsonData.items[0].link, folder + filename, function () {
                    return folder + filename;
                });

            } catch (err) {
                console.error('Error analitzant el JSON:', err.message);
            }
        });
    }).on('error', (err) => {
        console.error('Error amb la petició HTTPS:', err.message);
    });

}

var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};


