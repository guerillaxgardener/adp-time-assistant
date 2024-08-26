import React from 'react';
import Slider from 'react-slick';

interface FooterProps {
  openModal1: () => void;
  openModal2: () => void;
}

const Footer: React.FC<FooterProps> = ({ openModal1, openModal2 }) => {
  const links = [
    { text: 'Penguin Facts?', action: openModal1 },
    { text: 'Micronation of Sealand Info?', action: openModal2 },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    centerMode: true,
    centerPadding: '0px',
    variableWidth: false,
  };

  return (
    <footer className="w-full bg-blue-500 text-white py-4">
      <div className="max-w-6xl mx-auto text-center">
        <Slider {...settings}>
          {links.map((link, index) => (
            <div key={index} className="flex justify-center">
              <button
                onClick={link.action}
                className="text-white underline text-xl"
              >
                {link.text}
              </button>
            </div>
          ))}
        </Slider>
      </div>
    </footer>
  );
};

export default Footer;
