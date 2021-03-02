import { Schema, model } from 'mongoose';
import { Event_Interface } from '../interfaces/interface_Graphql';

const Event_Schema: Schema = new Schema({
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    price: { type: 'number', required: true },
    date: { type: Date, required: true },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const event = model<Event_Interface>('Event', Event_Schema);

export default event;
