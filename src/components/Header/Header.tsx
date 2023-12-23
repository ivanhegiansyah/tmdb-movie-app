import {
  Link,
  createSearchParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import LoginPopup from '../LoginPopup/LoginPopup';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');

  const accountId = localStorage.getItem('account_id') || '';
  const requestToken = localStorage.getItem('request_token') || '';
  const accessToken = localStorage.getItem('access_token') || '';

  const handlePopUpLogin = () => {
    setOpenPopup(true);
  };

  const handleLogout = () => {
    if (accessToken && accountId && requestToken) {
      localStorage.removeItem('account_id');
      localStorage.removeItem('request_token');
      localStorage.removeItem('access_token');
      localStorage.removeItem('movie_rating_list');
      navigate(0);
    }
  };

  const onSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event?.key === 'Enter') {
      navigate({
        pathname: '/search',
        search: createSearchParams({
          q: searchInput,
        }).toString(),
      });
    }
  };

  return (
    <>
      {!accountId && <LoginPopup open={openPopup} setOpen={setOpenPopup} />}
      <div className="bg-[#0EA5E9] flex justify-between items-center px-8 lg:px-32 xl:px-48 py-4">
        <div className="font-extrabold text-3xl">
          <Link to={`/`}>C I N E M A</Link>
        </div>

        <div className="relative items-center w-1/3 h-10 text-black rounded-[8px] px-3 leading-tight hidden md:flex bg-slate-200">
          <div className="w-full h-full">
            <input
              className="w-full h-full focus:outline-none bg-transparent placeholder:text-[#8F95B2] text-sm"
              placeholder="Search movies"
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(event) => onSearchKeyDown(event)}
              value={searchInput}
            />
          </div>
          <div className="flex items-center justify-center right-0 pl-2">
            <FaSearch />
          </div>
        </div>
        <ul className="flex space-x-10 font-medium">
          <li onClick={handlePopUpLogin}>
            <Link to={accessToken ? '/favorite' : location.pathname}>
              Favorite
            </Link>
          </li>
          <li onClick={handlePopUpLogin}>
            <Link to={accessToken ? '/watchlist' : location.pathname}>
              Watchlist
            </Link>
          </li>
          {accessToken && (
            <li onClick={handleLogout} className="cursor-pointer">
              <div>Logout</div>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Header;
