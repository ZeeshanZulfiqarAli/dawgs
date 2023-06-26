import React, { useEffect, useState } from 'react';
import searchIcon from '../../assets/search.svg';
import classNames from 'classnames';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getImages } from '../../api/dogs';
import { useCore, useCoreDispatch } from '../../context/coreContext';

interface SearchProps {
  className?: string;
}

const Search = ({ className }: SearchProps) => {
  const [initialQueryParam] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(initialQueryParam.get('q') || '');
  const coreStore = useCore();
  const { pagination, order } = coreStore.dogs;
  const coreDispatch = useCoreDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { fetchStatus, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['images', searchQuery, order],
    queryFn: ({ pageParam = pagination }) =>
      getImages(searchQuery, pageParam?.page || 0, 10, order),
    // The query will not execute until the query param exists
    enabled: !!initialQueryParam.get('q'),
    getNextPageParam: (lastPage) => {
      const potentialNextPage = lastPage.paginationPage + 1;
      if (potentialNextPage * 10 <= lastPage.paginationCount) {
        return { page: potentialNextPage, count: lastPage.paginationCount };
      } else {
        return;
      }
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.paginationPage === 0) {
        return;
      }
      return { page: firstPage.paginationPage - 1, count: firstPage.paginationCount };
    },
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
    // data &&
    //   data.pages.length === 1 &&
    //   queryClient.setQueryData(['images', searchQuery, order], (o) => {
    //     console.log('setquerydata', o);
    //     return { ...o, pageParams: [{ page: 0, count: null }] };
    //   });
    if (data && pagination.page !== data.pages[data.pages.length - 1].paginationPage) {
      // console.log('fetch next ', pagination);
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
      (e.target as HTMLInputElement).blur();
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
