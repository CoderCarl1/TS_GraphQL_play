"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphQLresolvers = void 0;
const events_model_1 = __importDefault(require("../../models/events_model"));
const user_model_1 = __importDefault(require("../../models/user_model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// models/user_model';
//function to return a user
const user = async (userID) => {
    try {
        const user = await user_model_1.default.findById(userID);
        if (!user) {
            throw new Error('No User Found');
        }
        else {
            return user;
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.graphQLresolvers = {
    //return all Events
    all_events: async () => {
        let events = await events_model_1.default.find();
        // .populate('creator');
        const a = events.map((event) => {
            return {
                event,
                creator: () => user.bind(this, event.creator.id)
            };
            // event.creator =
        });
        console.log('a', [a[0].creator()]);
        return [...a];
    },
    // all_events: async (email?: string): Promise<Event_Interface[] | void> => {
    //     try {
    //         if (email) {
    //             const events = await Event.find({ email: { $in: email } }).populate('creator');
    //             //    res.status(200).send(events);
    //             return [...events];
    //         }
    //         if (!email) {
    //             const events = await Event.find().populate('creator');
    //             //    res.status(200).send(events);
    //             return [...events];
    //         } else {
    //             throw new Error('No Events Found');
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // },
    one_event: async (args) => {
        try {
            const event = await events_model_1.default.findById({ _id: args._id }).populate('creator');
            if (!event) {
                throw new Error('No Event Found');
            }
            else {
                return event;
            }
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    create_event: async (args) => {
        const { title, description, price } = args.eventInput;
        try {
            const event = new events_model_1.default({
                title,
                description,
                price,
                date: new Date().toISOString(),
                creator: '603c5e1a6c57ee4831dde190'
            });
            const newEvent = await event.save();
            const user = await user_model_1.default.findById('603c5e1a6c57ee4831dde190');
            if (!user)
                throw new Error('User does not exist');
            user.createdEvents.push(newEvent);
            await user.save();
            return newEvent;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    all_users: async (email) => {
        try {
            const users = await user_model_1.default.find().populate('createdEvents');
            //    res.status(200).send(events);
            return [...users];
        }
        catch (err) {
            console.log(err);
        }
    },
    one_user: async ({ userID }) => {
        try {
            let user = await user_model_1.default.findById({ _id: userID }).populate('createdEvents');
            if (user) {
                // if (user.createdEvents.length >= 1) {
                //     user.createdEvents = user.createdEvents.map((event) => {
                //         event.date = new Date(event.date).toISOString();
                //     });
                // } else {
                console.log('user DATA', user);
                return user;
                // }
                // return { user };
            }
            else {
                throw new Error('User not found');
            }
            // return { user, createdEvents: events.bind(this, user.createdEvents) };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    create_user: async (args) => {
        const { email, password } = args.userInput;
        try {
            const userCheck = await user_model_1.default.findOne({ email });
            if (userCheck)
                throw new Error('User already exists');
            return bcryptjs_1.default.genSalt(12, (err, salt) => {
                return bcryptjs_1.default.hash(password, salt, async (err, hash) => {
                    const user = new user_model_1.default({
                        email,
                        password: hash
                    });
                    const newUser = await user.save();
                    newUser.password = '';
                    console.log(newUser);
                    return newUser;
                });
            });
            // const hashedPass = await bcrypt.hash(password, salt);
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    // res.status(201).send({ msg: 'Event Registered', newEvent });
    // events.push(event);
};
//# sourceMappingURL=index.js.map