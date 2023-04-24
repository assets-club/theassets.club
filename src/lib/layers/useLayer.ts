import { StaticImageData } from 'next/image';
import { useBreakpointValue } from '@chakra-ui/react';
import Layer from './Layer';

const breakpoints = ['base', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
type Breakpoint = (typeof breakpoints)[number];
type ResponsiveLayer = Partial<Omit<Layer, 'img' | 'z'>>;

function useLayerValue<K extends keyof ResponsiveLayer>(values: Partial<Record<Breakpoint, ResponsiveLayer>>, prop: K) {
  const propValues = breakpoints.reduce((map, breakpoint) => {
    if (typeof values?.[breakpoint]?.[prop] !== 'undefined') {
      map[breakpoint] = values[breakpoint]![prop];
    }

    return map;
  }, {} as Record<Breakpoint, ResponsiveLayer[K]>);

  return useBreakpointValue(propValues);
}

export default function useLayer(
  img: StaticImageData,
  z: number,
  values: Partial<Record<Breakpoint, ResponsiveLayer>>,
) {
  return {
    img,
    z,
    scale: useLayerValue(values, 'scale'),
    position: useLayerValue(values, 'position'),
    parallax: useLayerValue(values, 'parallax') ?? {},
    top: useLayerValue(values, 'top'),
  };
}
