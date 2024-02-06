import classes from './MealsSummary.module.css';


const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Delicious Food, Baked for You</h2>
      <p>
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our products are baked with high-quality ingredients, just-in-time and
        of course by experienced bakers!
      </p>
    </section>
  );
};

export default MealsSummary;
