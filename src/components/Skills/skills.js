import React from "react";
import "./skills.css";
import reactIcon from "../../images/reactjs.png";
import htmlIcon from "../../images/html.png";
import cssIcon from "../../images/css.png";
import bootstrapIcon from "../../images/bootstrapicon.png";
import jsIcon from "../../images/JSicon.png";
import nodeIcon from "../../images/nodeicon.png";

const skills = () => {
  return (
    <section id="skills">
      <span className="skillTitle"> What I Do </span>
      <span className="skillDesc">
        I am a skilled and passionate web designer who creates user-friendly
        websites. I have a decent understanding of web design and i am competent
        in using several kinds of programming languages.
      </span>
      <div className="skillBars">
        <div className="skillBar">
          <img src={htmlIcon} alt="" className="skillBarImg" />
          <div className="skillBarText">
            <h2>HTML</h2>
            {/*<p>
              HyperText Markup Language is the code that is used to structure a
              web page and its content.
            </p>*/}
          </div>
        </div>
        <div className="skillBar">
          <img src={cssIcon} alt="" className="skillBarImg" />
          <div className="skillBarText">
            <h2>CSS</h2>
            {/*<p>
              Cascading style sheets and it represents a programming language
              designed to offer stylistic syntax to build websites and web
              applications.
            </p>*/}
          </div>
        </div>
        <div className="skillBar">
          <img src={jsIcon} alt="" className="skillBarImg" />
          <div className="skillBarText">
            <h2>JavaScript</h2>
            {/*<p>
              A programming language used popularly for developing web
              applications, dynamic user interfaces, and server-side
              applications.
            </p>*/}
          </div>
        </div>
        <div className="skillBar">
          <img src={bootstrapIcon} alt="" className="skillBarImg" />
          <div className="skillBarText">
            <h2>Bootstrap</h2>
            {/*<p>
              It's basically a collection of reusable strings of code in HTML,
              JavaScript and CSS you can input into code to quickly create the
              kind of features to make website mobile-friendly and responsive.
            </p>*/}
          </div>
        </div>
        <div className="skillBar">
          <img src={reactIcon} alt="" className="skillBarImg" />
          <div className="skillBarText">
            <h2>React JS</h2>
            {/*<p>
              Browser-based library that enables building reusable web
              applications with unique HTML elements.
            </p>*/}
          </div>
        </div>
        <div className="skillBar">
          <img src={nodeIcon} alt="" className="skillBarImg" />
          <div className="skillBarText">
            <h2>Node.js</h2>
            {/*<p>
              I uses to create viewing and interaction features of web
              applications using this open-source software, JavaScript tools and
              programming languages.
            </p>*/}
          </div>
        </div>
      </div>
    </section>
  );
};

export default skills;
