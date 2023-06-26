import React, { useEffect, useState } from 'react';
import searchIcon from '../../assets/search.svg';
import classNames from 'classnames';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getImages } from '../../api/dogs';
import { useCore, useCoreDispatch } from '../../context/coreContext';
import { Order } from '../../types/dogs';

interface SearchProps {
  className?: string;
  order?: Order;
}

const Search = ({ className, order }: SearchProps) => {
  const [initialQueryParam] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(initialQueryParam.get('q') || '');
  const coreStore = useCore();
  const { pagination } = coreStore.dogs;
  const coreDispatch = useCoreDispatch();
  const navigate = useNavigate();

  const { fetchStatus, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['images', order],
    queryFn: ({ pageParam = pagination }) =>
      getImages(searchQuery, pageParam?.page || 0, 10, order),
    // The query will not execute until the query param exists
    enabled: !!initialQueryParam.get('q'),
  });

  useEffect(() => {
    if (data && data.pages[0]) {
      const { paginationPage, paginationCount } = data.pages[data.pages.length - 1];
      const imageData = data.pages.reduce(
        (arr: any, { imageData }) => arr.concat(imageData),
        [],
      );
      coreDispatch({ type: 'ADD_IMAGES', payload: imageData });
      coreDispatch({
        type: 'ADD_IMAGE_PAGINATION',
        payload: { page: paginationPage, count: paginationCount },
      });
    }
  }, [data]);

  useEffect(() => {
    if (searchQuery) handleSearch();
  }, []);

  useEffect(() => {
    if (data && pagination.page !== data.pages[data.pages.length - 1].paginationPage) {
      fetchNextPage({ pageParam: pagination });
    }
  }, [pagination]);

  useEffect(() => {
    if (fetchStatus) {
      coreDispatch({ type: 'UPDATE_IMAGE_FETCH_STATUS', payload: fetchStatus });
    }
  }, [fetchStatus]);

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
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className={classNames('flex gap-3', className)}>
      <input
        type="text"
        className="w-full border rounded-lg px-4 py-3 border-gray-300 outline-slate-300"
        placeholder="Search dogs by breed name"
        value={searchQuery}
        onChange={handleOnChangeQuery}
        onKeyDown={handleOnKeyDownQuery}
      />
      <button disabled={!searchQuery} onClick={handleSearch}>
        <img src={searchIcon} alt="Search" className="h-1/3 w-[15px]" />
      </button>
    </div>
  );
};

export default Search;
