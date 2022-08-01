import { Box, Center, ICenterProps, useColorModeValue } from 'native-base';

interface Props extends ICenterProps {
  contentWidth?: string | number;
  centered?: boolean;
}

export const MainLayout = ({
  backgroundColor,
  safeAreaTop = 0,
  safeAreaBottom = 0,
  safeAreaLeft = true,
  safeAreaRight = true,
  contentWidth = '100%',
  centered = true,
  children,
  ...rest
}: Props) => {
  const defaultBackgroundColor = useColorModeValue('bgLight', 'bgDark');

  const Wrapper = centered ? Center : Box;

  return (
    <Center
      flex={1}
      safeArea
      safeAreaBottom={safeAreaBottom}
      safeAreaLeft={safeAreaLeft}
      safeAreaRight={safeAreaRight}
      safeAreaTop={safeAreaTop}
      bg={backgroundColor || defaultBackgroundColor}
      {...rest}
    >
      <Wrapper w={contentWidth} flex={1}>
        {children}
      </Wrapper>
    </Center>
  );
};
