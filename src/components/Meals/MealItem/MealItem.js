import { useContext } from 'react';

import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context';
import { Link } from 'react-router-dom';

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  console.log(`MealItem ID: ${props.id}`); // Log the ID value

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <Link to={`/meals/${props.id}`} className={classes.productLink}>{props.name}</Link>
        <div className={classes.description}>{props.short_description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
