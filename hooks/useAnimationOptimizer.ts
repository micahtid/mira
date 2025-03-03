import { useState, useEffect } from 'react';

interface AnimationSettings {
  shouldAnimate: boolean;
  reducedMotion: boolean;
  prefersLightMode: boolean;
}

export const useAnimationOptimizer = (): AnimationSettings => {
  const [settings, setSettings] = useState<AnimationSettings>({
    shouldAnimate: true,
    reducedMotion: false,
    prefersLightMode: true,
  });

  useEffect(() => {
    const updateSettings = () => {
      // Check device performance
      const isLowPerfDevice = 
        navigator.hardwareConcurrency <= 4 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      // Check user preferences
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const prefersLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;

      setSettings({
        shouldAnimate: !isLowPerfDevice,
        reducedMotion: prefersReducedMotion,
        prefersLightMode,
      });
    };

    updateSettings();

    // Listen for preference changes
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: light)');

    reducedMotionQuery.addEventListener('change', updateSettings);
    colorSchemeQuery.addEventListener('change', updateSettings);

    return () => {
      reducedMotionQuery.removeEventListener('change', updateSettings);
      colorSchemeQuery.removeEventListener('change', updateSettings);
    };
  }, []);

  return settings;
}; 