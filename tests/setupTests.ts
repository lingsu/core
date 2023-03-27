import React from 'react';

global.React = React;

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useLayoutEffect: jest.requireActual('react').useEffect,
  }));
  
  jest.setTimeout(60000);