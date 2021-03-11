import {getLink} from 'example/router';
import {Link} from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <h1>
      Ничего не найдено. Перейти на <Link to={getLink('public')}>главную страницу</Link>
    </h1>
  );
};
