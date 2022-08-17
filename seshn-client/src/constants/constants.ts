import { MediaType, Sport } from '@/types';

export const SPORT_COLORS = {
  [Sport.SKIING]: 'red',
  [Sport.SNOWBOARDING]: 'orange',
  [Sport.SURFING]: 'yellow',
  [Sport.CYCLING]: 'green',
  [Sport.CLIMBING]: 'blue',
  [Sport.RUNNING]: 'purple',
};

export const POSTS = [
  {
    id: '1',
    userId: '1',
    title: 'Skiing',
    sports: [Sport.SKIING],
    likes: 200,
    date: '2022-01-01 00:00:00',
    assets: [
      {
        id: '1',
        type: MediaType.IMAGE,
        uri: require('@/assets/images/image-1.jpg'),
      },
      {
        id: '2',
        type: MediaType.IMAGE,
        uri: require('@/assets/images/image-2.jpg'),
      },
      {
        id: '3',
        type: MediaType.IMAGE,
        uri: require('@/assets/images/image-3.jpg'),
      },
      {
        id: '4',
        type: MediaType.IMAGE,
        uri: require('@/assets/images/image-4.jpg'),
      },
      // {
      //   id: 'video-1',
      //   type: MediaType.VIDEO,
      //   uri: require('@/assets/videos/video-1.mp4'),
      // },
    ],
  },
  {
    id: '2',
    userId: '2',
    title: 'Snowboarding',
    sports: [Sport.SNOWBOARDING],
    likes: 45,
    date: '2022-06-01 00:00:00',
    assets: [
      {
        id: '1',
        type: MediaType.IMAGE,
        uri: require('@/assets/images/image-1.jpg'),
      },
      {
        id: '2',
        type: MediaType.IMAGE,
        uri: require('@/assets/images/image-2.jpg'),
      },
      // {
      //   id: '3',
      //   type: MediaType.IMAGE,
      //   uri: require('@/assets/images/image-3.jpg'),
      // },
      // {
      //   id: '4',
      //   type: MediaType.IMAGE,
      //   uri: require('@/assets/images/image-4.jpg'),
      // },
      {
        id: 'video-2',
        type: MediaType.VIDEO,
        uri: require('@/assets/videos/video-2.mp4'),
      },
    ],
  },
  {
    id: '3',
    userId: '3',
    title: 'Surfing',
    sports: [Sport.SURFING],
    likes: 3,
    date: '2022-05-01 00:00:00',
    assets: [
      {
        id: '1',
        type: MediaType.IMAGE,
        uri: require('@/assets/images/image-1.jpg'),
      },
      {
        id: '2',
        type: MediaType.IMAGE,
        uri: require('@/assets/images/image-2.jpg'),
      },
      {
        id: '3',
        type: MediaType.IMAGE,
        uri: require('@/assets/images/image-3.jpg'),
      },
      // {
      //   id: '4',
      //   type: MediaType.IMAGE,
      //   uri: require('@/assets/images/image-4.jpg'),
      // },
      // {
      //   id: 'video-3',
      //   type: MediaType.VIDEO,
      //   uri: require('@/assets/videos/video-3.mp4'),
      // },
    ],
  },
  {
    id: '4',
    userId: '1',
    title: 'Cycling',
    sports: [Sport.CYCLING],
    likes: 15,
    date: '2022-02-01 00:00:00',
    assets: [
      {
        id: '1',
        type: MediaType.IMAGE,
        uri: require('@/assets/images/image-1.jpg'),
      },
      {
        id: '2',
        type: MediaType.IMAGE,
        uri: require('@/assets/images/image-2.jpg'),
      },
      {
        id: '3',
        type: MediaType.IMAGE,
        uri: require('@/assets/images/image-3.jpg'),
      },
      {
        id: '4',
        type: MediaType.IMAGE,
        uri: require('@/assets/images/image-4.jpg'),
      },
      {
        id: 'video-4',
        type: MediaType.VIDEO,
        uri: require('@/assets/videos/video-4.mp4'),
      },
    ],
  },
];
