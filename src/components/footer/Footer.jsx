import React from "react";
import "./Footer.css";
export function Footer() {
  return (
    <footer className="home_footer flex">
      <div>
        <ul className="p footer_ul">
          <li className="p-lg">CONTACT</li>
          <li>35 W 46nd Street, Wall Road New York, USA.</li>
          <li>+(000) 1234-56789</li>
          <li>sinhagaurav.me@gmail.com</li>
        </ul>
      </div>
      <div>
        <ul className="p footer_ul">
          <li className="p-lg">SUPPORT</li>
          <li>Faq</li>
          <li>Shipping & Returns</li>
          <li>Contact Us</li>
          <li>Our Partners</li>
        </ul>
      </div>
      <div>
        <ul className="p footer_ul">
          <li className="p-lg">INFO</li>
          <li>About Us</li>
          <li>Our Stores</li>
          <li>Size Guide</li>
          <li>Our Piercing Service</li>
        </ul>
      </div>
    </footer>
  );
}
