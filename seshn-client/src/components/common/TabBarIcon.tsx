import { Ionicon } from './Ionicon';

interface Props {
  routeName: string;
  focused: boolean;
  size: number;
  color: string;
}

export const TabBarIcon = ({ routeName, focused, size, color }: Props) => {
  let iconName;

  switch (routeName) {
    case 'Feed':
      iconName = 'list';
      break;
    case 'Library':
      iconName = 'library';
      break;
    case 'Profile':
      iconName = 'person';
      break;
    case 'SessionTracker':
      iconName = 'map';
      break;
    default:
      throw new Error(`No icon for ${routeName}`);
  }

  return (
    <Ionicon
      name={`${iconName}${focused ? '' : '-outline'}`}
      color={color}
      size={size}
    />
  );
};
