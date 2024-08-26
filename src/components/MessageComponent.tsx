import React from 'react';

interface MessageComponentProps {
  remainingTime: { hours: number; minutes: number };
}

const MessageComponent: React.FC<MessageComponentProps> = ({ remainingTime }) => {
  const renderMessage = () => {
    if (remainingTime.hours === 0 && remainingTime.minutes === 0) {
      return <p className="text-xl text-green-600">YOOOO lets GOOOO! Enjoy ur weekend, u HOTTIE BADDIE SUPREME being</p>;
    } else if (remainingTime.hours < 5) {
      return <p className="text-xl text-yellow-600">Good job playa, you getting close!!!!</p>;
    }
    return null;
  };

  const message = renderMessage();

  if (!message) return null;

  return (
    <div className="relative p-4 border rounded-lg bg-white">
      <div className="absolute inset-0 border-8 rounded-lg border-transparent flex justify-around items-center animate-blink-lights">
        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
      </div>
      <div className="relative z-10 p-3">
        {message}
      </div>
    </div>
  );
};

export default MessageComponent;
