import React, { useEffect, useState } from 'react';
import searchIcon from '../../assets/search.svg';
import classNames from 'classnames';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getImages } from '../../api/dogs';
import { useCoreDispatch } from '../../context/coreContext';

interface SearchProps {
  className?: string;
}

const Search = ({ className }: SearchProps) => {
  const [initialQueryParam] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(initialQueryParam.get('q') || '');
  const [triggerSearch, setTriggerSearch] = useState(false);
  const coreDispatch = useCoreDispatch();
  const navigate = useNavigate();

  const {
    fetchStatus,
    data: dogImages,
    refetch,
  } = useQuery({
    queryKey: ['images'],
    queryFn: () => getImages(searchQuery, 0, 10),
    // The query will not execute until the userId exists
    enabled: triggerSearch,
  });

  console.log(fetchStatus);
  useEffect(() => {
    if (dogImages) coreDispatch({ type: 'APPEND_IMAGES', payload: dogImages });
    console.log('0-0-0-0-', dogImages);
  }, [dogImages]);

  const handleOnChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleOnKeyDownQuery = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery) {
      e.preventDefault();
      e.stopPropagation();
      e.target.blur();
      handleSearch();
    }
  };

  const handleSearch = () => {
    setTriggerSearch(true);
    if (triggerSearch) refetch();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className={classNames('flex gap-3', className)}>
      <input
        type="text"
        className="w-full border rounded-lg px-4 py-3 border-gray-300 outline-slate-300"
        value={searchQuery}
        onChange={handleOnChangeQuery}
        onKeyDown={handleOnKeyDownQuery}
      />
      <button disabled={!searchQuery} onClick={handleSearch}>
        <img src={searchIcon} alt="Search" className="h-1/3" />
      </button>
    </div>
  );
};

export default Search;
