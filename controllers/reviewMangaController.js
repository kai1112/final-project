const ReviewMangaModel = require('../models/reviewManga')
const ReviewChapterModel = require('../models/reviewChapter')
const CategoryModel = require('../models/category.model')
const UserModel = require('../models/user.model')
const fs = require("fs");


// view all manga author created  
module.exports.viewAllMangaAuthorCreated = async (req, res) => {
  try {
    const cookies = req.cookies;
    let user = await UserModel.findOne({ token: cookies.user })
    let allManga = await ReviewMangaModel.find({ author: user._id })
    if (allManga) {
      res.render('pages/author/reviewManga/viewAllManga/viewAllManga', { allManga, user: user.username })
    } else {
      let allManga = []
      res.render('pages/author/reviewManga/viewAllManga/viewAllManga', { allManga })
    }
  } catch (e) {
    console.log(e)
  }
}
// view pages created manga
module.exports.viewMangaAuthorCreated = async (req, res) => {
  try {
    let category = CategoryModel.find()
    res.render('pages/author/reviewManga/createManga/createManga', { category })
  } catch (e) {
    console.log(e)
  }
}
// create manga
module.exports.createMangaAuthor = async (req, res) => {
  try {
    const cookies = req.cookies;
    // console.log(cookies);
    let user = await UserModel.findOne({ token: cookies.user })
    const newManga = await ReviewMangaModel.findOne({ name: req.body.name });
    if (newManga) {
      res.json({ manga: manga });
    } else {
      await ReviewMangaModel.create({
        avatar: "/" + req.file.path,
        name: req.body.name,
        category: req.body.category,
        author: user._id,
        description: req.body.description,
        price: req.body.price
      });
    }
    res.json({
      message: "login success",
      status: 200,
      err: false,
    });
  } catch (e) {
    console.log(e)
  }
}


//view details manga
module.exports.viewDetails = async (req, res) => {
  try {
    // const cookies = req.cookies;
    // const user = await UserModel.findOne({ token: cookies.user });
    const manga = await ReviewMangaModel.findOne({ _id: req.params.id });
    // console.log(manga);
    const chapter = await ReviewChapterModel.find({ mangaID: req.params.id });
    // console.log(71, chapter);
    if (!manga) {
      res.json("ko co manga nao");
    } else {
      res.render("pages/author/reviewManga/viewDetails/viewDetails", {
        manga,
        chapter,
      });
      // console.log(manga);
    }
  } catch (err) {
    res.json("err");
  }
};

//edit manga
module.exports.viewEditManga = async (req, res) => {
  try {
    res.render("pages/author/reviewManga/editManga/editManga");
  } catch (err) {
    console.log(err);
    // res.json(err);
  }
};
module.exports.editManga = async (req, res) => {
  const mangaID = req.params.id;
  try {
    const manga = await ReviewMangaModel.findOne({ _id: mangaID });
    let avatar, category, description, price
    console.log(req.file);
    if (req.file == undefined) {
      avatar = manga.avatar
    } else {
      avatar = "/" + req.file.path
    }
    if (req.body.category === '') {
      category = manga.category
    } else {
      category = req.body.category
    }
    if (req.body.description === '') {
      description = manga.description
    } else {
      description = req.body.description
    }

    if (!manga) {
      res.json({ message: "manga khong ton tai" });
    } else {
      await ReviewMangaModel.findOneAndUpdate(
        {
          _id: mangaID,
        },
        {
          avatar: avatar,
          category: category,
          description: description,
        }
      );
      res.json({
        status: 200,
        message: "success"
      });
    }
  } catch (err) {
    res.json({ message: "loi 3" });
  }
};

//delete manga
module.exports.deleteManga = async (req, res) => {
  const mangaID = req.params.id;
  // console.log(mangaID);
  try {
    const manga = await ReviewMangaModel.findOne({ _id: mangaID });
    if (manga) {
      await ReviewMangaModel.findByIdAndDelete(manga._id);
      // fs.unlinkSync(manga.avatar.slice[0])
    } else {
      res.json({ message: "manga not found" });
    }
    res.json({
      status: 200,
      message: "delete manga success"
    });
  } catch (err) {
    res.json(err);
    console.log(err);
  }
};
