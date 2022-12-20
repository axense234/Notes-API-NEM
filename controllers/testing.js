const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const Note = require("../models/Note");

const templateNotes = [
  {
    id: 1,
    title: "Note 1",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, nemo fugiat suscipit sit reprehenderit eius ut repudiandae at incidunt soluta eaque recusandae saepe veniam laudantium, debitis voluptas maxime quibusdam adipisci illum officiis laborum placeat assumenda dolor? Est quam vero officia hic, qui asperiores ipsum obcaecati quia magni perspiciatis quod temporibus.",
    createdBy: "63a0844b6868808518c03f8e",
  },
  {
    id: 2,
    title: "Note 2",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, nemo fugiat suscipit sit reprehenderit eius ut repudiandae at incidunt soluta eaque recusandae saepe veniam laudantium, debitis voluptas maxime quibusdam adipisci illum officiis laborum placeat assumenda dolor? Est quam vero officia hic, qui asperiores ipsum obcaecati quia magni perspiciatis quod temporibus.",
    createdBy: "63a0844b6868808518c03f8e",
  },
  {
    id: 3,
    title: "Note 3",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, nemo fugiat suscipit sit reprehenderit eius ut repudiandae at incidunt soluta eaque recusandae saepe veniam laudantium, debitis voluptas maxime quibusdam adipisci illum officiis laborum placeat assumenda dolor? Est quam vero officia hic, qui asperiores ipsum obcaecati quia magni perspiciatis quod temporibus.",
    createdBy: "63a0844b6868808518c03f8e",
  },
  {
    id: 4,
    title: "Note 4",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, nemo fugiat suscipit sit reprehenderit eius ut repudiandae at incidunt soluta eaque recusandae saepe veniam laudantium, debitis voluptas maxime quibusdam adipisci illum officiis laborum placeat assumenda dolor? Est quam vero officia hic, qui asperiores ipsum obcaecati quia magni perspiciatis quod temporibus.",
    createdBy: "63a0844b6868808518c03f8e",
  },
  {
    id: 5,
    title: "Note 5",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, nemo fugiat suscipit sit reprehenderit eius ut repudiandae at incidunt soluta eaque recusandae saepe veniam laudantium, debitis voluptas maxime quibusdam adipisci illum officiis laborum placeat assumenda dolor? Est quam vero officia hic, qui asperiores ipsum obcaecati quia magni perspiciatis quod temporibus.",
    createdBy: "63a0844b6868808518c03f8e",
  },
  {
    id: 6,
    title: "Note 6",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, nemo fugiat suscipit sit reprehenderit eius ut repudiandae at incidunt soluta eaque recusandae saepe veniam laudantium, debitis voluptas maxime quibusdam adipisci illum officiis laborum placeat assumenda dolor? Est quam vero officia hic, qui asperiores ipsum obcaecati quia magni perspiciatis quod temporibus.",
    createdBy: "63a08591866485d410495a6e",
  },
  {
    id: 7,
    title: "Note 7",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, nemo fugiat suscipit sit reprehenderit eius ut repudiandae at incidunt soluta eaque recusandae saepe veniam laudantium, debitis voluptas maxime quibusdam adipisci illum officiis laborum placeat assumenda dolor? Est quam vero officia hic, qui asperiores ipsum obcaecati quia magni perspiciatis quod temporibus.",
    createdBy: "63a08591866485d410495a6e",
  },
  {
    id: 8,
    title: "Note 8",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, nemo fugiat suscipit sit reprehenderit eius ut repudiandae at incidunt soluta eaque recusandae saepe veniam laudantium, debitis voluptas maxime quibusdam adipisci illum officiis laborum placeat assumenda dolor? Est quam vero officia hic, qui asperiores ipsum obcaecati quia magni perspiciatis quod temporibus.",
    createdBy: "63a08591866485d410495a6e",
  },
  {
    id: 9,
    title: "Note 9",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, nemo fugiat suscipit sit reprehenderit eius ut repudiandae at incidunt soluta eaque recusandae saepe veniam laudantium, debitis voluptas maxime quibusdam adipisci illum officiis laborum placeat assumenda dolor? Est quam vero officia hic, qui asperiores ipsum obcaecati quia magni perspiciatis quod temporibus.",
    createdBy: "63a08591866485d410495a6e",
  },
  {
    id: 10,
    title: "Note 10",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, nemo fugiat suscipit sit reprehenderit eius ut repudiandae at incidunt soluta eaque recusandae saepe veniam laudantium, debitis voluptas maxime quibusdam adipisci illum officiis laborum placeat assumenda dolor? Est quam vero officia hic, qui asperiores ipsum obcaecati quia magni perspiciatis quod temporibus.",
    createdBy: "63a08591866485d410495a6e",
  },
];

const templateUsers = [
  {
    id: 11,
    username: "User 1",
    email: "userman@gmail.com",
    password: "userhorseman",
  },
  {
    id: 12,
    username: "User 2",
    email: "userhorse@gmail.com",
    password: "userhorseman",
  },
  {
    id: 13,
    username: "User 3",
    email: "userconsent@gmail.com",
    password: "userhorseman",
  },
  {
    id: 14,
    username: "User 4",
    email: "userstuff@gmail.com",
    password: "userhorseman",
  },
  {
    id: 15,
    username: "User 5",
    email: "useridkman@gmail.com",
    password: "userhorseman",
  },
  {
    id: 16,
    username: "User 6",
    email: "userhorsenibba@gmail.com",
    password: "userhorseman",
  },
  {
    id: 17,
    username: "User 7",
    email: "userpoor@gmail.com",
    password: "userhorseman",
  },
  {
    id: 18,
    username: "User 8",
    email: "userrich@gmail.com",
    password: "userhorseman",
  },
  {
    id: 19,
    username: "User 9",
    email: "useryomama@gmail.com",
    password: "userhorseman",
  },
  {
    id: 20,
    username: "User 10",
    email: "userdudes@gmail.com",
    password: "userhorseman",
  },
];

// INSERT TEMPLATE NOTES
const insertTemplateNotes = async (req, res) => {
  const insertedNotes = await Note.create(templateNotes);

  if (!insertedNotes) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Could not insert template notes." });
  }
  return res.status(StatusCodes.CREATED).json({ msg: "Inserted notes." });
};

// INSERT TEMPLATE USERS
const insertTemplateUsers = async (req, res) => {
  const insertedUsers = await User.create(templateUsers);
  console.log(insertedUsers);

  if (!insertedUsers) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Could not insert template users." });
  }
  return res.status(StatusCodes.CREATED).json({ msg: "Inserted users." });
};

// DELETE ALL NOTES/USERS OR ALL NOTES AND USERS BY CHOICE
const deleteAll = async (req, res) => {
  // 1 = DELETE ALL NOTES,2 = DELETE ALL USERS, 3 || undefined = DELETE ALL NOTES AND USERS
  const { option } = req.query;

  if (option === "1") {
    await Note.deleteMany({});
    return res
      .status(StatusCodes.OK)
      .json({ msg: "Successfully deleted all notes." });
  } else if (option === "2") {
    await User.deleteMany({});
    return res
      .status(StatusCodes.OK)
      .json({ msg: "Successfully deleted all users." });
  }

  await Note.deleteMany({});
  await User.deleteMany({});
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Successfully deleted all notes and users." });
};

// UPDATE ALL NOTES/USERS BY CHOICE
const updateAll = async (req, res) => {
  // 1 = UPDATE ALL NOTES,2 || undefined = UPDATE ALL USERS
  const { option } = req.query;
  const { ...updateProperties } = req.body;

  if (!updateProperties) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "No update properties were received." });
  }

  if (option === "1") {
    await Note.updateMany(updateProperties);
    return res
      .status(StatusCodes.OK)
      .json({ msg: "Successfully updated all notes." });
  }

  await User.updateMany(updateProperties);
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Successfully updated all users." });
};

// EXPORTS
module.exports = {
  insertTemplateNotes,
  insertTemplateUsers,
  deleteAll,
  updateAll,
};
