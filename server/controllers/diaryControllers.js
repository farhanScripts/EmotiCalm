const Diary = require('../models/Diary');
const mongoose = require('mongoose');
/**
 * GET ALL DIARY
 */

exports.getAllDiary = async (req, res) => {
  const locals = {
    pageTitle: 'Emoticalm | Daily Journal',
  };

  try {
    const diaries = await Diary.aggregate([
      { $sort: { updatedAt: -1 } },
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      {
        $project: {
          title: { $substr: ['$title', 0, 30] },
          body: { $substr: ['$body', 0, 100] },
        },
      },
    ]);

    res.render('Diary/dashboard', {
      username: req.user.username,
      locals,
      diaries,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET DIARY DETAILS BASE ON ID
 */

exports.getDiaryDetail = async (req, res) => {
  const diary = await Diary.findById({ _id: req.params.id })
    .where({ user: req.user.id })
    .lean();

  if (diary) {
    res.render('Diary/diary-detail', {
      diaryId: req.params.id,
      diary,
    });
  } else {
    res.status(404).send('Diary not found!');
  }
};

/**
 * UPDATE DIARY BASE ON ID
 */

exports.updateDiary = async (req, res) => {
  try {
    await Diary.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, body: req.body.body, mood: req.body.mood }
    ).where({ user: req.user.id });

    res.redirect('/diary');
  } catch (error) {
    console.log(error);
  }
};

/**
 * DELETE DIARY
 */

exports.deleteDiary = async (req, res) => {
  try {
    await Diary.deleteOne({ _id: req.params.id }).where({ user: req.user.id });
    res.redirect('/diary');
  } catch (error) {
    console.log(error);
  }
};

/**
 * ADD DIARY
 */

exports.addDiary = async (req, res) => {
  res.render('Diary/add-diary');
};

exports.newDiary = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Diary.create(req.body);
    res.redirect('/diary');
  } catch (error) {
    console.log(error);
  }
};
