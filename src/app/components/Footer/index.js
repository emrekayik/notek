import React from "react";

function Footer({ text }) {
  return (
    <footer className="footer footer-center fixed bottom-0 z-10 bg-neutral p-4 text-neutral-content">
      <aside>
        <p>{text ? text : "StudioEK 2024"}</p>
      </aside>
    </footer>
  );
}

export default Footer;
