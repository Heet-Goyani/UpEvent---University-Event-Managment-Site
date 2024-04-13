import { QueryTypes } from "sequelize";
import { sequelize } from "../../db/connection.js";
// Controller imports

// Middleware imports

// Model imports
import registerEvent from "../../db/models/registerEvents.js";
import bookmarkEvent from "../../db/models/bookmarkEvents.js";
import Event from "../../db/models/events.js";

const Register = async (req, res) => {
  try {
    const eventId = req.params.id;
    const exists = await Event.findOne({ where: { id: eventId } });
    if (!exists)
      return res
        .status(404)
        .json({ status: false, message: "Event not found" });
    const old = await registerEvent.findOne({
      where: { eventId, userId: req.user.id },
    });
    if (old) {
      let removeRegister = await registerEvent.destroy({
        where: { eventId, userId: req.user.id },
      });
      if (!removeRegister) {
        return res
          .status(400)
          .json({ message: "Event not removed from registered" });
      }
      return res.status(200).json({ message: "Event removed from registered" });
    }

    const newRegister = await registerEvent.create({
      eventId,
      userId: req.user.id,
    });
    if (!newRegister) {
      return res.status(400).json({ message: "Event not registered" });
    }
    return res.status(201).json({ message: "Event registered" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const Bookmark = async (req, res) => {
  try {
    const eventId = req.params.id;
    const exists = await Event.findOne({ where: { id: eventId } });
    if (!exists)
      return res
        .status(404)
        .json({ status: false, message: "Event not found" });
    const old = await bookmarkEvent.findOne({
      where: { eventId, userId: req.user.id },
    });
    if (old) {
      let removeBookmark = await bookmarkEvent.destroy({
        where: { eventId, userId: req.user.id },
      });
      if (!removeBookmark) {
        return res
          .status(400)
          .json({ message: "Event not removed from bookmark" });
      }
      return res.status(200).json({ message: "Event removed from bookmark" });
    }

    const newBookmark = await bookmarkEvent.create({
      eventId,
      userId: req.user.id,
    });
    if (!newBookmark) {
      return res.status(400).json({ message: "Event not bookmarked" });
    }
    return res.status(201).json({ message: "Event bookmarked" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getEventDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.id;
    const event = await sequelize.query(
      `with userregisteredevents as (select * from registerevents where userId = ${userId}), userbookmarkedevents as ( select * from bookmarkevents where userId = ${userId}) select l.id, case when r1.eventId is not null then True else False end as registered, case when r2.eventId is not null then True else False end as bookmarked from  events as l left join userregisteredevents as r1 on l.id = r1.eventId left join userbookmarkedevents as r2 on l.id = r2.eventId where l.id = ${eventId};`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (!event) return res.status(404).json({ message: "Event not found" });
    return res.status(200).json({ event: event });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllEventList = async (req, res) => {
  try {
    const userId = req.user.id;
    const events = await sequelize.query(
      `with userregisteredevents as (select * from registerevents where userId = ${userId}), userbookmarkedevents as ( select * from bookmarkevents where userId = ${userId}) select l.id, case when r1.eventId is not null then True else False end as registered, case when r2.eventId is not null then True else False end as bookmarked from  events as l left join userregisteredevents as r1 on l.id = r1.eventId left join userbookmarkedevents as r2 on l.id = r2.eventId;`,
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

const getRegisteredEventList = async (req, res) => {
  try {
    const userId = req.user.id;
    const events = await sequelize.query(
      `with userregisteredevents as (select * from registerevents where userId = ${userId}), userbookmarkedevents as ( select * from bookmarkevents where userId = ${userId}) select l.id, case when r1.eventId is not null then True else False end as registered, case when r2.eventId is not null then True else False end as bookmarked from  events as l left join userregisteredevents as r1 on l.id = r1.eventId left join userbookmarkedevents as r2 on l.id = r2.eventId where (case when r1.eventId is not null then True else False end) = True;`,
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

const getBookmarkedEventList = async (req, res) => {
  try {
    const userId = req.user.id;
    const events = await sequelize.query(
      `with userregisteredevents as (select * from registerevents where userId = ${userId}), userbookmarkedevents as ( select * from bookmarkevents where userId = ${userId}) select l.id, case when r1.eventId is not null then True else False end as registered, case when r2.eventId is not null then True else False end as bookmarked from  events as l left join userregisteredevents as r1 on l.id = r1.eventId left join userbookmarkedevents as r2 on l.id = r2.eventId where (case when r2.eventId is not null then True else False end) = True;`,
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

const isRegistered = async (req, res) => {
  try {
    const eventId = req.params.id;
    const exists = await Event.findOne({ where: { id: eventId } });
    if (!exists)
      return res
        .status(404)
        .json({ status: false, message: "Event not found" });
    const event = await registerEvent.findOne({
      where: { eventId, userId: req.user.id },
    });
    if (!event)
      return res.status(404).json({ status: false, message: "Not registered" });
    return res.status(200).json({ status: true, message: "Registered" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const isBookmarked = async (req, res) => {
  try {
    const eventId = req.params.id;
    const exists = await Event.findOne({ where: { id: eventId } });
    if (!exists)
      return res
        .status(404)
        .json({ status: false, message: "Event not found" });
    const event = await bookmarkEvent.findOne({
      where: { eventId, userId: req.user.id },
    });
    if (!event)
      return res.status(404).json({ status: false, message: "Not bookmarked" });
    return res.status(200).json({ status: true, message: "Bookmarked" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export {
  Register,
  Bookmark,
  getEventDetails,
  getAllEventList,
  getRegisteredEventList,
  getBookmarkedEventList,
  isRegistered,
  isBookmarked,
};
