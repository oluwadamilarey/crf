import { SVGProps } from 'react';

export function InfoIcon({
  width = 49,
  height = 48,
  fill = '#211100',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 49 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3 24C3 12.1259 12.6259 2.5 24.5 2.5C36.3741 2.5 46 12.1259 46 24C46 35.8741 36.3741 45.5 24.5 45.5C12.6259 45.5 3 35.8741 3 24ZM24.5 21.5C25.3284 21.5 26 22.1716 26 23V33C26 33.8284 25.3284 34.5 24.5 34.5C23.6716 34.5 23 33.8284 23 33V23C23 22.1716 23.6716 21.5 24.5 21.5ZM25.635 16.0035C26.1891 15.3877 26.1392 14.4393 25.5235 13.8851C24.9077 13.3309 23.9593 13.3808 23.4051 13.9966L23.3851 14.0188C22.8309 14.6346 22.8808 15.583 23.4966 16.1372C24.1123 16.6914 25.0608 16.6414 25.615 16.0257L25.635 16.0035Z'
        fill={fill}
      />
    </svg>
  );
}
