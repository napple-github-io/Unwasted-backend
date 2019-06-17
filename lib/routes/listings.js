const { Router } = require('express');
const Listing = require('../models/Listing');

module.exports = Router()
  .post('/new', (req, res, next) => {
    const {
      title,
      user,
      imageUrl,
      description,
      category,
      dietary,
      postedDate,
      expiration,
      archived,
      location
    } = req.body;

    Listing
      .create({ title, user, imageUrl, description, location, category, dietary, postedDate, expiration, archived })
      .then(listing => {
        res.send(listing);
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    if(req.query.listing) {
      console.log('entered findbyID')
      Listing
        .findById(req.query.listing)
        .select({ __v: false })
        .lean()
        .then(listing => res.send(listing))
        .catch(next);
    }
    Listing
      .find()
      .select({ __v: false })
      .lean()
      .then(allListings => res.send(allListings))
      .catch(next);
  });