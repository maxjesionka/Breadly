import classes from './MealsSummary.module.css';


const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Witamy w Breadly</h2>
      <p>
        Oferujemy duży wybór najlepszej jakości wypieków, posiadamy sprawdzone wieloletnie receptury przekazywane z pokolenia na pokolenie.
      </p>
      <p>
       Korzystając z usłóg naszego sklepu wspierają państwo polskie biznesy.
      </p>
    </section>
  );
};

export default MealsSummary;
