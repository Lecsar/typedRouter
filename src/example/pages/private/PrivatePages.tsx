import {useState} from 'react';
import {Switch} from 'react-router';
import {getLink, getRoutePath, Route} from 'example/router';

import {PostsList} from './views/PostsList';
import {PostItem} from './views/PostItem';
import {Link} from 'react-router-dom';

export const PrivatePages = () => {
  const [postId, setPostId] = useState(0);

  return (
    <Switch>
      <Route path={getRoutePath('private')} exact>
        <h2>Список доступных приватных страниц:</h2>

        <ul>
          <li>
            <Link to={getLink('private.posts')}>Posts list</Link>
          </li>
          <li>
            <Link to={getLink('private.posts.item', {id: 10})}>Post item</Link>

            <div>
              <label htmlFor="postIdInput">PostId: </label>
              <input
                id="postIdInput"
                type="number"
                value={postId}
                onChange={(e) => setPostId(Number(e.target.value))}
              />
            </div>
          </li>
        </ul>
      </Route>

      <Route path={getRoutePath('private.posts')} exact>
        <PostsList />
      </Route>

      <Route path={getRoutePath('private.posts.item')}>
        <PostItem />
      </Route>
    </Switch>
  );
};
