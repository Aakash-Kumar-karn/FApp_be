const express = require("express");
const orderModel = require("../model/orderModel");
const orderRouter = express.Router();
const orderArr = ["Placed",
    "Confirmed",
    "Prepared",
    "Delivery",
    "Complete",]

async function saveOrder(req, res) {
    try {
        let data = req.body;
        let order = await orderModel.create(data);

        await order.save();
        console.log("saved orderData", order);

        res.status(200).json({
            message: "order created",
            order: order
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message,
        })
    }
}

async function getAllOrders(req, res) {
    try {
        let order = await orderModel.find()
        res.status(200).json({
            data: order,
        })

    } catch (err) {
        consol.log(err);
        res.status(500).json({
            message: err.message,
        })
    }
}

async function getParticularOrder(req, res) {
    try {
        let { id } = req.params;
        console.log("order id", id);
        let order = await orderModel.find({ orderId: id });
        let idx = orderArr.indexOf(order[0].status);
        res.status(200).json({
            data: {
                status: idx,
                createdAt: order[0].createdAt,
                orderId: order[0].orderId
            }
        })

    } catch (err) {
        res.status(404).json({
            message: err.message,
        })
    }
}

async function updateOrder(req, res) {
    try {
        let { id } = req.params;
        let order = await orderModel.find({ orderId: id });
        console.log("before update", order);
        for (let key in req.body) {
            order[0][key] = req.body[key];
        }
        console.log("after update", order[0])
        await order[0].save();
        res.status(200).json({
            data: order[0],
        })

    } catch (err) {
        res.status(404).json({
            message: err.message,
        })
    }
}

// async function deleteReview(req, res) {
//     try {
//         let review = await reviewModel.findByIdAndDelete(req.body.id);
//         let foodId = review.food;
//         let food = await foodModel.findById(foodId);

//         let indexOfReview = food.reviews.indexOf(review["_id"])
//         food.reviews.splice(indexOfReview, 1);

//         await food.save();

//         res.status(200).json({
//             message: "review successfully deleted",
//             review: review,
//         })

//     } catch (err) {
//         res.status(404).json({
//             message: err.message,
//         })
//     }
// }

orderRouter
    .route("/")
    .get(getAllOrders)
    .post(saveOrder);

orderRouter
    .route("/:id")
    .get(getParticularOrder)
    .patch(updateOrder)
// .delete(deleteReview)

module.exports = orderRouter;