import React from 'react';

interface ModalContentProps {
  modalType: 'modal1' | 'modal2';
}

const ModalContent: React.FC<ModalContentProps> = ({ modalType }) => {
  if (modalType === 'modal1') {
    return (
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
    );
  }

  if (modalType === 'modal2') {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">The Principality of Sealand</h2>
        <p className="mb-4">
          The Principality of Sealand is a self-proclaimed micronation located on a former World War II sea fort, known as HM Fort Roughs, in the North Sea. Just off the coast of Suffolk, England, Sealand was established by the Bates family in 1967. Although it is not officially recognized by any government, Sealand operates with its own flag, currency, and even passports. Here are some fascinating facts and events in the history of this unique micronation.
        </p>
        <ul className="list-disc list-inside space-y-2">
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
    );
  }

  return null;
};

export default ModalContent;
