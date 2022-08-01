import { useAppSelector } from './useAppSelector';

export const useFeedOptions = () => useAppSelector((state) => state.feed);
