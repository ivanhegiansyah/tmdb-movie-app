import Header from '../Header/Header';

type Props = {
  children: React.ReactNode;
  paddingLayout?: string;
};

const Layout: React.FC<Props> = ({ children, paddingLayout }) => {
  return (
    <>
      <Header />
      <div
        className={`${
          paddingLayout ? paddingLayout : 'px-8 lg:px-32 xl:px-48 py-8'
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
