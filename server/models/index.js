const mongoose = require('mongoose');
const Producer = require('./producer.model');
const Designer = require('./designer.model');
const Auction = require('./auction.model');
const Admin = require('./admin.model');
// const Review = require('./review.model');
// const Message = require('./message.model');

module.exports = {
  Producer,
  Designer,
  Auction,
  Admin,
};