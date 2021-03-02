"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Event_Schema = new mongoose_1.Schema({
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    price: { type: 'number', required: true },
    date: { type: Date, required: true },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
const event = mongoose_1.model('Event', Event_Schema);
exports.default = event;
//# sourceMappingURL=events_model.js.map