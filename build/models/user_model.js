"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User_Schema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdEvents: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
});
const user = mongoose_1.model('User', User_Schema);
exports.default = user;
//# sourceMappingURL=user_model.js.map