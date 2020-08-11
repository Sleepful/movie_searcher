import React from "react";
import { Helmet } from "react-helmet";
import "../../assets/styles.css";

export interface PageViewProps {
  children: React.ReactNode;
}

const PageView: React.SFC<PageViewProps> = ({ children }) => {
  return (
    <>
      <Helmet>
        <title>Movie Searcher</title>
        <body className='bg-gray-800 w-screen h-screen my-auto items-stretch flex' />
      </Helmet>
      <div className='flex flex-col justify-center items-center p-2 my-auto'>
        {children}
      </div>
    </>
  );
};

export default PageView;
