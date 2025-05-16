import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { useWindowDimensions } from 'react-native';

export default function RadialBackground() {
  const { width, height } = useWindowDimensions();

  return (
    <Svg
      height={height}
      width={width}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio='none'
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      <Defs>
        <RadialGradient
          id='grad'
          cx='50%'
          cy='50%'
          rx='50%'
          ry='50%'
          fx='50%'
          fy='50%'
        >
          <Stop offset='0%' stopColor='#330072' stopOpacity='1' />
          <Stop
            offset='100%'
            stopColor='rgba(31, 13, 63, 0.7)'
            stopOpacity='1'
          />
        </RadialGradient>
      </Defs>
      <Rect x='0' y='0' width={width} height={height} fill='url(#grad)' />
    </Svg>
  );
}
