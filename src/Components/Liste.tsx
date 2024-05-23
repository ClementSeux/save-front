import React from 'react';
import { useCart } from '../Hooks/useCart';

type Props = {
  cartId: number;
};

const Details: React.FC<Props> = ({ cartId }) => {
  const { cart } = useCart(cartId.toString());




  return (
    <div>
      <p>Details for cart id: {cartId}</p>
    </div>
  );
};