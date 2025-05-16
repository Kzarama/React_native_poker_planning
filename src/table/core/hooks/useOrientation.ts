import { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

export function useOrientation() {
  const [orientation, setOrientation] = useState<
    'portrait' | 'landscape-left' | 'landscape-right' | 'unknown'
  >('portrait');

  useEffect(() => {
    async function getInitialOrientation() {
      const orientationInfo = await ScreenOrientation.getOrientationAsync();
      setOrientationFromInfo(orientationInfo);
    }

    const setOrientationFromInfo = (
      orientationInfo: ScreenOrientation.Orientation,
    ) => {
      if (orientationInfo === ScreenOrientation.Orientation.LANDSCAPE_LEFT) {
        setOrientation('landscape-left');
      } else if (
        orientationInfo === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
      ) {
        setOrientation('landscape-right');
      } else if (
        orientationInfo === ScreenOrientation.Orientation.PORTRAIT_UP ||
        orientationInfo === ScreenOrientation.Orientation.PORTRAIT_DOWN
      ) {
        setOrientation('portrait');
      } else if (orientationInfo === ScreenOrientation.Orientation.UNKNOWN) {
        setOrientation('unknown');
      }
    };

    const subscription = ScreenOrientation.addOrientationChangeListener(
      (event) => {
        setOrientationFromInfo(event.orientationInfo.orientation);
      },
    );

    getInitialOrientation();

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  return orientation;
}
