import Image from 'next/future/image';
import { FC, useMemo } from 'react';

interface PlaceholderProps {
  width: number;
  height?: number;
  text?: string;
}

const Placeholder: FC<PlaceholderProps> = ({ width, height, text }) => {
  const url = useMemo(() => {
    let build = `//via.placeholder.com/${width}x${height ?? width}`;

    if (text) {
      build += '&text=' + text;
    }

    return build;
  }, [width, height, text]);

  return <Image src={url} alt="Placeholder image" width={width} height={height ?? width} />;
};

export default Placeholder;
