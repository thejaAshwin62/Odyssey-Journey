import Ship from "../models/ShipModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";
import multer from 'multer';
import cloudinary from 'cloudinary';

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware to handle image upload
const uploadMiddleware = upload.single('image');

// Cloudinary configuration (make sure to set up your Cloudinary credentials)
cloudinary.config({
  cloud_name: 'dglrrdx2u',
  api_key: '355391597932723',
  api_secret: '43ob25YR1O2ilJCLBQG5m6MlKJI'
});


export const createShips = async (req, res) => {
  uploadMiddleware(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    try {
      // if (!req.user || req.user.role !== 'admin') {
      //   return res.status(403).json({ message: 'Access denied. Admins only.' });
      // }
      console.log(req.user);


      const { name, capacity, pricePerHour, location } = req.body;
      req.body.createdBy = req.user.userId;

      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Upload image to Cloudinary
      const cloudinaryUpload = new Promise((resolve, reject) => {
        const cloudinaryStream = cloudinary.v2.uploader.upload_stream(
          {
            folder: 'ship_img',
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        cloudinaryStream.write(req.file.buffer);
        cloudinaryStream.end();
      });

      const cloudinaryResult = await cloudinaryUpload;

      const image = cloudinaryResult.secure_url;

      // Create service with image URL
      const ships = await Ship.create({
        name,
        capacity,
        pricePerHour,
        location,
        image
      });
      await ships.save();

      res.status(201).json({ message: 'Ships created successfully', ships });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
}
export const getAllShips = async (req, res) => {
  // No user-specific filtering; return all ships
  const ships = await Ship.find({});
  res.status(StatusCodes.OK).json({ ships });
};

export const getOneShip = async (req, res) => {
  const { id } = req.params;
  const ship = await Ship.findById(id);
  if (!ship) throw new NotFoundError(`No ships with id: ${id}`);

  res.status(StatusCodes.OK).json({ ship });
};

export const updateShip = async (req, res) => {
  const { id } = req.params;

  const updatedShip = await Ship.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedShip) throw new NotFoundError(`No ships with id: ${id}`);

  res.status(StatusCodes.OK).json({ msg: "Ship modified", updatedShip });
};

export const deleteShip = async (req, res) => {
  const { id } = req.params;
  const removedShip = await Ship.findByIdAndDelete(id);
  if (!removedShip) throw new NotFoundError(`No ships with id: ${id}`);

  res.status(StatusCodes.OK).json({ msg: "Ship deleted" });
};


