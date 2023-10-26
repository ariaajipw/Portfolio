import React from "react";
import "./intro.css";
import bg from "../../images/ariaaji.png";
import btnImg from "../../images/cloud.png";
import { Link } from "react-scroll";

const Intro = () => {
  return (
    <section id="intro">
      <div className="introContent">
        <span className="hello">Hello,</span>
        <span className="introText">
          I'm <span className="introName"> Aria Aji</span> <br />
          Website Designer
        </span>
        <p className="introPara">
          I am a web designer with experience in creating <br />
          visually appealing.
        </p>
        <Link>
          <button
            className="btn"
            smooth={true}
            offset={-50}
            duration={600}
            onClick={() => {
              document
                .getElementById("contact")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            <img src={btnImg} alt="" className="btnImg" />
            Contact Me
          </button>
        </Link>
      </div>
      <img src={bg} alt="" className="bg" />
    </section>
  );
};

export default Intro;
