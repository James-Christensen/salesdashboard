import React from "react";

export default function Footer() {
  const footerYear = new Date().getFullYear();
  return (
    <footer className="footer bg-neutral p-2 text-primary-content footer-center">
      <div className="text-justify">
        <p>Copyright &copy; {footerYear} All rights reserved</p>
      </div>
    </footer>
  );
}
