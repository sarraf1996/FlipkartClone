import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    state: {
        type: String,
        required: true
    },
    modifiedOn: {
        type: Date,
        required: true
    },
    products: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalCartPrice: Number
});

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;