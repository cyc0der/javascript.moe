import { MotionValue, useTransform } from "framer-motion";

export const useParallax = (
  value: MotionValue<number>,
  distance: number,
  offset: number,
  ease?: any
) => {
  return useTransform(value, [1, 0], [-distance - offset, distance - offset], {
    ease,
  });
};
