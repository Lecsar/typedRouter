import {useQuery} from 'react-query';
import {useParams} from 'react-router';
import {IPost} from './types';

export const PostItem = () => {
  const {id} = useParams<{id: string}>();

  const {isLoading, isError, data: post} = useQuery(['PostItem', id], async () => {
    const response = await fetch(`http://jsonplaceholder.typicode.com/posts/${id}`);
    const post: IPost = await response.json();

    return post;
  });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (isError) {
    return <h3>Error... </h3>;
  }

  return post ? (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  ) : null;
};
