import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

export default function RadialBackground() {
  return (
    <Svg height='100%' width='100%' style={{ position: 'absolute' }}>
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
      <Rect x='0' y='0' width='100%' height='100%' fill='url(#grad)' />
    </Svg>
  );
}
