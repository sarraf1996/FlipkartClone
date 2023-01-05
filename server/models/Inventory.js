import mongoose from 'mongoose';

const InventorySchema = new mongoose.Schema({
    url: String,
    detailUrl: String,
    title: Object,
    price: Object,
    quantity: Number,
    description: String,
    discount: String,
    tagline: String
});

const Inventory = mongoose.model("Inventory", InventorySchema);

export default Inventory;