const mongoose = require('mongoose')
const Schema = mongoose.Schema

const auctionSchema = new Schema({
    designer: { type: Schema.Types.ObjectId, ref: 'Designer', required: true },
    title: { type: String, required: true },
    description: String,
    designFileUrl: String,
    category: { type: String, required: true },
    subcategory: String,
    targetPrice: { type: Number, required: true },
    minimumQuantity: { type: Number, required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['Draft', 'Active', 'Completed', 'Cancelled'], default: 'Draft' },
    winner: { type: Schema.Types.ObjectId, ref: 'Producer' },
    winningBid: Number,
    totalBids: { type: Number, default: 0 },
    sustainabilityScore: Number,
    requiredCertifications: [String],
    productionDeadline: Date,
    bids: [{
      producer: { type: Schema.Types.ObjectId, ref: 'Producer' },
      amount: Number,
      proposedCompletionDate: Date,
      notes: String,
      status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
      createdAt: { type: Date, default: Date.now }
    }]
  });