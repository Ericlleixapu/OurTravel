const fs = require('fs');
const User = require('../models/user.model');
const Image = require('../models/image.model');
const Travel = require('../models/travel.model');
const https = require('https');
const request = require('request');
const path = require('path');

exports.uploadTravelImage = async (req, res) => {

  if (req.file) {
    res.status(200).json({ ok: true, message: 'Imagen subida con éxito', filename: req.file.filename, imageUrl: "http://localhost:3000/api/file/travelImage/" + req.file.filename });
  } else {
    res.status(400).json({ error: 'Error al subir la imagen' });
  }
};

exports.getTravelImage = async (req, res) => {
  let travelImage = req.params.travelImage;

  let image = await Image.findOne({ filename: travelImage });
  let travel = await Travel.findOne({ _id: image.travelId, members: req.userId });
  if (travel != null) {
    fs.exists('./uploads/images/' + travelImage, (exists) => {
      if (exists) {
        fs.createReadStream('./uploads/images/' + travelImage).pipe(res);
      } else {
        res.status(404).send({ '404': '404' });
      }
    })
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
}

exports.uploadTravelDocument = async (req, res) => {

  if (req.file) {
    res.status(200).json({ ok: true, message: 'Dcomento subido con éxito', filename: req.file.filename, documentUrl: "http://localhost:3000/api/file/travelImage/" + req.file.filename });
  } else {
    res.status(400).json({ error: 'Error al subir el Documento' });
  }
};

exports.getTravelDocument = async (req, res) => {
  let travelDocument = req.params.travelDocument;

  let image = await Image.findOne({ filename: travelDocument });
  let travel = await Travel.findOne({ _id: image.travelId, members: req.userId });
  if (travel != null) {
    fs.exists('./uploads/documents/' + travelDocument, (exists) => {
      if (exists) {
        fs.createReadStream('./uploads/documents/' + travelDocument).pipe(res);
      } else {
        res.status(404).send({ '404': '404' });
      }
    })
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
}

exports.uploadProfileImage = async (req, res) => {

  if (req.file) {
    let user = await User.findById(req.userId).select('-password');
    if (user.profileImage) {
      fs.unlink('./uploads/profileImages/' + user.profileImage, (err) => {
        if (err) throw err;
        console.log('path/file.txt was deleted');
      });
    }
    user.profileImage = req.file.filename;
    user.profileImageUrl = "http://localhost:3000/api/file/profileImage/" + user.profileImage;
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

  fs.exists('./uploads/destinations/' + destinationImage, (exists) => {
    if (exists) {
      fs.createReadStream('./uploads/destinations/' + destinationImage).pipe(res);
    } else {
      res.status(404).send({ '404': '404' });
    }
  })
}


const apiKey = 'AIzaSyC9I6QsbPJLoIfVXx3V4kywGLxsYblbrhU';
const searchEngineId = 'a5e4686f379c243b5';

exports.setDestinationImage = (destination) => {
  const query = destination.country + '%20' + destination.location;

  return new Promise((resolve, reject) => {

    const folder = path.join(__dirname, '../uploads/destinations/');
    let filename = destination.country + '-' + destination.location

    if (fs.existsSync(folder + filename + '.jpeg')) {
      console.log('Image already exists');
      resolve(filename + '.jpeg');
    } else {
      https.get(
        `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&searchType=image&q=${query}`,
        (res) => {
          let data = '';

          res.on('data', (chunk) => {
            data += chunk;
          });

          res.on('end', async () => {
            try {
              const jsonData = JSON.parse(data);

              if (!jsonData.items || jsonData.items.length === 0) {
                return reject(new Error('No se encontraron imágenes para este destino'));
              }

              const imgItem = jsonData.items[0];
              const format = imgItem.fileFormat.split('/')[1];
              filename = filename + '.' + format;

              download(imgItem.link, folder + filename, () => {
                resolve(filename);
              });
            } catch (err) {
              reject(new Error('Error analizando el JSON: ' + err.message));
            }
          });
        }
      ).on('error', (err) => {
        reject(new Error('Error con la petición HTTPS: ' + err.message));
      });
    }
  });
};

const download = (uri, filename, callback) => {
  request.head(uri, (err, res, body) => {
    if (err) {
      console.error('Error al descargar la imagen:', err.message);
      return callback(err);
    }
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};
