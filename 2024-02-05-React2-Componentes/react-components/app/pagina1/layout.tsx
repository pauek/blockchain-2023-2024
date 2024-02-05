
type Props = Readonly<{
	children: React.ReactNode;
}>;
export default function Layout({ children }: Props) {
  return <div className="flex flex-row h-full">
    <div className="w-[10em] bg-red-200">
      Menú lateral
    </div>
    <div className="flex-1">
      {children}
    </div>
  </div>  

}