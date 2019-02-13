const graphql = require("graphql");
const Mock = require("mockjs");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

// dummy data
var books = Mock.mock({
  "data|1000-2000": [
    {
      "id|+1": 1,
      name: "@first",
      gener: "@sentence",
      "authorId|100-1000": 100
    }
  ]
});

var author = Mock.mock({
  "data|1000-2000": [
    {
      "id|+1": 1,
      name: "@first",
      "sex|1": ["man", "women"],
      "age|30-50": 30
    }
  ]
});

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    anthor: {
      type: AuthorType,
      resolve(parent, args) {
        return author.data.find(item => item.id == parent.authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "anthor",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    sex: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books.data.filter(item => item.authorId == parent.id);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        return books.data.find(item => item.id == args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return author.data.find(item => item.id == args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(patent, args) {
        return books.data;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return anthor.data;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
