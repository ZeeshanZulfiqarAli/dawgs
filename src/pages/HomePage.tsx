import React from 'react';
import Search from '../components/Search';
import { useCore } from '../context/coreContext';
import ResultRow from '../components/ResultRow';

const HomePage = () => {
  const coreStore = useCore();
  const images = coreStore ? coreStore.images : [];

  console.log('images', images, coreStore);
  return (
    <div className="flex justify-center my-20">
      <Search className="w-3/5 max-w-2xl" />
      <div className="flex flex-col">
        {images.map((image) => (
          <ResultRow key={image.id} {...image} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
