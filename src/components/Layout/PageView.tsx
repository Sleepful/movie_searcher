import React from "react";
import { Helmet } from "react-helmet";
import "../../assets/styles.css";

export interface PageViewProps {
  children: React.ReactNode;
}

const PageView: React.SFC<PageViewProps> = ({ children }) => {
  // const helmet = Helmet.renderStatic();
  // const bodyAttrs = helmet.bodyAttributes.toComponent();
  return (
    <>
      <Helmet>
        <body className='bg-gray-800 w-screen h-screen flex flex-col justify-center items-stretch' />
      </Helmet>
      <div className='flex flex-col justify-center items-center p-2'>
        {children}
      </div>
    </>
  );
};

export default PageView;
