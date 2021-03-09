import {useQuery} from 'react-query';
import {IPost} from './types';

export const PostsList = () => {
  const {isLoading, isError, data: posts} = useQuery('PostsList', async () => {
    const response = await fetch('http://jsonplaceholder.typicode.com/posts');
    const posts: IPost[] = await response.json();

    return posts;
  });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (isError) {
    return <h3>Error... </h3>;
  }

  return posts ? (
    <ul>
      {posts.map(({id, title, body}) => (
        <li key={id}>
          <h2>{title}</h2>
          <p>{body}</p>
        </li>
      ))}
    </ul>
  ) : null;
};
