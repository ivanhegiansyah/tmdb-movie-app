import { useEffect } from 'react';

export function useOnClickOutside(
  ref: React.RefObject<HTMLInputElement>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: any
) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
