import { Document } from 'mongoose';

export interface Event_Args extends Document {
    eventInput: Event_Interface;
}
export interface Event_Interface extends Document {
    _id: string;
    title: string;
    description: string;
    price: number;
    date: string;
    creator: User_Interface;
}

export interface User_Args extends Document {
    userInput: User_Interface;
}
export interface User_Interface extends Document {
    email: string;
    password: string;
    createdEvents: [Event_Interface];
}
