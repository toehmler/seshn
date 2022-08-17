import { Box, Text } from 'native-base';

interface Props {
  width: number;
  height: number;
  number: number;
}

export const MoreImagesOverlay = ({ width, height, number }: Props) => {
  return (
    <Box
      w={width}
      h={height}
      backgroundColor="black:alpha.50"
      position="absolute"
      justifyContent="center"
      alignItems="center"
    >
      <Text color="lightText" fontSize={24} fontWeight="bold">
        + {number}
      </Text>
    </Box>
  );
};
