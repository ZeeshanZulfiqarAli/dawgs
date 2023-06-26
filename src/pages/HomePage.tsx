import Search from '../components/Search';
import { useCore, useCoreDispatch } from '../context/coreContext';
import ResultRow from '../components/ResultRow';
import sortUp from '../assets/arrow-up-a-z-solid.svg';
import sortDown from '../assets/arrow-down-a-z-solid.svg';
import Loader from '../components/Loader';

const HomePage = () => {
  const coreStore = useCore();
  const coreDispatch = useCoreDispatch();
  const { data, fetchStatus, order, pagination } = coreStore.dogs;

  const hasNextPage = pagination.count && pagination.page * 10 < pagination.count;
  const isAsc = order === 'ASC';

  const handleSortToggle = () => {
    coreDispatch({ type: 'CHANGE_ORDER', payload: isAsc ? 'DESC' : 'ASC' });
  };

  const handleLoadMore = () => {
    coreDispatch({
      type: 'INCREMENT_IMAGE_PAGE',
    });
  };

  return (
    <div className="container m-auto flex flex-col items-center justify-center my-20">
      <Search className="w-3/5 max-w-2xl" />
      {data.length > 0 && (
        <div className="flex justify-end w-full px-8 mt-16">
          <button
            className="flex rounded-md items-center gap-1 px-4 py-3 outline-slate-300 outline-1 outline hover:bg-zinc-200"
            onClick={handleSortToggle}
          >
            <span>Sort by Breed</span>
            <img src={isAsc ? sortUp : sortDown} className="w-[18px]" />
          </button>
        </div>
      )}
      <div className="flex flex-col w-full px-8 my-4 gap-6">
        {data.map((dataItem) => (
          <ResultRow key={dataItem.id} {...dataItem} />
        ))}
      </div>
      {fetchStatus === 'fetching' && <Loader />}
      {data.length > 0 && (
        <button
          onClick={handleLoadMore}
          className="mt-14 px-4 py-3 rounded-md bg-zinc-200 hover:bg-zinc-300 disabled:bg-zinc-100 disabled:text-gray-300"
          disabled={fetchStatus === 'fetching' || !hasNextPage}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default HomePage;
