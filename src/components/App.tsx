import { Outlet } from 'react-router-dom';

import { WagmiConfig } from 'wagmi';
import { config } from '../config/wagmi/wagmi';

import Header from './layout/Header';

function App() {
  return (
    <>
      <WagmiConfig config={config}>
        <div className="application">
          <Header />
          <main>
            <Outlet />
          </main>
        </div>
      </WagmiConfig>
    </>
  );
}

export default App;
