const express = require('express');
const router = express.Router();
const path = require('path');
const knex = require('../db/connection');

router.get('/', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Shops';
  knex('shop')
  .select('*')
  .then((shops) => {
    renderObject.shops = shops;
    res.render('shops', renderObject);
  })
});

router.get('/:id', function (req, res, next) {
  const shopID = parseInt(req.params.id);
  const renderObject = {};
  knex('shop')
  .where('shop.id', shopID)
  .select('*')
  .join('shop_donut', 'shop_donut.shop_id', 'shop.id')
  .join('donut', 'shop_donut.donut_id', 'donut.id')
  .then((donuts) => {
    renderObject.donuts = donuts;
    renderObject.title = donuts[0].name;
    knex('employee')
    .where('employee.shop_id', shopID)
    .join('donut', 'employee.favorite_donut', 'donut.id')
    .select('*')
    .then((employees) => {
      renderObject.employees = employees;
      res.render('singleShop', renderObject);
    })
  })
});
router.get('/:id/edit', function (req, res, next) {
  const shopID = parseInt(req.params.id);
  const renderObject = {};
  knex('shop')
  .where('shop.id', shopID)
  .select('*')
  .join('shop_donut', 'shop_donut.shop_id', 'shop.id')
  .join('donut', 'shop_donut.donut_id', 'donut.id')
  .then((donuts) => {
    renderObject.donuts = donuts;
    renderObject.title = donuts[0].name;
    knex('employee')
    .where('employee.shop_id', shopID)
    .join('donut', 'employee.favorite_donut', 'donut.id')
    .select('*')
    .then((employees) => {
      renderObject.employees = employees;
      res.render('singleShopEdit', renderObject);
    })
  })
});

router.put('/:id/edit', function (req, res, next) {
  const shopID = parseInt(req.params.id);
  const updates = req.body
  const updatedName = updates.name;
  const updatedCity = updates.city;
  console.log(updates);
  knex('shop')
  .where('shop.id', shopID)
  .update({
    name: updatedName,
    city: updatedCity
  })
  .returning('*')
  .then((results) => {
    if (results.length) {
      res.status(200).json({
        status: 'success',
        message: `${results[0].name} has been updated!`
      });
    } else {
      res.status(404).json({
        status: 'errror',
        message: 'That id does not exist'
      });
    }
  })
  .catch((err) => {
    res.status(500).json({
      status: 'errror',
      message: 'Something bad happened!'
    });
  });
});

router.delete('/:id/delete', function (req, res, next) {
  const shopID = parseInt(req.params.id);
  // var ownerID = renderObj.user.ownerID;
  // var adminRights = renderObj.user.admin;
    knex('shop')
    .del()
    .where('id', shopID)
    .returning('*')
    .then((results) => {
      console.log(results);
      // if (results.length) {
      //   res.status(200).json({
      //     status: 'success',
      //     message: 'Shop is gone!'
      //   });
      //   res.redirect('/')
      // } else {
      //   res.status(404).json({
      //     status: 'errror',
      //     message: 'That shop does not exist'
      //   });
      //   res.redirect('/')
      // }
    })
    .catch((err) => {
      res.status(500).json({
        status: 'errror',
        message: 'Something bad happened!'
      });
      res.redirect('/')
    });
  })
module.exports = router;
