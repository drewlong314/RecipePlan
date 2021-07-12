import React from "react";
import "./style.css";

const About = () => {
  return (
    <div className={"about-container"}>
      <div className={"about-content"}>
        <h2 className={'about-header'}>About Recipe Plan</h2>
        <p className={'about-p'}>
          Recipe Plan allows you to create recipes and store them in a list.
          Soon Recipe Plan will allow you to add those recipes to a meal plan.
          If you would like to see more about the development of Recipe Plan,
          visit this{" "}
          <a className={'about-repo'} href={"https://github.com/drewlong314/RecipePlan"}>Github Repo</a>
        </p>
        <div className={'about-links__container'}>
            <a className={'about-links'} href={'https://www.linkedin.com/in/drew-long-361772172/'}>LinkedIn</a>
            <a className={'about-links'} href={'https://github.com/drewlong314'}>GitHub</a>
            <a className={'about-links'} href={'https://angel.co/u/drew-long-1'}>Angel's List</a>
        </div>
        <p className={"about-madeby"}>Made By Drew Long, 2021</p>
      </div>
    </div>
  );
};

export default About;
