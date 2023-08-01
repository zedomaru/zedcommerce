import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as ZedLogo } from '../../assets/Logo-colored.svg';
import './navigation.styles.scss';
type Props = {};

const Navigation = (props: Props) => {
  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <ZedLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
