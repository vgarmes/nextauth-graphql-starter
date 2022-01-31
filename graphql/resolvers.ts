export const resolvers = {
  Query: {
    posts: (_parent, _args, ctx) => {
      return ctx.prisma.post.findMany();
    },
  },
};
