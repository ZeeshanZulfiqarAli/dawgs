import { useEffect, useRef } from 'react';
import { useOnlineEffect } from 'react-network-detect';
import toast from 'react-hot-toast';
import { onlineManager } from '@tanstack/react-query';

const useNetworkIndicator = () => {
  const { isOnline } = useOnlineEffect();
  const isFirstRender = useRef(true);
  onlineManager.setOnline(isOnline);

  /**
   * The following useEffect will be executed twice in development mode as React.StrictMode is enabled
   * This would result in an extra toast showing up
   */
  useEffect(() => {
    // Don't show the connection restored when web app loaded initially
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!isOnline) {
      toast.error('Internet disconnected. Please check your connection and try again');
    } else {
      toast('Internet connection restored');
    }
  }, [isOnline]);

  return isOnline;
};

export default useNetworkIndicator;
