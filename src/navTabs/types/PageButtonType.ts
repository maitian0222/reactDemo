export default interface PageButtonType {
  title: string;
  icon: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
