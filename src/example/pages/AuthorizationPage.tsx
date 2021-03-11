import {REDIRECT_PROP_NAME, searchParse} from 'example/helpers';
import {getLink} from 'example/router';
import {useStore} from 'example/store';
import {useCallback, useMemo, useState} from 'react';
import {useHistory, useLocation} from 'react-router';

export const AuthorizationPage = () => {
  const {setUserName} = useStore();

  const {search} = useLocation();
  const history = useHistory();

  const [name, setName] = useState('');

  const redirectUrl = useMemo(() => {
    const query = searchParse(search);
    const redirectUrl = query[REDIRECT_PROP_NAME];

    return typeof redirectUrl === 'string' ? redirectUrl : undefined;
  }, [search]);

  const handleCick = useCallback(() => {
    setUserName(name);
    history.push(redirectUrl ? redirectUrl : getLink('public'));
  }, [name]);

  return (
    <form>
      <h3>Авторизация:</h3>

      <label htmlFor="nameInput">Ваше имя:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <button type="button" disabled={!name} onClick={handleCick}>
        Авторизоваться
      </button>
    </form>
  );
};
