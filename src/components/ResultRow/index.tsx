import { IImage } from '../../types/dogs';
import infoSVG from '../../assets/info-solid.svg';
import DetailsModal from '../DetailsModal';
import { useState } from 'react';
import styles from './style.module.css';
import classNames from 'classnames';

interface ResultRowProps extends IImage {}

const ResultRow = ({ breeds, url, id }: ResultRowProps) => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const handleModalToggle = () => {
    setisModalOpen((_) => !_);
  };

  return (
    <div
      className={classNames(
        'flex justify-between relative h-32 bg-slate-200 rounded-lg w-full px-4 py-3 shadow-lg',
        styles.resultContainer,
      )}
    >
      <div className="w-full">
        <h4 className="font-semibold">Breed(s):</h4>
        {breeds.length ? breeds.map((breed) => breed.name).join(', ') : <i>Unknown</i>}
      </div>
      <img src={url} className="h-full w-auto rounded-lg object-contain max-w-xs" />
      <button
        className={classNames(
          'rounded-full p-1 absolute top-5 right-6 bg-white backdrop-blur-sm',
          styles.infoButton,
        )}
        onClick={handleModalToggle}
      >
        <img src={infoSVG} className="h-[15px] w-[15px]" />
      </button>
      <DetailsModal
        isOpen={isModalOpen}
        onRequestClose={handleModalToggle}
        breeds={breeds}
        imageUrl={url}
        id={id}
      />
    </div>
  );
};

export default ResultRow;
