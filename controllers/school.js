const School = require("../models/school");

exports.addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (
      !name ||
      !address ||
      typeof latitude !== "number" ||
      typeof longitude !== "number"
    ) {
      return res.status(400).send({ message: "Invalid input data." });
    }

    const school = await School.create({ name, address, latitude, longitude });
    res.status(201).send(school);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      return res
        .status(400)
        .send({ message: "Latitude and Longitude must be valid numbers." });
    }

    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      return res.status(400).send({
        message:
          "Latitude must be between -90 and 90, Longitude must be between -180 and 180.",
      });
    }

    const schools = await School.findAll();
    const sortedSchools = schools.sort((a, b) => {
      const distA = Math.sqrt(
        Math.pow(a.latitude - lat, 2) + Math.pow(a.longitude - lon, 2)
      );
      const distB = Math.sqrt(
        Math.pow(b.latitude - lat, 2) + Math.pow(b.longitude - lon, 2)
      );
      return distA - distB;
    });

    res.status(200).send(sortedSchools);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
