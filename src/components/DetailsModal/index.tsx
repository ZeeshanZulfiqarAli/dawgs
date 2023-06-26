import Modal from 'react-modal';
import classNames from 'classnames';
import { IBreed } from '../../types/dogs';
import crossSVG from '../../assets/xmark-solid.svg';
import styles from './style.module.css';
import React from 'react';

Modal.setAppElement('#root');

interface IDetailProperty {
  title: string;
  key: keyof IBreed;
}

const detailProperties: IDetailProperty[] = [
  { title: 'Breed', key: 'name' },
  { title: 'Origin', key: 'origin' },
  { title: 'Life Span', key: 'life_span' },
  { title: 'Bred for', key: 'bred_for' },
  { title: 'Temprament', key: 'temperament' },
];

interface DetailsModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  breeds: IBreed[];
  imageUrl: string;
  id: string;
}

const DetailsModal = ({
  isOpen,
  onRequestClose,
  breeds,
  imageUrl,
  id,
}: DetailsModalProps) => {
  const breed = breeds[0];
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Dog details"
      className="inset-0 border-none flex justify-center align-middle rounded-xl shadow-xl relative"
      overlayClassName="fixed inset-0 bg-white/80 flex justify-center items-center align-middle backdrop-blur-sm"
    >
      <div
        className={classNames(
          'flex flex-row justify-between items-center gap-8 rounded-xl bg-blue-200/30 backdrop-blur-md p-6',
          styles.detailsModal,
        )}
      >
        <div className="flex flex-col gap-3">
          {breed &&
            detailProperties.map(({ title, key }) =>
              breed[key] ? (
                <span key={id + key}>
                  <h4 className="font-semibold">{title}:</h4>
                  {breed[key]}
                </span>
              ) : (
                <React.Fragment key={id + key}></React.Fragment>
              ),
            )}
        </div>
        <img
          src={imageUrl}
          className="h-auto w-auto rounded-xl object-contain max-w-xs"
        />
        <button
          className={classNames(
            'rounded-full p-1 absolute top-10 right-8 bg-white backdrop-blur-sm',
            styles.crossButton,
          )}
          onClick={onRequestClose}
        >
          <img src={crossSVG} className="h-[15px] w-[15px]" />
        </button>
      </div>
    </Modal>
  );
};

export default DetailsModal;
