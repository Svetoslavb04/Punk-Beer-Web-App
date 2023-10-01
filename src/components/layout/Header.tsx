import { Link, NavLink } from 'react-router-dom';

import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { sepolia } from 'wagmi/chains';

import Button from 'react-bootstrap/Button';

const Header = () => {
  const connector = new MetaMaskConnector({
    chains: [sepolia],
    options: {
      shimDisconnect: true,
      UNSTABLE_shimOnConnectSelectAccount: true,
    },
  });

  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector,
  });
  const { disconnect } = useDisconnect();

  const handleConnectButtonClick = async () => {
    if (!isConnected) {
      await connect();
    } else {
      await disconnect();
    }
  };

  return (
    <header className="w-100 d-flex flex-wrap justify-content-between align-items-center text-light">
      <Link to="/" className="fs-2 fw-light">
        Beans Love Beers
      </Link>
      <div className="d-flex gap-4">
        <Button variant="secondary" onClick={handleConnectButtonClick}>
          {isConnected ? 'Disconnect' : 'Connect'} Wallet
        </Button>
        <nav className="d-flex align-items-center gap-4 fs-6">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/favourites">Favourites</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
