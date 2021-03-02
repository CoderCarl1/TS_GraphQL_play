import { Event_Args, Event_Interface, User_Args, User_Interface } from '../../interfaces/interface_Graphql';
import Event from '../../models/events_model';
import User from '../../models/user_model';
import bcrypt from 'bcryptjs';
// models/user_model';

//function to return a user
const user = async (userID: string): Promise<User_Interface | undefined> => {
    try {
        const user = await User.findById(userID);

        if (!user) {
            throw new Error('No User Found');
        } else {
            return user;
        }
    } catch (err) {
        console.log(err);
    }
};

export const graphQLresolvers = {
    //return all Events
    all_events: async (): Promise<any> => {
        let events = await Event.find();
        // .populate('creator');
        const a: any[] = events.map((event) => {
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
    one_event: async (args: Event_Args): Promise<Event_Interface> => {
        try {
            const event = await Event.findById({ _id: args._id }).populate('creator');
            if (!event) {
                throw new Error('No Event Found');
            } else {
                return event;
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    create_event: async (args: Event_Args): Promise<Event_Interface> => {
        const { title, description, price } = args.eventInput;

        try {
            const event = new Event({
                title,
                description,
                price,
                date: new Date().toISOString(),
                creator: '603c5e1a6c57ee4831dde190'
            });

            const newEvent = await event.save();
            const user = await User.findById('603c5e1a6c57ee4831dde190');
            if (!user) throw new Error('User does not exist');

            user.createdEvents.push(newEvent);
            await user.save();

            return newEvent;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    all_users: async (email?: string) => {
        try {
            const users = await User.find().populate('createdEvents');
            //    res.status(200).send(events);
            return [...users];
        } catch (err) {
            console.log(err);
        }
    },
    one_user: async ({ userID }: any): Promise<User_Interface> => {
        try {
            let user = await User.findById({ _id: userID }).populate('createdEvents');

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
            } else {
                throw new Error('User not found');
            }

            // return { user, createdEvents: events.bind(this, user.createdEvents) };
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    create_user: async (args: User_Args): Promise<any> => {
        const { email, password } = args.userInput;
        try {
            const userCheck = await User.findOne({ email });

            if (userCheck) throw new Error('User already exists');

            return bcrypt.genSalt(12, (err, salt): void => {
                return bcrypt.hash(password, salt, async (err, hash) => {
                    const user = new User({
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
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    // res.status(201).send({ msg: 'Event Registered', newEvent });

    // events.push(event);
};
