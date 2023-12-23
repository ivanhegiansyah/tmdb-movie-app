import { useEffect, useRef } from 'react';
import tmdbLogo from '../../assets/icons/tmdb-logo.svg';
import { useOnClickOutside } from '../../hooks/useClickOutside';
import {
  createRequestToken,
  selectStatusPostRequestToken,
} from '../../store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

type LoginPopupProps = {
  open?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setOpen?: any;
};

const LoginPopup: React.FC<LoginPopupProps> = ({ open, setOpen }) => {
  const dispatch = useAppDispatch();
  const statusRequestToken = useAppSelector(selectStatusPostRequestToken);
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  useOnClickOutside(ref, () => setOpen && setOpen(false));
  const requestToken = localStorage.getItem('request_token') || '';

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  useEffect(() => {
    if (statusRequestToken === 'succeeded') {
      window.location.replace(
        `https://www.themoviedb.org/auth/access?request_token=${requestToken}`
      );
    }
  }, [requestToken, statusRequestToken]);

  const handdleCreateRequestToken = (
    event: React.MouseEvent<HTMLImageElement>
  ) => {
    event.preventDefault();
    const params = {
      redirect_to: 'http://127.0.0.1:5173',
    };
    dispatch(createRequestToken(params));
  };

  if (!open) {
    return undefined;
  }

  return (
    <>
      <div
        ref={ref}
        className="absolute z-50 left-1/2 top-[40%] cursor-pointer"
      >
        <div
          className="relative -left-1/2 bg-slate-100 px-8 pt-8 pb-4 rounded-3xl"
          onClick={handdleCreateRequestToken}
        >
          <img src={tmdbLogo} alt="tmmdb logo" />
          <p className="text-black text-center mt-2">Login with TMDB</p>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default LoginPopup;
