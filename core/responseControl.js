import { useState } from 'react';

export const responseControl = intent => {
  return () => {
    console.log(intent);
  };
};
