import { Library, MainLayout } from '@/components';
import { useAppSelector } from '@/hooks';

export const LibraryScreen = () => {
  const { sessions } = useAppSelector((state) => state.library);

  return (
    <MainLayout>
      <Library sessions={sessions} />
    </MainLayout>
  );
};
