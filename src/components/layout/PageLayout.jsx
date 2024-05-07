import React from 'react';

const PageLayout = ({ children }) => {
  return (
    <>
      <div className='container-fluid'>
        <div className='wrapper'>{children}</div>
      </div>
    </>
  );
};

export default PageLayout;
