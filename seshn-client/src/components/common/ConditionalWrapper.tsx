import { Center } from 'native-base';

interface Props {
  condition: boolean;
  wrapper: (children: React.ReactNode) => JSX.Element;
  children: React.ReactNode;
  falseWrapper?: (children: React.ReactNode) => JSX.Element;
}

export const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
  falseWrapper,
}: Props) => {
  return condition ? (
    wrapper(children)
  ) : falseWrapper ? (
    falseWrapper(children)
  ) : (
    <>{children}</>
  );
};
