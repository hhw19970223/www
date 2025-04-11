import { Suspense } from 'react';
import { DetectLanguageChange } from './DetectLanguageChange';

export function Initialization() {
  return (
    <Suspense>
      <DetectLanguageChange />
    </Suspense>
  );
}
