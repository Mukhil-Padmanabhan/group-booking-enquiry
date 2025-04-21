/* eslint-disable @typescript-eslint/ban-ts-comment */
import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

if (typeof window !== 'undefined') {
    class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  
    global.ResizeObserver = ResizeObserver;
  }