// Controller imports

// Middleware imports

// Model imports
import Event from "../../db/models/events.js";
import Organiser from "../../db/models/organisers.js";

const getEventList = async (req, res) => {
  try {
    let where = new Object();
    if (req.body.college) {
      where.college = req.query.college;
    }
    if (req.body.collegeLocation) {
      where.collegeLocation = req.query.collegeLocation;
    }
    if (req.body.category) {
      where.category = req.query.category;
    }
    if (req.body.organiser) {
      where.organiser = req.query.organiser;
    }
    const events = await Event.findAll({
      where,
      raw: true,
      include: {
        model: Organiser,
        as: "organiser",
        attributes: {
          exclude: ["password"],
        },
      },
      nest: true,
    });
    if (!events) return res.status(404).json({ message: "No events found" });
    return res.status(200).json({ events: events });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getEvent = async (req, res) => {
  try {
    const event = await Event.findOne({
      where: { id: req.params.id },
      raw: true,
      include: {
        model: Organiser,
        as: "organiser",
        attributes: {
          exclude: ["password"],
        },
      },
      nest: true,
    });
    if (!event) return res.status(404).json({ message: "Event not found" });
    return res.status(200).json({ event: event });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export { getEventList, getEvent };
