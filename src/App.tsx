import React, { useState, useEffect } from 'react';
import MessageComponent from './components/MessageComponent';
import Modal from './components/Modal';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [hours, setHours] = useState<{ Mon: string; Tues: string; Wed: string; Thur: string; Fri: string }>(() => {
    const savedHours = localStorage.getItem('hours');
    return savedHours ? JSON.parse(savedHours) : { Mon: '', Tues: '', Wed: '', Thur: '', Fri: '' };
  });

  const [remainingTime, setRemainingTime] = useState({ hours: 40, minutes: 0 });

  useEffect(() => {
    localStorage.setItem('hours', JSON.stringify(hours));

    const totalWorked = Object.values(hours)
      .reduce((total, h) => total + (parseFloat(h) || 0), 0);
    const totalMinutes = Math.floor(totalWorked * 60);
    const remainingMinutes = Math.max(2400 - totalMinutes, 0);

    const remainingHours = Math.floor(remainingMinutes / 60);
    const remainingMins = remainingMinutes % 60;

    setRemainingTime({ hours: remainingHours, minutes: remainingMins });
  }, [hours]);

  const handleInputChange = (day: keyof typeof hours, value: string) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setHours((prev) => ({ ...prev, [day]: value }));
    }
  };

  const handleReset = () => {
    localStorage.removeItem('hours');
    setHours({ Mon: '', Tues: '', Wed: '', Thur: '', Fri: '' });
  };

  // Manage multiple modals
  const [modalsOpen, setModalsOpen] = useState({ modal1: false, modal2: false });

  const openModal = (modalKey: keyof typeof modalsOpen) => setModalsOpen((prev) => ({ ...prev, [modalKey]: true }));
  const closeModal = (modalKey: keyof typeof modalsOpen) => setModalsOpen((prev) => ({ ...prev, [modalKey]: false }));

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <header className="w-full p-4 bg-blue-500 text-white">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">ADP-Mimic</h1>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      </header>
      <main className="w-full flex-grow flex flex-col items-center justify-start max-w-6xl mx-auto px-4 py-8">
        <div className="w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center text-blue-500 mb-4">
            Enter Hours Worked
          </h2>
          <div className="flex flex-col space-y-4">
            {(['Mon', 'Tues', 'Wed', 'Thur', 'Fri'] as const).map((day) => (
              <div key={day} className="flex items-center">
                <label className="w-16 text-gray-700">{day}:</label>
                <input
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*[.,]?[0-9]+" 
                  value={hours[day]}
                  onChange={(e) => handleInputChange(day, e.target.value)}
                  onFocus={(e) => e.target.select()}
                  className="w-full p-2 border rounded text-gray-700"
                  placeholder="Enter hours"
                />
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-xl text-gray-700">
              Hours Remaining: {remainingTime.hours} hrs {remainingTime.minutes} mins
            </p>
            <MessageComponent remainingTime={remainingTime} />
          </div>

          {/* First Modal */}
          <Modal isOpen={modalsOpen.modal1} onClose={() => closeModal('modal1')}>
  <div>
    <h2 className="text-2xl font-bold mb-4">25 Awesome Penguin Facts</h2>
    <ul className="list-disc list-inside">
      <li>Penguins are flightless birds, but they are excellent swimmers.</li>
      <li>The Emperor Penguin is the tallest of all penguin species, standing nearly 4 feet tall.</li>
      <li>Penguins can drink seawater. They have a gland that filters out the salt.</li>
      <li>The smallest penguin species is the Little Blue Penguin, which stands just over a foot tall.</li>
      <li>Penguins can dive to depths of over 500 meters (1,640 feet) in search of food.</li>
      <li>Most penguins live in the Southern Hemisphere, with a large population in Antarctica.</li>
      <li>Penguins huddle together to stay warm in cold climates, sometimes forming groups of thousands.</li>
      <li>Penguins have a layer of fat, called blubber, which helps them stay warm in icy waters.</li>
      <li>Penguins are social birds and often communicate through vocalizations and body language.</li>
      <li>Some penguin species mate for life, staying with the same partner year after year.</li>
      <li>The Adélie Penguin is known for its playful and curious nature, often approaching humans.</li>
      <li>Penguins lay one or two eggs per breeding season, and both parents share the responsibility of incubating the eggs.</li>
      <li>The fastest penguin species is the Gentoo Penguin, which can swim up to 22 mph (35 km/h).</li>
      <li>Penguins have a special oil gland that helps keep their feathers waterproof.</li>
      <li>Penguins spend up to 75% of their lives in the water, hunting for fish, squid, and krill.</li>
      <li>Some penguin species, like the Macaroni Penguin, have distinctive crests of yellow feathers on their heads.</li>
      <li>The largest penguin colony is on the Antarctic island of South Georgia, where millions of King Penguins reside.</li>
      <li>Penguin chicks have soft, fluffy down feathers that help keep them warm until they develop adult feathers.</li>
      <li>Penguins can leap out of the water and onto land in a movement called "porpoising."</li>
      <li>Penguins are monogamous during the breeding season, and many species return to the same nesting sites year after year.</li>
      <li>Penguins use their wings like flippers, propelling themselves through the water with powerful strokes.</li>
      <li>The name "penguin" is thought to have originated from the Welsh words "pen" (head) and "gwyn" (white).</li>
      <li>Penguins are highly adapted to their cold environments, with tightly packed feathers and a low surface area to volume ratio to reduce heat loss.</li>
      <li>Penguins are known for their distinctive black and white "tuxedo" appearance, which provides camouflage while swimming.</li>
      <li>Despite living in some of the coldest places on Earth, penguins are warm-blooded animals with a body temperature of around 100°F (38°C).</li>
    </ul>
  </div>
</Modal>


          {/* Second Modal */}
          <Modal isOpen={modalsOpen.modal2} onClose={() => closeModal('modal2')}>
  <div>
    <h2 className="text-2xl font-bold mb-4">The Principality of Sealand</h2>
    <p className="mb-4">
      The Principality of Sealand is a self-proclaimed micronation located on a former World War II sea fort, known as HM Fort Roughs, in the North Sea. Just off the coast of Suffolk, England, Sealand was established by the Bates family in 1967. Although it is not officially recognized by any government, Sealand operates with its own flag, currency, and even passports. Here are some fascinating facts and events in the history of this unique micronation.
    </p>
    <ul className="list-disc list-inside">
      <li>Sealand was founded on September 2, 1967, by Paddy Roy Bates, a former British Army Major who declared the fort an independent sovereign state.</li>
      <li>In 1968, a British workman entered Sealand’s territory, prompting Roy Bates to fire warning shots. The British government later took the case to court, but the judge ruled that Sealand was outside British jurisdiction.</li>
      <li>Sealand has its own constitution, established in 1975, which includes a preamble and seven articles.</li>
      <li>In 1978, Sealand was invaded by a group of German and Dutch mercenaries hired by Alexander Achenbach, who declared himself the Prime Minister of Sealand. Roy Bates and his son, Michael, quickly regained control of the fort and held Achenbach as a prisoner of war.</li>
      <li>Sealand has issued its own currency, the Sealand dollar, which is pegged to the US dollar. The coins are primarily collector's items.</li>
      <li>Sealand passports have been issued since the 1970s, although they have been involved in several scandals, including being linked to international crime rings in the 1990s.</li>
      <li>Sealand has its own national anthem, titled "E Mare Libertas" (From the Sea, Freedom), reflecting its motto.</li>
      <li>In 2000, Sealand was put up for sale for $750 million, but no buyer was found. The principality remains under the control of the Bates family.</li>
      <li>Sealand has survived several attempts at takeover and sabotage, including a 2006 fire that caused significant damage but was eventually repaired.</li>
      <li>Sealand has a small population, usually just a handful of people, but it has attracted a loyal following of supporters and has even hosted online gambling and data haven services in the past.</li>
    </ul>
  </div>
</Modal>

        </div>
      </main>
      <Footer openModal1={() => openModal('modal1')} openModal2={() => openModal('modal2')} /> {/* Pass modal control to Footer */}
    </div>
  );
};

export default App;
