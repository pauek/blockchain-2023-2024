type Props = {
  children: React.ReactNode;
  color: string;
};
export default function Box({ children, color }: Props) {
  let bgcol: string = "";
  switch (color) {
    case "red": bgcol = "bg-red-600"; break;
    case "green": bgcol = "bg-green-600"; break;
    default: bgcol = "bg-grey"; break;
  }
  return <div className={`p-4 ${bgcol}`}>{children}</div>;
}
