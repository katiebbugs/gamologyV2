const { AuthenticationError } = require('apollo-server-express');

const { signToken } = require('../utils/auth');
const {Users} = require('../db/models');

const stripe = process.env.STRIPE_KEY;

const resolvers = {
    Query: {

        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id }).select(
                "-__v -password"
              );
              return userData;
            }
            throw new AuthenticationError("Not logged in");
        },
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id)
        
                // user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
        
                return user;
            }
        
            throw new AuthenticationError('HANG ON PARTNER, this aint the wild west you have to login first');
        },
       

    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
                throw new AuthenticationError('WROOOONG, try again!');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
                throw new AuthenticationError('WROOOONG, try again!');
            }
      
            const token = signToken(user);
            return { token, user };
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }
      
            throw new AuthenticationError('HANG ON PARTNER, this aint the wild west you have to login first');
        },
       
    }
};

module.exports = resolvers;