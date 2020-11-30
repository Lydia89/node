const express = require('express');
const router = express.Router();

const multer = require('multer');
const Product = require('../models/product');

const upload = require('../service/multer')




router.get('/home', (req, res) => {
  res.render('home')

})

router.get('/signup', (req, res) => {

  if (req.isAuthenticated()) {
    res.redirect("/profile");
  } else {
    res.render("signup");
  }
});




router.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.locals.isLoggedIn = true
    res.render('profile', {
      username: req.user.username,
      firstName: req.user.firstName,
      surname: req.user.surname,
      profilePicture: req.user.profilePicture

    })

  } else {
    res.redirect('/home')
  }

})
router.get("/login", (req, res) => {
  // console.log('req.isAuthenticated',req.isAuthenticated);
  if (req.isAuthenticated()) {
    res.redirect("/profile");
  } else {
    res.render("login");
  }
});





router.get('/admin', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('admin')
  } else {
    res.redirect('/home')
  }
})


router.get('/admin/products/add', (req, res) => {


  if (req.isAuthenticated()) {

    res.render('products')
  } else {
    res.redirect('/home')
  }


})

module.exports = function (passport, Product) {


  router.get('/:id', async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id).lean().exec()
      res.render('product', {
        product,
        isAuthenticated: req.isAuthenticated(),
        username: req.isAuthenticated() ? req.user.username : null
      })
    } catch (err) {
      res.status(500).send(err)
    }

  })
}


router.get('/cities/:city', async (req, res) => {
  try {
    // on récupère les produits de la ville entré en url params
    const products = await Product.find({ city: req.params.city }).lean().exec();
    res.render('listProducts', {
      products,
      isAuthenticated: req.isAuthenticated(),
      username: req.isAuthenticated() ? req.user.username : null
    });
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

// récuperer les images dans ma base et afficher sur la page web


router.get('/products', async (req, res) => {

  if (req.isAuthenticated()) {
    const products = await Product.find().lean().exec()

    res.render('listProducts', {
      products, 

    })
    console.log('[req.fiels]', [req.fiels])
    console.log('products', products)

  } else {
    res.redirect('/products')
  }

})



router.post('/products', upload.array('image', 3), async (req, res) => {
  const { name, discription, price, city, userId } = req.body
  const images = req.files.map(files => files.filename)

  //const image= req.files
  // console.log('imagesfiles',image)
  //const files =[req.body.images]
  //console.log('files',files)

  //console.log('images', images)
  //console.log('req.files', req.files)
  //return res.send(req.files)
  //const image = req.file.filename
  // console.log('req.files.filename',image)
  if (req.isAuthenticated()) {
    const newProduct = await Product.create({
      name, discription, price, city, userId: req.user._id,
      images
    })
    //console.log('newProduct', newProduct)


    res.redirect('/products')

  } else {
    res.redirect('/login')
  }


});



module.exports = router;



