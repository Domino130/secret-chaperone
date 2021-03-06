const router = require("express").Router();
let Event = require("../models/events.model");

router.route("/").get((req, res) => {
  Event.find()
    .then((event) => res.json(event))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const location = req.body.location;
  const dateTime = req.body.dateTime;
  const eventDate = req.body.eventDate;
  const startTime = req.body.startTime;
  const contacts = req.body.contacts;
  const recur = req.body.recur;
  const newEvent = new Event({
    name,
    location,
    dateTime,
    eventDate,
    startTime,
    contacts,
    recur,
  });

  newEvent
    .save()
    .then(() => res.json("Event added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Event.findById(req.params.id)
    .then((event) => res.json(event))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then(() => res.json("Event deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/update/:id").post((req, res) => {
  Event.findById(req.params.id)
    .then((event) => {
      event.name = req.body.name;
      event.location = req.body.location;
      event.dateTime = req.body.dateTime;
      event.eventDate = req.body.eventDate;
      event.startTime = req.body.startTime;
      event.contacts = req.body.contacts;
      event.recur = req.body.recur;

      event
        .save()
        .then(() => res.json("Event updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
