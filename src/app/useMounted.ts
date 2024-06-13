'use client';

import { useEffect, useState } from 'react';

export const useMounted = () => {
  const [mounted, setMounted] = useState<boolean>();

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};
