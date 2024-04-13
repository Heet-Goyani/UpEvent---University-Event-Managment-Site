// Controller imports

// Middleware imports

// Model imports
import Event from "../../db/models/events.js";

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
    const events = await Event.findAll({ where, raw: true });
    if (!events) return res.status(404).json({ message: "No events found" });
    return res.status(200).json({ events: events });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ where: { id: req.params.id } });
    if (!event) return res.status(404).json({ message: "Event not found" });
    return res.status(200).json({ event: event });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export { getEventList, getEvent };
