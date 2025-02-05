// Add this at the very top of your file
'use client';

import React, { useEffect } from 'react';
import Image, { type ImageProps } from 'next/image';
import { Button } from '@repo/ui/button';
import styles from './page.module.css';
import { add } from '@abccomp/test-lib';
import { mypackage } from '@abccomp/test-lib';
import '@abccomp/test-lib/style';

type Props = Omit<ImageProps, 'src'> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className='imgLight' />
      <Image {...rest} src={srcDark} className='imgDark' />
    </>
  );
};

export default function Home() {
  useEffect(() => {
    // This code will run on the client-side only
    const container = document.getElementById('editor123');
    if (container) {
      console.log('Container found', container);
      mypackage('editor123');
    }
  }, []);

  return (
    <div className="">
      <div className='p-10'>
        <div>{add(10, 30)}</div>
        <div id='editor123' className='ui-p-10'></div>
      </div>


    </div>
  );
}
