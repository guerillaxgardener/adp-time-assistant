import React from 'react';

interface FooterProps {
  openModal1: () => void;
  openModal2: () => void;
}

const Footer: React.FC<FooterProps> = ({ openModal1, openModal2 }) => {
  return (
    <footer className="w-full bg-blue-500 text-white py-4">
      <div className="max-w-6xl mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} ADP-Mimic. All rights reserved.</p>
        {/* <p>
          Built with 💙 by michael!
        </p> */}
        <button
          onClick={openModal1}
          className="text-white underline mt-4 mr-4"
        >
          Penguin Facts?
        </button>
        <button
          onClick={openModal2}
          className="text-white underline mt-4"
        >
         Micronnation of Sealand Info?
        </button>
        <p>
          <a
            href="https://micfolio.netlify.app/"
            className="text-white underline hover:text-gray-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Access my portfolio!
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
