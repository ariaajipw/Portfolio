import React, { useRef } from "react";
import Tok from "../../images/tokfoot.png";
import Ig from "../../images/igfoot.png";
import Fb from "../../images/fbfoot.png";
import X from "../../images/xfoot.png";
import "./contact.css";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_9uimnda",
        "template_bnel0gd",
        form.current,
        "L1thI67_jt469qGW6"
      )
      .then(
        (result) => {
          console.log(result.text);
          e.target.reset();
          alert("Email Sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <section id="contactPage">
      {/* <div id="clients">
        <h1 className="contactPageTitle">My Clients</h1>
        <p className="clientDesc">
          I have had the opportunity to work with a diverse group of companies.
          Some of the notable companies I have worked with includes.
        </p>
        <div className="clientImgs">
          <img src={Client1} alt="" className="clientImg" />
          <img src={Client2} alt="" className="clientImg" />
          <img src={Client3} alt="" className="clientImg" />
          <img src={Client4} alt="" className="clientImg" />
        </div>
      </div> */}
      <div id="contact">
        <h1 className="contactPageTitle">Contact Me</h1>
        <span className="contactDesc">
          Please fill out the form below to discuss any work opportunity.
        </span>
        <form className="contactForm" ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            className="name"
            placeholder="Your Name"
            name="your_name"
          />
          <input
            type="text"
            className="email"
            placeholder="Your Email"
            name="your_email"
          />
          <textarea
            className="msg"
            name="massage"
            rows="5"
            placeholder="Your Massage"
          ></textarea>

          <button type="submit" value="Send" className="submitBtn">
            Submit
          </button>

          <div className="links">
            <a
              href="https://www.instagram.com/ariaaji/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Ig} alt="instagram" className="link" />
            </a>

            <a
              href="https://twitter.com/ariaajipw"
              target="_blank"
              rel="noreferrer"
            >
              <img src={X} alt="twitter" className="link" />
            </a>

            <a
              href="https://www.facebook.com/ariaajipw/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Fb} alt="facebook" className="link" />
            </a>

            <a
              href="https://www.tiktok.com/@ariaajipw"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Tok} alt="tiktok" className="link" />
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
