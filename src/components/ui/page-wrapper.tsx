import {ReactNode} from "react";

type PageWrapperProps = {
  children: ReactNode;
};
export const PageWrapper = (props: PageWrapperProps) => {
  const { children } = props;
  return (
    <div className="w-full h-screen flex flex-row md:pt-6 md:justify-center overflow-y-scroll bg-gray-50">
      <div className="w-full md:w-[95%] flex flex-col mx-auto">{children}</div>
    </div>
  );
};
