'use client';

import { Icon as Iconify } from '@iconify/react';

function Icon({
  icon,
  width = 24,
  height = 24,
}: {
  icon: string;
  width: number;
  height: number;
}) {
  return <Iconify icon={icon} width={width} height={height} />;
}

export default Icon;
