import { Schema, model } from 'mongoose';
import { User_Interface } from '../interfaces/interface_Graphql';

const User_Schema: Schema = new Schema({
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
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
});

const user = model<User_Interface>('User', User_Schema);

export default user;
