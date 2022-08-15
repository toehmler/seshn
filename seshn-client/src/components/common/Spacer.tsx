import { Box, IBoxProps } from 'native-base';

interface Props extends IBoxProps {
  size: number | string;
  direction?: 'row' | 'column';
}

export const Spacer = ({ size, direction, ...rest }: Props) => {
  const height = direction === 'column' ? 1 : size;
  const width = direction === 'row' ? 1 : size;

  return <Box h={height} minH={height} w={width} minW={width} {...rest} />;
};
