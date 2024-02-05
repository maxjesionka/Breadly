import classes from "./Recipes.module.css";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
// import AccordionGroup from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";

const Recipes = () => {
  const [index, setIndex] = useState(0);
  return (
    <div className={classes.container}>
      <Accordion
        className={classes.accordionTab}
        expanded={index === 0}
        onChange={(event, expanded) => {
          setIndex(expanded ? 0 : null);
        }}
      >
        <AccordionSummary className={classes.accordionHead}>Recipe 1</AccordionSummary>
        <AccordionDetails>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p>- 2 eggs</p>
          <p>- loaf of bread</p>
          <p>- 1 tomato</p>
          <p>- teriyaki chicken 200g</p>
          <p>- lettuce</p>
        </AccordionDetails>
      </Accordion>
      <Accordion
        className={classes.accordionTab}
        expanded={index === 1}
        onChange={(event, expanded) => {
          setIndex(expanded ? 1 : null);
        }}
      >
        <AccordionSummary className={classes.accordionHead}>Recipe 2</AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </AccordionDetails>
      </Accordion>
      <Accordion
        className={classes.accordionTab}
        expanded={index === 2}
        onChange={(event, expanded) => {
          setIndex(expanded ? 2 : null);
        }}
      >
        <AccordionSummary className={classes.accordionHead}>Recipe 3</AccordionSummary>
        <AccordionDetails>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p>- 2 eggs</p>
          <p>- loaf of bread</p>
          <p>- 1 tomato</p>
          <p>- teriyaki chicken 200g</p>
          <p>- lettuce</p>
        </AccordionDetails>
      </Accordion>
      <Accordion
        className={classes.accordionTab}
        expanded={index === 3}
        onChange={(event, expanded) => {
          setIndex(expanded ? 3 : null);
        }}
      >
        <AccordionSummary className={classes.accordionHead}>Recipe 4</AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Recipes;
