import { IImage } from '../../types/dogs';

interface ResultRowProps extends IImage {}

const ResultRow = ({ breeds, url }: ResultRowProps) => {
  return (
    <div className="flex justify-between h-32 bg-slate-200 rounded-lg w-full px-4 py-3 shadow-lg">
      <div className="w-full">
        {
          <>
            <h4 className="font-semibold">Breed(s):</h4>
            {breeds.length ? breeds.map((breed) => breed.name).join(', ') : 'Unknown'}
          </>
        }
      </div>
      <img src={url} className="h-full w-auto rounded-lg object-contain max-w-xs" />
    </div>
  );
};

export default ResultRow;
