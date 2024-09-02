const { Userlist, MovieList } = require('../FakeData')
const _ = require("lodash")
const normalizeNationality = (nationality) => {
    if (!nationality) return null;
    return nationality.toUpperCase().replace(/\s+/g, "_");
};

// Resolvers with normalization logic
const resolvers = {
    Query: {
        users: () => Userlist.map(user => ({
            ...user,
            nationality: normalizeNationality(user.nationality)
        })),
        user: (parent, args) => {
            const id = args.id
            const user = _.find(Userlist, { id: Number(id) })
            user.nationality = normalizeNationality(user.nationality)
            return user
        },
        // Movies resolver.
        movies: () => {
            return MovieList
        },
        movie: (parent, args) => {

            const name = args.name;
            const movie = _.find(MovieList, { name });
            return movie;
        },
    },
    Mutation: {
        createUser: (parent, args) => {
            const user = args.input;
            const lastid = Userlist[Userlist.length - 1].id;
            user.id = lastid + 1;
            Userlist.push(user);
            console.log(user);
            return user;
        }
    }
};
module.exports = { resolvers }