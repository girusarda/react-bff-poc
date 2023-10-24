const enterprises = [
  {
    name: 'the-road-to-learn-react',
    url: 'https://github.com/${login}',
    repositories: {
      edges: [
        {
          node: {
            id: '1',
            name: 'the-road-to-learn-react',
            url: `https://github.com/the-road-to-learn-react/the-road-to-learn-react`,
            viewerHasStarred: false,
          },
        },
        {
          node: {
            id: '2',
            name: 'the-road-to-learn-react-chinese',
            url: `https://github.com/the-road-to-learn-react/the-road-to-learn-react-chinese`,
            viewerHasStarred: false,
          },
        },
      ]
    }
  },
  {
    name: 'sarda',
    url: 'https://github.com/${login}',
    repositories: {
      edges: [
        {
          node: {
            id: '1',
            name: 'the-road-to-learn-react',
            url: `https://github.com/sarda/the-road-to-learn-react`,
            viewerHasStarred: false,
          },
        },
        {
          node: {
            id: '2',
            name: 'the-road-to-learn-react-chinese',
            url: `https://github.com/sarda/the-road-to-learn-react-chinese`,
            viewerHasStarred: false,
          },
        },
      ]
    }
  }
];

export const schema = `
  type Query {
    organization(login: String!): Organization!
  }

  interface Starrable {
    id: ID!
    viewerHasStarred: Boolean!
  }

  type Enterprise {
    organizations: [Organization] 
  }

  type Organization {
    name: String!
    url: String!
    repositories: RepositoryConnection!
  }

  type RepositoryConnection {
    edges: [RepositoryEdge!]!
  }

  type RepositoryEdge {
    node: Repository!
  }

  type Repository implements Starrable {
    id: ID!
    name: String!
    url: String!
    viewerHasStarred: Boolean!
  }

  type Mutation {
    addStar(input: AddStarInput!): AddStarPayload!
  }

  input AddStarInput {
    starrableId: ID!
  }

  type AddStarPayload {
    starrable: Starrable!
  }
`;

export const resolvers = {
  Query: {
    organization (parent, { login }) {
      return enterprises.find((organization) => organization.name === login);
    },
  },
  Mutation: {
    addStar: (parent, { input }) => ({
      starrable: {
        id: input.starrableId,
        viewerHasStarred: true,
      },
    }),
  },
  Starrable: {
    __resolveType: () => 'Repository',
  },
};
