'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const SwapValue = () => {
  return (
      <div>
        <SwapPrice />
      </div>
  );
};

const SwapPrice = () => {
  const swapPair: string = '0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e';
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchSwapPrice = async () => {
      try {
        const GET_SWAP_DATA = {
          query: `
            query MyQuery(swapPair: String!) {
              liquidityPositions(
                first: 3
                where: { pair_: { id: swapPair } }
                orderBy: liquidityTokenBalance
                orderDirection: desc
              ) {
                user {
                  id
                }
                liquidityTokenBalance
              }
              pair(id: swapPair) {
                reserveUSD
                totalSupply
                name
              }
            }
          `,
          variables: { swapPair },
        };

        const { data } = await axios.post('https://api.thegraph.com/subgraphs/name/sushiswap/exchange', GET_SWAP_DATA);

        if (data && data.data && data.data.pair) {
          const lastSwap = data.data.swaps[0];
          const totalReserve = data.data.pair.reserve0 + data.data.pair.reserve1;

          // Utilisez une variable différente pour stocker le prix calculé
          const calculatedPrice = (lastSwap.amount1Out / lastSwap.amount0In) * totalReserve;
          setPrice(calculatedPrice);
        } else {
          setPrice(null);
          console.error('GraphQL Response Data Missing:', data);
        }

        console.log('Fetched Price:', price); // Cela affichera probablement 'Fetched Price: null' à cause de la nature asynchrone de setState
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
        <div className="flex justify-center font-family">
          <div className="my-4 mx-auto lg:mx-16 lg:w-auto border border-green-900">
            <div className="flex flex-col p-2 text-green-900">
              <div>
                <p>Liquidité totale : {new Intl.NumberFormat('en-US').format(Math.floor(price))} $</p>
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
