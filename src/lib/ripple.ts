export type RippleInput = {
  width: number;
  height: number;
  x: number;
  y: number;
  center?: boolean;
};

/** MUI TouchRipple.computeRippleState */
export function computeRipple({ width, height, x, y, center }: RippleInput) {
  let rippleX = Math.round(x);
  let rippleY = Math.round(y);
  if (center) {
    rippleX = Math.round(width / 2);
    rippleY = Math.round(height / 2);
  }
  let rippleSize: number;
  if (center) {
    rippleSize = Math.sqrt((2 * width ** 2 + height ** 2) / 3);
    if (rippleSize % 2 === 0) rippleSize += 1;
  } else {
    const sizeX = Math.max(Math.abs(width - rippleX), rippleX) * 2 + 2;
    const sizeY = Math.max(Math.abs(height - rippleY), rippleY) * 2 + 2;
    rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
  }
  return { rippleX, rippleY, rippleSize };
}
