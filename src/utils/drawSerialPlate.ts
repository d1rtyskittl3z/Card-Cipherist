/**
 * Draw a serial number plate (image + two text fields) onto a canvas context.
 * - Pure function: draws only via the provided CanvasRenderingContext2D
 * - No global state; all inputs provided via args
 * - Image loading is memoized in-module to avoid re-fetching
 */

export type TextAlign = 'left' | 'center' | 'right'

export interface TextSpec {
  name: string
  text: string
  x: number // normalized (0..1) in design space
  y: number // normalized (0..1) in design space
  width: number // normalized (0..1)
  height: number // normalized (0..1)
  oneLine: boolean
  font: string
  color: string
  size: number // normalized relative to 2010 height, like original usage
  align: TextAlign
}

export type DrawSerialPlateArgs = {
  ctx: CanvasRenderingContext2D
  serialSrc?: string // default '/img/frames/serial.png'
  serialNumber?: string | number
  serialTotal?: string | number
  serialX?: number // in design px (2010 space)
  serialY?: number // in design px (2814 space)
  serialScale?: number // multiplier (1.0 default)
  // Helpers convert normalized 0..1 coords to device pixels (caller provides)
  scaleX: (n: number) => number
  scaleY: (n: number) => number
  writeText: (opts: TextSpec, ctx: CanvasRenderingContext2D) => void
}

// Memoized image cache (per module)
const imageCache = new Map<string, Promise<HTMLImageElement> | HTMLImageElement>()

async function loadImageMemo(src: string): Promise<HTMLImageElement> {
  const cached = imageCache.get(src)
  if (cached instanceof HTMLImageElement) return cached
  if (cached) return cached

  const p = new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
  img.onerror = () => reject(new Error(`Failed to load serial plate image: ${src}`))
    img.src = src
  })

  imageCache.set(src, p)
  try {
    const img = await p
    imageCache.set(src, img) // replace promise with the loaded image
    return img
  } catch (err) {
    imageCache.delete(src) // allow retry on next call
    throw err
  }
}

function coerceNumber(val: unknown, fallback: number): number {
  const n = typeof val === 'string' ? Number(val) : (typeof val === 'number' ? val : NaN)
  return Number.isFinite(n) ? n : fallback
}

export async function drawSerialPlate(args: DrawSerialPlateArgs): Promise<void> {
  const {
    ctx,
    serialSrc = '/img/frames/serial.png',
    serialNumber,
    serialTotal,
    serialX,
    serialY,
    serialScale,
    scaleX,
    scaleY,
    writeText,
  } = args

  // Determine which text fields to render (plate still draws even if both empty)
  const hasNumber = serialNumber !== undefined && String(serialNumber).length > 0
  const hasTotal = serialTotal !== undefined && String(serialTotal).length > 0

  // Safe defaults (design space: 2010 x 2814)
  const xDesign = coerceNumber(serialX, 172)
  const yDesign = coerceNumber(serialY, 1383)
  const scale = coerceNumber(serialScale, 1.0)

  // Normalized sizes (same geometry as original snippet)
  const plateWNorm = (464 / 2010) * scale
  const plateHNorm = (143 / 2814) * scale
  const xNorm = xDesign / 2010
  const yNorm = yDesign / 2814

  try {
    // Load image once
    const serialImg = await loadImageMemo(serialSrc)

    // Compute pixel rect using delta to avoid needing scaleWidth/scaleHeight
    const pxX = scaleX(xNorm)
    const pxY = scaleY(yNorm)
    const pxW = Math.max(1, Math.round(scaleX(xNorm + plateWNorm) - pxX))
    const pxH = Math.max(1, Math.round(scaleY(yNorm + plateHNorm) - pxY))

    // Draw the plate image
    ctx.drawImage(serialImg, pxX, pxY, pxW, pxH)

    // Prepare text specs (normalized coordinates)
    const baseFont = 'gothambold'
    const color = 'white'
    const sizeNorm = (55 * scale) / 2010

    const numberText = hasNumber ? `{kerning3}${String(serialNumber)}` : ''
    const totalText = hasTotal ? `{kerning3}${String(serialTotal)}` : ''

    const numberSpec: TextSpec = {
      name: 'SerialNumber',
      text: numberText,
      x: (xDesign + (30 * scale)) / 2010,
      y: (yDesign + (52 * scale)) / 2814,
      width: (190 * scale) / 2010,
      height: (55 * scale) / 2814,
      oneLine: true,
      font: baseFont,
      color,
      size: sizeNorm,
      align: 'center',
    }

    const totalSpec: TextSpec = {
      name: 'SerialTotal',
      text: totalText,
      x: (xDesign + (251 * scale)) / 2010,
      y: (yDesign + (52 * scale)) / 2814,
      width: (190 * scale) / 2010,
      height: (55 * scale) / 2814,
      oneLine: true,
      font: baseFont,
      color,
      size: sizeNorm,
      align: 'center',
    }

    // Draw texts using provided writer
    if (numberText) writeText(numberSpec, ctx)
    if (totalText) writeText(totalSpec, ctx)
  } catch (err) {
    // Fail gracefully: swallow drawing if image load or text rendering fails
    // Optionally log to console during development
    // console.warn('drawSerialPlate: skipped due to error:', err)
    return
  }
}

/**
 * Example usage inside your render pipeline (e.g., useCanvasRender):
 *
 * await drawSerialPlate({
 *   ctx: cardContext, // the main compositing context
 *   serialSrc: '/img/frames/serial.png',
 *   serialNumber: card.serialNumber, // string | number
 *   serialTotal: card.serialTotal,   // string | number
 *   serialX: card.serialX,           // in 2010-design px
 *   serialY: card.serialY,           // in 2814-design px
 *   serialScale: card.serialScale,   // multiplier
 *   scaleX: (n) => scaleX(card, n),  // bind your existing helpers
 *   scaleY: (n) => scaleY(card, n),
 *   writeText: (spec, c) => writeText(spec, c),
 * })
 *
 * // Recommended order: after frames and watermark, before final export
 */
