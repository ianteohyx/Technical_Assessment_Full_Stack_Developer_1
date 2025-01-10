"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllItemsController = void 0;
const item_service_1 = require("../services/item.service");
const getAllItemsController = async (req, res, next) => {
    try {
        const items = await (0, item_service_1.getAllItems)();
        res.status(200).json(items);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllItemsController = getAllItemsController;
