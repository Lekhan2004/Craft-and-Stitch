import mongoose from 'mongoose';

const { Schema } = mongoose;

const auctionSchema = new Schema({
  designer: { type: Schema.Types.ObjectId, ref: 'Designer', required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  designFileUrl: { type: String, required: false },
  category: { type: String, required: true },
  subcategory: { type: String, required: false },
  targetPrice: { type: Number, required: true },
  minimumQuantity: { type: Number, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['Draft', 'Active', 'Completed', 'Cancelled'], 
    default: 'Draft' 
  },
  winner: { type: Schema.Types.ObjectId, ref: 'Producer', required: false },
  winningBid: { type: Number, required: false },
  totalBids: { type: Number, default: 0 },
  sustainabilityScore: { type: Number, required: false },
  requiredCertifications: [{ type: String, required: false }],
  productionDeadline: { type: Date, required: false },
  bids: [{
    producer: { type: Schema.Types.ObjectId, ref: 'Producer', required: false },
    amount: { type: Number, required: false },
    proposedCompletionDate: { type: Date, required: false },
    notes: { type: String, required: false },
    status: { 
      type: String, 
      enum: ['Pending', 'Accepted', 'Rejected'], 
      default: 'Pending' 
    },
    createdAt: { type: Date, default: Date.now }
  }]
});

// Create model "Auction" with the defined schema
const Auction = mongoose.model('Auctions', auctionSchema);

export default Auction;
