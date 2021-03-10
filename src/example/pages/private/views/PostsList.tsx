import {useQuery} from 'react-query';
import {Link} from 'react-router-dom';
import {getUniquePropArray} from 'example/helpers';
import {getLink} from 'example/router';
import {IPost, IUser} from './types';
import {useNormalizeQueries} from 'example/hooks';

export const PostsList = () => {
  const {isLoading, isError, data: posts = []} = useQuery('PostsList', async () => {
    const response = await fetch('http://jsonplaceholder.typicode.com/posts');
    const posts: IPost[] = await response.json();

    return posts;
  });

  const userIds = getUniquePropArray(posts, 'userId');

  const usersDictionary = useNormalizeQueries<IUser>({
    queryKey: 'user',
    getUrl: (userId) => `https://jsonplaceholder.typicode.com/users/${userId}`,
    ids: userIds,
    propIdName: 'id',
  });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (isError) {
    return <h3>Error... </h3>;
  }

  return posts ? (
    <ul>
      {posts.map(({id, title, body, userId}) => (
        <li key={id}>
          <Link to={getLink('private.posts.item', {id})}>
            <h2>{title}</h2>
          </Link>
          <p>{body}</p>
          <div>
            <h3>
              Author:{' '}
              {usersDictionary[userId] ? (
                <Link to={getLink('private.users.item', {id: userId})}>{usersDictionary[userId]?.name}</Link>
              ) : (
                'Loading...'
              )}
            </h3>
          </div>
        </li>
      ))}
    </ul>
  ) : null;
};
