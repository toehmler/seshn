import { IImageProps, Image } from 'native-base';

export const Logo = ({ ...rest }: IImageProps) => {
  return (
    <Image
      source={require('@/assets/images/logo.png')}
      alt="logo"
      borderRadius="full"
      size="10"
      {...rest}
    />
  );
};
