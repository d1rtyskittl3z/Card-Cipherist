/**
 * Dungeon Helpers
 * Utilities for rendering AFR-style dungeon cards with procedural wall generation
 */

import type { Card, DungeonRoom, DungeonWallColor } from '../types/card.types';
import { loadImage, scaleX, scaleY, scaleHeight } from './canvasHelpers';

/**
 * Dungeon grid constants
 */
export const DUNGEON_CELL_SIZE = 0.0381; // Normalized cell size
export const DUNGEON_ORIGIN_X = 0.0734; // Grid origin X (normalized)
export const DUNGEON_ORIGIN_Y = 0.1377; // Grid origin Y (normalized)
export const DUNGEON_GRID_WIDTH = 16; // Grid width in cells
export const DUNGEON_GRID_HEIGHT = 19; // Grid height in cells

/**
 * Wall image cache to avoid reloading images
 */
interface DungeonImageCache {
  // Shape images (wall outlines)
  shapeTop: HTMLImageElement | null;
  shapeLeft: HTMLImageElement | null;
  shapeBottom: HTMLImageElement | null;
  shapeRight: HTMLImageElement | null;
  shapeTopRight: HTMLImageElement | null;
  shapeTopLeft: HTMLImageElement | null;
  shapeBottomRight: HTMLImageElement | null;
  shapeBottomLeft: HTMLImageElement | null;
  shapeOuter: HTMLImageElement | null;
  shapeDoorway: HTMLImageElement | null;

  // FX images (lighting effects)
  fxTop: HTMLImageElement | null;
  fxLeft: HTMLImageElement | null;
  fxBottom: HTMLImageElement | null;
  fxRight: HTMLImageElement | null;
  fxTopRight: HTMLImageElement | null;
  fxTopLeft: HTMLImageElement | null;
  fxBottomRight: HTMLImageElement | null;
  fxBottomLeft: HTMLImageElement | null;
  fxOuter: HTMLImageElement | null;
  fxDoorway: HTMLImageElement | null;

  // Misc
  doorwayCutout: HTMLImageElement | null;
  doorwayArrow: HTMLImageElement | null;

  // Wall textures by color
  textures: Record<DungeonWallColor, HTMLImageElement | null>;
}

let imageCache: DungeonImageCache | null = null;

/**
 * Initialize dungeon image cache
 */
export async function initializeDungeonImages(): Promise<DungeonImageCache> {
  if (imageCache) {
    return imageCache;
  }

  const basePath = '/img/frames/dungeon/walls';

  const [
    shapeTop,
    shapeLeft,
    shapeBottom,
    shapeRight,
    shapeTopRight,
    shapeTopLeft,
    shapeBottomRight,
    shapeBottomLeft,
    shapeOuter,
    shapeDoorway,
    fxTop,
    fxLeft,
    fxBottom,
    fxRight,
    fxTopRight,
    fxTopLeft,
    fxBottomRight,
    fxBottomLeft,
    fxOuter,
    fxDoorway,
    doorwayCutout,
    doorwayArrow,
    textureW,
    textureU,
    textureB,
    textureR,
    textureG,
    textureC,
  ] = await Promise.all([
    loadImage(`${basePath}/shape/top.png`),
    loadImage(`${basePath}/shape/left.png`),
    loadImage(`${basePath}/shape/bottom.png`),
    loadImage(`${basePath}/shape/right.png`),
    loadImage(`${basePath}/shape/topright.png`),
    loadImage(`${basePath}/shape/topleft.png`),
    loadImage(`${basePath}/shape/bottomright.png`),
    loadImage(`${basePath}/shape/bottomleft.png`),
    loadImage(`${basePath}/shape/outer.png`),
    loadImage(`${basePath}/shape/doorway.png`),
    loadImage(`${basePath}/fx/top.png`),
    loadImage(`${basePath}/fx/left.png`),
    loadImage(`${basePath}/fx/bottom.png`),
    loadImage(`${basePath}/fx/right.png`),
    loadImage(`${basePath}/fx/topright.png`),
    loadImage(`${basePath}/fx/topleft.png`),
    loadImage(`${basePath}/fx/bottomright.png`),
    loadImage(`${basePath}/fx/bottomleft.png`),
    loadImage(`${basePath}/fx/outer.png`),
    loadImage(`${basePath}/fx/doorway.png`),
    loadImage(`${basePath}/doorway.png`),
    loadImage(`${basePath}/arrow.png`),
    loadImage(`${basePath}/textures/w.png`),
    loadImage(`${basePath}/textures/u.png`),
    loadImage(`${basePath}/textures/b.png`),
    loadImage(`${basePath}/textures/r.png`),
    loadImage(`${basePath}/textures/g.png`),
    loadImage(`${basePath}/textures/c.png`),
  ]);

  imageCache = {
    shapeTop,
    shapeLeft,
    shapeBottom,
    shapeRight,
    shapeTopRight,
    shapeTopLeft,
    shapeBottomRight,
    shapeBottomLeft,
    shapeOuter,
    shapeDoorway,
    fxTop,
    fxLeft,
    fxBottom,
    fxRight,
    fxTopRight,
    fxTopLeft,
    fxBottomRight,
    fxBottomLeft,
    fxOuter,
    fxDoorway,
    doorwayCutout,
    doorwayArrow,
    textures: {
      W: textureW,
      U: textureU,
      B: textureB,
      R: textureR,
      G: textureG,
      C: textureC,
    },
  };

  return imageCache;
}

/**
 * Clear the image cache (useful for testing or when memory is tight)
 */
export function clearDungeonImageCache(): void {
  imageCache = null;
}

/**
 * Draw dungeon walls layer
 * This renders the wall structure onto the dungeon canvas
 */
export async function drawDungeonLayer(
  dungeonContext: CanvasRenderingContext2D,
  dungeonFXContext: CanvasRenderingContext2D,
  card: Card
): Promise<void> {
  if (!card.dungeon) {
    return;
  }

  const { rooms, wallColor } = card.dungeon;
  const cache = await initializeDungeonImages();

  const dungeonCanvas = dungeonContext.canvas;
  const dungeonFXCanvas = dungeonFXContext.canvas;

  // Calculate pixel values
  const cellSize = scaleHeight(card, DUNGEON_CELL_SIZE);
  const origX = scaleX(card, DUNGEON_ORIGIN_X);
  const origY = scaleY(card, DUNGEON_ORIGIN_Y);

  // Clear canvases
  dungeonContext.clearRect(0, 0, dungeonCanvas.width, dungeonCanvas.height);
  dungeonFXContext.clearRect(0, 0, dungeonFXCanvas.width, dungeonFXCanvas.height);

  // Draw walls for each room
  for (const room of rooms) {
    // Adjust width/height (original code subtracts 1)
    const adjustedWidth = room.width - 1;
    const adjustedHeight = room.height - 1;

    // Top-left corner
    if (cache.shapeTopLeft && cache.fxTopLeft) {
      dungeonContext.drawImage(
        cache.shapeTopLeft,
        origX + cellSize * room.x,
        origY + cellSize * room.y,
        cellSize,
        cellSize
      );
      dungeonFXContext.drawImage(
        cache.fxTopLeft,
        origX + cellSize * room.x,
        origY + cellSize * room.y,
        cellSize,
        cellSize
      );
    }

    // Top-right corner
    if (cache.shapeTopRight && cache.fxTopRight) {
      dungeonContext.drawImage(
        cache.shapeTopRight,
        origX + cellSize * (room.x + adjustedWidth),
        origY + cellSize * room.y,
        cellSize,
        cellSize
      );
      dungeonFXContext.drawImage(
        cache.fxTopRight,
        origX + cellSize * (room.x + adjustedWidth),
        origY + cellSize * room.y,
        cellSize,
        cellSize
      );
    }

    // Bottom-left corner
    if (cache.shapeBottomLeft && cache.fxBottomLeft) {
      dungeonContext.drawImage(
        cache.shapeBottomLeft,
        origX + cellSize * room.x,
        origY + cellSize * (room.y + adjustedHeight),
        cellSize,
        cellSize
      );
      dungeonFXContext.drawImage(
        cache.fxBottomLeft,
        origX + cellSize * room.x,
        origY + cellSize * (room.y + adjustedHeight),
        cellSize,
        cellSize
      );
    }

    // Bottom-right corner
    if (cache.shapeBottomRight && cache.fxBottomRight) {
      dungeonContext.drawImage(
        cache.shapeBottomRight,
        origX + cellSize * (room.x + adjustedWidth),
        origY + cellSize * (room.y + adjustedHeight),
        cellSize,
        cellSize
      );
      dungeonFXContext.drawImage(
        cache.fxBottomRight,
        origX + cellSize * (room.x + adjustedWidth),
        origY + cellSize * (room.y + adjustedHeight),
        cellSize,
        cellSize
      );
    }

    // Horizontal walls (top and bottom)
    for (let i = 1; i < adjustedWidth; i++) {
      if (cache.shapeTop && cache.fxTop) {
        dungeonContext.drawImage(
          cache.shapeTop,
          origX + cellSize * (room.x + i),
          origY + cellSize * room.y,
          cellSize,
          cellSize
        );
        dungeonFXContext.drawImage(
          cache.fxTop,
          origX + cellSize * (room.x + i),
          origY + cellSize * room.y,
          cellSize,
          cellSize
        );
      }

      if (cache.shapeBottom && cache.fxBottom) {
        dungeonContext.drawImage(
          cache.shapeBottom,
          origX + cellSize * (room.x + i),
          origY + cellSize * (room.y + adjustedHeight),
          cellSize,
          cellSize
        );
        dungeonFXContext.drawImage(
          cache.fxBottom,
          origX + cellSize * (room.x + i),
          origY + cellSize * (room.y + adjustedHeight),
          cellSize,
          cellSize
        );
      }
    }

    // Vertical walls (left and right)
    for (let i = 1; i < adjustedHeight; i++) {
      if (cache.shapeLeft && cache.fxLeft) {
        dungeonContext.drawImage(
          cache.shapeLeft,
          origX + cellSize * room.x,
          origY + cellSize * (room.y + i),
          cellSize,
          cellSize
        );
        dungeonFXContext.drawImage(
          cache.fxLeft,
          origX + cellSize * room.x,
          origY + cellSize * (room.y + i),
          cellSize,
          cellSize
        );
      }

      if (cache.shapeRight && cache.fxRight) {
        dungeonContext.drawImage(
          cache.shapeRight,
          origX + cellSize * (room.x + adjustedWidth),
          origY + cellSize * (room.y + i),
          cellSize,
          cellSize
        );
        dungeonFXContext.drawImage(
          cache.fxRight,
          origX + cellSize * (room.x + adjustedWidth),
          origY + cellSize * (room.y + i),
          cellSize,
          cellSize
        );
      }
    }
  }

  // Draw outer frame
  if (cache.shapeOuter && cache.fxOuter) {
    dungeonContext.drawImage(cache.shapeOuter, 0, 0, dungeonCanvas.width, dungeonCanvas.height);
    dungeonFXContext.drawImage(cache.fxOuter, 0, 0, dungeonFXCanvas.width, dungeonFXCanvas.height);
  }

  // Draw doorways for each room plus the entrance doorway
  // The entrance room is a virtual room above the grid that creates the entrance opening
  // Original CC: rooms.push([0,-2,16,1,7]) where indices are [x, y, width-1, height-1, door]
  // So the entrance doorway is at y = -2 + 1 = -1 (one cell above grid origin)
  const entranceRoom = { x: 0.4, y: -2, width: 17, height: 2, doors: [7] };
  const allRooms = [...rooms, entranceRoom];

  for (const room of allRooms) {
    const adjustedHeight = room.height - 1;

    for (const doorway of room.doors) {
      // Cut out doorway shape
      dungeonContext.globalCompositeOperation = 'destination-out';
      dungeonFXContext.globalCompositeOperation = 'destination-out';

      if (cache.doorwayCutout) {
        dungeonContext.drawImage(
          cache.doorwayCutout,
          origX + cellSize * (room.x + doorway - 0.5),
          origY + cellSize * (room.y + adjustedHeight)
        );
        dungeonFXContext.drawImage(
          cache.doorwayCutout,
          origX + cellSize * (room.x + doorway - 0.5),
          origY + cellSize * (room.y + adjustedHeight)
        );
      }

      // Draw doorway shape and FX (skip for entrance doorway to avoid artifacts in title area)
      dungeonContext.globalCompositeOperation = 'source-over';
      dungeonFXContext.globalCompositeOperation = 'source-over';

      const isEntranceDoorway = room.y === -2;
      if (cache.shapeDoorway && cache.fxDoorway && !isEntranceDoorway) {
        dungeonContext.drawImage(
          cache.shapeDoorway,
          origX + cellSize * (room.x + doorway - 0.5),
          origY + cellSize * (room.y + adjustedHeight)
        );
        dungeonFXContext.drawImage(
          cache.fxDoorway,
          origX + cellSize * (room.x + doorway - 0.5),
          origY + cellSize * (room.y + adjustedHeight)
        );
      }

      // Draw arrow (skip for entrance and exit doorways)
      if (!isEntranceDoorway && room.y + adjustedHeight !== 18 && cache.doorwayArrow) {
        dungeonFXContext.drawImage(
          cache.doorwayArrow,
          origX + cellSize * (room.x + doorway + 0.25), //This palces the arrow horizontally --dskz
          origY + cellSize * (room.y + adjustedHeight + 0.7) //This palces the arrow vertically --dskz
        );
      }
    }
  }

  // Apply texture color
  const texture = cache.textures[wallColor];
  if (texture) {
    dungeonContext.globalCompositeOperation = 'source-in';
    dungeonContext.drawImage(texture, 0, 0, dungeonCanvas.width, dungeonCanvas.height);
  }

  // Composite FX layer onto dungeon layer
  dungeonContext.globalCompositeOperation = 'source-over';
  dungeonContext.drawImage(dungeonFXCanvas, 0, 0, dungeonCanvas.width, dungeonCanvas.height);
}

/**
 * Generate text fields for dungeon rooms
 * Returns an object with text configurations for each room
 */
export function generateDungeonTextFields(
  rooms: DungeonRoom[],
  card: Card
): Record<string, import('../types/card.types').TextObject> {
  const textObjects: Record<string, import('../types/card.types').TextObject> = {};

  const cellSize = scaleHeight(card, DUNGEON_CELL_SIZE);
  const origX = scaleX(card, DUNGEON_ORIGIN_X);
  const origY = scaleY(card, DUNGEON_ORIGIN_Y);

  rooms.forEach((room, index) => {
    const roomNumber = index + 1;
    const adjustedWidth = room.width - 1;
    const adjustedHeight = room.height - 1;

    // Calculate normalized text bounds for this room
    const textX = (origX + cellSize * (room.x + 0.5)) / card.width;
    const textY = (origY + cellSize * (room.y + 0.5)) / card.height;
    const textWidth = (cellSize * adjustedWidth) / card.width;
    const textHeight = (cellSize * adjustedHeight) / card.height;

    let defaultText = `Room ${roomNumber}{lns}{fontmplantin}{fontsize-8}Effect.`;
    if (adjustedHeight < 3) {
      defaultText = defaultText.replace('{lns}', '   ');
    }

    textObjects[`dungeonRoom${roomNumber}`] = {
      name: `Dungeon Room ${roomNumber}`,
      text: defaultText,
      x: textX,
      y: textY,
      width: textWidth,
      height: textHeight,
      font: 'belerenb',
      size: 0.0324,
      color: 'black',
      align: 'center',
    };
  });

  return textObjects;
}

/**
 * Parse legacy room string format to DungeonRoom array
 * Format: "X,Y,Width,Height,Door1,Door2,..." per line
 */
export function parseRoomString(input: string): DungeonRoom[] {
  const rooms: DungeonRoom[] = [];
  const lines = input.replace(/ /g, '').split('\n');

  for (const line of lines) {
    if (!line.trim()) continue;

    const parts = line.split(',');
    if (parts.length < 4) continue;

    const x = parseInt(parts[0], 10);
    const y = parseInt(parts[1], 10);
    const width = parseInt(parts[2], 10);
    const height = parseInt(parts[3], 10);

    // Remaining parts are door positions
    const doors: number[] = [];
    for (let i = 4; i < parts.length; i++) {
      const doorPos = parseFloat(parts[i]);
      if (!isNaN(doorPos)) {
        doors.push(doorPos);
      }
    }

    if (!isNaN(x) && !isNaN(y) && !isNaN(width) && !isNaN(height)) {
      rooms.push({ x, y, width, height, doors });
    }
  }

  return rooms;
}

/**
 * Serialize DungeonRoom array to legacy string format
 */
export function serializeRooms(rooms: DungeonRoom[]): string {
  return rooms
    .map((room) => {
      const base = `${room.x},${room.y},${room.width},${room.height}`;
      if (room.doors.length > 0) {
        return `${base},${room.doors.join(',')}`;
      }
      return base;
    })
    .join('\n');
}
