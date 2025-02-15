import React, { FC, ReactElement } from 'react';

interface ErrorBodyProps {
  Icon: ReactElement;
  description: string;
}

const ErrorBody: FC<ErrorBodyProps> = ({ description, Icon }) => {
  return (
    <div className='flex flex-col gap-5 items-center justify-center'>
      {Icon}
      <p className='text-lg font-semibold'>{description}</p>
    </div>
  );
};

export default ErrorBody;
