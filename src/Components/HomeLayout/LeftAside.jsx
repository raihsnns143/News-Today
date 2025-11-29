import React, { Suspense } from 'react';
import Categories from './Categories';

const LeftAside = () => {
  return (
    <div className="space-y-4">
      <Suspense fallback={<span className="loading loading-bars loading-lg"></span>}>
        <Categories />
      </Suspense>
    </div>
  );
};

export default LeftAside;
