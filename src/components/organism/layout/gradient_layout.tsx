interface GradientLayoutProps {
  children: React.ReactNode;
  classNames?: string;
}

export default function GradientLayout(props: GradientLayoutProps) {
  const { children, classNames } = props;
  return (
    <div className="bg-[url('/bg.svg')] bg-cover ">
      <div
        className={`${classNames} backdrop-blur-[80px] grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20] `}
      >
        <main className="flex flex-col gap-6 row-start-2 items-center">
          {children}
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
      </div>
    </div>
  );
}
