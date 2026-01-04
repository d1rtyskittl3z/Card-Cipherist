/**
 * HSL Color Adjustment Utility
 * Ported from Card Conjurer's hsl() function
 *
 * Applies Hue/Saturation/Lightness adjustments to canvas image data
 */

/**
 * Convert RGB values to HSL
 * @param r Red (0-255)
 * @param g Green (0-255)
 * @param b Blue (0-255)
 * @returns [h, s, l] where h is 0-360, s and l are 0-100
 */
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return [h * 360, s * 100, l * 100];
}

/**
 * Convert HSL values to RGB
 * @param h Hue (0-360)
 * @param s Saturation (0-100)
 * @param l Lightness (0-100)
 * @returns [r, g, b] where values are 0-255
 */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360;
  s /= 100;
  l /= 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * Apply HSL adjustments to a canvas
 * @param canvas The canvas to modify (in place)
 * @param hue Hue shift (-180 to 180)
 * @param saturation Saturation adjustment (-100 to 100)
 * @param lightness Lightness adjustment (-100 to 100)
 */
export function applyHSL(
  canvas: HTMLCanvasElement,
  hue: number,
  saturation: number,
  lightness: number
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    // Alpha is at i + 3, preserve it

    // Skip fully transparent pixels
    if (pixels[i + 3] === 0) continue;

    // Convert to HSL
    let [h, s, l] = rgbToHsl(r, g, b);

    // Apply adjustments
    h = (h + hue + 360) % 360;
    s = Math.max(0, Math.min(100, s + saturation));
    l = Math.max(0, Math.min(100, l + lightness));

    // Convert back to RGB
    const [newR, newG, newB] = hslToRgb(h, s, l);

    pixels[i] = newR;
    pixels[i + 1] = newG;
    pixels[i + 2] = newB;
    // Alpha remains unchanged
  }

  ctx.putImageData(imageData, 0, 0);
}

/**
 * Apply HSL adjustments to ImageData directly (for use with mask processing)
 * @param imageData The ImageData to modify (in place)
 * @param hue Hue shift (-180 to 180)
 * @param saturation Saturation adjustment (-100 to 100)
 * @param lightness Lightness adjustment (-100 to 100)
 */
export function applyHSLToImageData(
  imageData: ImageData,
  hue: number,
  saturation: number,
  lightness: number
): void {
  const pixels = imageData.data;

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    // Skip fully transparent pixels
    if (pixels[i + 3] === 0) continue;

    // Convert to HSL
    let [h, s, l] = rgbToHsl(r, g, b);

    // Apply adjustments
    h = (h + hue + 360) % 360;
    s = Math.max(0, Math.min(100, s + saturation));
    l = Math.max(0, Math.min(100, l + lightness));

    // Convert back to RGB
    const [newR, newG, newB] = hslToRgb(h, s, l);

    pixels[i] = newR;
    pixels[i + 1] = newG;
    pixels[i + 2] = newB;
  }
}
