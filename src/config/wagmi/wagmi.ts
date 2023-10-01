import { createConfig, configureChains, mainnet } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia],
  [publicProvider()],
);

export const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});
