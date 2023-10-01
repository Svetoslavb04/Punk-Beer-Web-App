import { useAccount } from 'wagmi';

import Modal from 'react-bootstrap/Modal';

export function withConnectedWallet<P extends object>(Component: React.ComponentType<P>) {
  return (props: P) => {
    const { isConnected } = useAccount();

    return (
      <>
        <Component {...props} />
        <Modal show={!isConnected} centered>
          <h5 className="mb-0 px-4 py-3 text-center">Please connect your wallet to continue!</h5>
        </Modal>
      </>
    );
  };
}
