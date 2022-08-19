import { Box, Text, useColorModeValue } from 'native-base';

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
      borderLeftWidth={1}
      borderLeftColor={useColorModeValue('bgLight', 'bgDark')}
    >
      <Text color="lightText" fontSize={24} fontWeight="bold">
        + {number}
      </Text>
    </Box>
  );
};
