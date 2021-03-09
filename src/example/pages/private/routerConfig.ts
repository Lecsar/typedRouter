export const privateRouterConfig = {
  private: {
    path: '/private',
    isPrivate: true,

    children: {
      posts: {
        path: '/posts',
        isPrivate: true,

        children: {
          item: {
            path: '/:id',
          },
        },
      },
    },
  },
} as const;
