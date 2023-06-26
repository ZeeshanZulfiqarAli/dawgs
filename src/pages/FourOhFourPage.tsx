import A from '../assets/404_1.jpeg';
import B from '../assets/404_2.jpeg';
import C from '../assets/404_3.jpeg';
import D from '../assets/404_4.jpeg';
import E from '../assets/404_5.jpeg';
import F from '../assets/404_6.jpeg';
import { generateRandomNumber } from '../utils/common';

const images = [A, B, C, D, E, F];

const FourOhFour = () => {
  const idx = generateRandomNumber(0, 5);
  return (
    <div className="container m-auto flex flex-col items-center justify-center">
      <img src={images[idx]} alt="404 - page not found" />
    </div>
  );
};

export default FourOhFour;
