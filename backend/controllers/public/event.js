import { QueryTypes } from "sequelize";
import { sequelize } from "../../db/connection.js"; // Controller imports

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
    const events = await sequelize.query(
      `with eventorganiser as (select * from organisers) select l.id, l.name, l.description, l.genre, l.date, l.time, l.notificationDate, l.notificationTime, l.available, l.venue, l.meetLink, l.personalizedRegisteration, l.registerationLink, l.coverImage, l.reachUsAt, l.instagram, l.facebook, l.twitter, l.linkedin, r3.name as organiserCollege, r3.profilePic as organiserProfilePic, r3.coverPic as organiserCoverPic from  events as l left join eventorganiser as r3 on l.organiserId = r3.id;`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (!events) return res.status(404).json({ message: "No events found" });
    return res.status(200).json({ events: events });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getEvent = async (req, res) => {
  try {
    const event = await sequelize.query(
      `with eventorganiser as (select * from organisers) select l.id, l.name, l.description, l.genre, l.date, l.time, l.notificationDate, l.notificationTime, l.available, l.venue, l.meetLink, l.personalizedRegisteration, l.registerationLink, l.coverImage, l.reachUsAt, l.instagram, l.facebook, l.twitter, l.linkedin, r3.name as organiserCollege, r3.profilePic as organiserProfilePic, r3.coverPic as organiserCoverPic from  events as l left join eventorganiser as r3 on l.organiserId = r3.id where l.id = ${req.params.id}`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (!event) return res.status(404).json({ message: "Event not found" });
    return res.status(200).json({ event: event[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getEventListByOrganiser = async (req, res) => {
  try {
    const organiser = await Organiser.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (!organiser)
      return res.status(404).json({ message: "No such organiser found" });

    const events = await Event.findAll({
      where: {
        organiserId: organiser.id,
      },
    });

    if (!events) return res.status(404).json({ message: "No events found" });
    return res.status(200).json({ events: events });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export { getEventList, getEvent, getEventListByOrganiser };
