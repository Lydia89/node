const express = require('express');
const router = express.Router();
const User= require('../models/user')

const passport = require("passport")
const multer = require('multer');

const  upload =require('../service/multer')
  



// router.get('/users', function(req, res) {
//     res.render('signup');
//   });




router.post('/signup', upload.single('image'), function(req, res) {
  const { username, password, firstName, surname } = req.body
  const profilePicture = req.file.filename
  //const image = req.file.filename
  // console.log('image', image)
  console.log('profilePicture', profilePicture)

  console.log('username', username)
  console.log('password', password)
  console.log('firstName', firstName)
  console.log('surname', surname)
  User.register(new User({
      username,
      firstName,
      surname,
      profilePicture
  }), password, (err, data) => {

      if (err) {
          console.log("/signup user register err", err);
          return data.render("signup");
      } else {
          passport.authenticate("local")(req, res, () => {
              res.redirect("/profile");
          });
      }

  })
})





router.post("/login",
    // console.log('APPPOST', passport.authenticate),
    passport.authenticate("local", {
        successRedirect: "/profile",
        failureRedirect: "/login",
    }),
    (req, res) => {
        console.log("un message");
    }
);


router.get("/logout", (req, res) => {
  // console.log("GET /logout", req);
  req.logout();

  res.redirect("/home");
});





module.exports = router;





