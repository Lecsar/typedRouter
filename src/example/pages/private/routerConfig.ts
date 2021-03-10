export const privateRouterConfig = {
  private: {
    path: '/private',
    isPrivate: true,

    children: {
      users: {
        path: '/users',

        children: {
          item: {
            path: '/:id',
          },
        },
      },

      posts: {
        path: '/posts',

        children: {
          item: {
            path: '/:id',
          },
        },
      },
    },
  },
} as const;
