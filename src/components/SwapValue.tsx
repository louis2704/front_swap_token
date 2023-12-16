'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

export function SwapValue() {
  return (
    <div>
      <div>
        <SwapPrice />
      </div>
    </div>
  );
}

const SwapPrice = () => {
  const swapPair = '0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e';
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchSwapPrice = async () => {
      try {
        const GET_SWAP_DATA = {
          query: `
            query GetSwapData($pairId: ID!) {
              pair(id: $pairId) {
                id
                token0 {
                  id
                  name
                }
                token1 {
                  id
                  name
                }
                reserve0
                reserve1
              }
              swaps(first: 1, orderBy: timestamp, orderDirection: desc) {
                amount0In
                amount0Out
                amount1In
                amount1Out
                timestamp
              }
            }
          `,
          variables: { pairId: swapPair },
        };

        const response = await axios.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2', GET_SWAP_DATA);

        if (response.data && response.data.data && response.data.data.pair) {
          const lastSwap = response.data.data.swaps[0];
          const totalReserve = response.data.data.pair.reserve0 + response.data.data.pair.reserve1;

          const price = (lastSwap.amount1Out / lastSwap.amount0In) * totalReserve;
          setPrice(price);
        } else {
          setPrice(null);
        }

        console.log('Fetched Price:', price);
      } catch (error) {
        console.error('Error fetching data:', error);
        setPrice(null);
      }
    };

    fetchSwapPrice();
  }, [swapPair]);

  return (
    <>
      {price !== null ? (
        <div className="flex justify-center">
          <div className="my-4 mx-auto lg:mx-16 lg:w-auto border border-green-900">
            <div className="flex flex-col p-2 text-green-900">
              <div>
                <p>Swap Price: {new Intl.NumberFormat('en-US').format(price)} $</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">Can't fetch the data</div>
      )}
    </>
  );
};

export default SwapPrice;

