import React from "react";
import "./works.css";
import Portfolio1 from "../../images/beer.gif";
import Portfolio2 from "../../images/beer.png";
import Portfolio3 from "../../images/tea.png";
import Portfolio4 from "../../images/espresso.gif";

const Works = () => {
  return (
    <section id="works">
      <h2 className="worksTitle">My Portfolio</h2>
      <span className="worksDesc">
        I take pride in praying attention to the smallest details. I am excited
        to bring my skills and experience to help businesses achieve their goals
        and create a strong online presence.
      </span>
      <div className="worksImgs">
        <img src={Portfolio3} alt="" className="worksImg" />
        <img src={Portfolio2} alt="" className="worksImg" />
        <img src={Portfolio1} alt="" className="worksImg" />
        <img src={Portfolio4} alt="" className="worksImg" />
      </div>
      <button className="worksBtn">See More</button>
    </section>
  );
};

export default Works;
