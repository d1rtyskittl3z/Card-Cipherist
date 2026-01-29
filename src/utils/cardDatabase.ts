/**
 * IndexedDB utility for storing and retrieving cards locally in the browser
 */

import type { Card } from '../types/card.types';

const DB_NAME = 'CardCipheristDB';
const DB_VERSION = 1;
const STORE_NAME = 'cards';

export interface StoredCard {
  id?: string;           // UUID
  name: string;          // Card name (from card.text.title or custom)
  timestamp: number;     // Save time
  card: Card;            // Full card data
  thumbnail?: string;    // Optional base64 thumbnail
  artImageData?: string; // Optional base64 art image
  globalManaPrefix?: string; // Optional mana symbol style prefix
}

export interface LoadedCardData {
  card: Card;
  artImageData?: string;
  globalManaPrefix?: string;
}

/**
 * Generate a UUID v4
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Initialize the IndexedDB database
 */
export async function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(new Error('Failed to open IndexedDB'));
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create object store if it doesn't exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'id' });

        // Create indexes
        objectStore.createIndex('timestamp', 'timestamp', { unique: false });
        objectStore.createIndex('name', 'name', { unique: false });
      }
    };
  });
}

/**
 * Strip non-serializable image objects from card data
 * This is necessary because HTMLImageElement cannot be cloned for IndexedDB storage
 */
function stripImageObjects(card: Card): Card {
  // Create a deep copy and remove image references
  const cardCopy = JSON.parse(JSON.stringify(card)) as Card;

  // Remove frame images
  if (cardCopy.frames) {
    cardCopy.frames = cardCopy.frames.map((frame) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { image, ...frameWithoutImage } = frame;
      return {
        ...frameWithoutImage,
        masks: frame.masks?.map((mask) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { image: maskImage, ...maskWithoutImage } = mask;
          return maskWithoutImage;
        }),
      } as typeof frame;
    });
  }

  return cardCopy;
}

/**
 * Save a card to IndexedDB
 * @param card - The card data to save
 * @param customName - Optional custom name (falls back to card title)
 * @param thumbnail - Optional base64 thumbnail image
 * @param artImageData - Optional base64 art image
 * @param globalManaPrefix - Optional mana symbol style prefix
 * @returns The ID of the saved card
 */
export async function saveCard(
  card: Card,
  customName?: string,
  thumbnail?: string,
  artImageData?: string,
  globalManaPrefix?: string
): Promise<string> {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const objectStore = transaction.objectStore(STORE_NAME);

    const id = generateUUID();
    const name = customName || card.text?.title?.text || 'Untitled Card';
    const timestamp = Date.now();

    // Strip image objects before saving (they will be rehydrated on load)
    const cleanCard = stripImageObjects(card);

    const storedCard: StoredCard = {
      id,
      name,
      timestamp,
      card: cleanCard,
      thumbnail,
      artImageData,
      globalManaPrefix,
    };

    const request = objectStore.add(storedCard);

    request.onsuccess = () => {
      resolve(id);
    };

    request.onerror = () => {
      reject(new Error('Failed to save card to IndexedDB'));
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}

/**
 * Load a card from IndexedDB by ID
 * @param id - The card ID
 * @returns The stored card data with art image or null if not found
 */
export async function loadCard(id: string): Promise<LoadedCardData | null> {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.get(id);

    request.onsuccess = () => {
      const storedCard = request.result as StoredCard | undefined;
      if (!storedCard) {
        resolve(null);
      } else {
        resolve({
          card: storedCard.card,
          artImageData: storedCard.artImageData,
          globalManaPrefix: storedCard.globalManaPrefix,
        });
      }
    };

    request.onerror = () => {
      reject(new Error('Failed to load card from IndexedDB'));
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}

/**
 * Get all saved cards from IndexedDB
 * @returns Array of stored card metadata (sorted by timestamp, newest first)
 */
export async function getAllCards(): Promise<Array<{
  id: string;
  name: string;
  timestamp: number;
  thumbnail?: string;
}>> {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.getAll();

    request.onsuccess = () => {
      const cards = request.result as StoredCard[];

      // Map to metadata only (exclude full card data for performance)
      const metadata = cards.map((storedCard) => ({
        id: storedCard.id!,
        name: storedCard.name,
        timestamp: storedCard.timestamp,
        thumbnail: storedCard.thumbnail,
      }));

      // Sort by timestamp, newest first
      metadata.sort((a, b) => b.timestamp - a.timestamp);

      resolve(metadata);
    };

    request.onerror = () => {
      reject(new Error('Failed to retrieve cards from IndexedDB'));
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}

/**
 * Delete a card from IndexedDB
 * @param id - The card ID to delete
 */
export async function deleteCard(id: string): Promise<void> {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(new Error('Failed to delete card from IndexedDB'));
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}

/**
 * Update an existing card in IndexedDB
 * @param id - The card ID to update
 * @param card - The updated card data
 * @param customName - Optional updated name
 * @param thumbnail - Optional updated thumbnail
 */
export async function updateCard(
  id: string,
  card: Card,
  customName?: string,
  thumbnail?: string
): Promise<void> {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const objectStore = transaction.objectStore(STORE_NAME);

    // First get the existing card to preserve timestamp
    const getRequest = objectStore.get(id);

    getRequest.onsuccess = () => {
      const existingCard = getRequest.result as StoredCard | undefined;

      if (!existingCard) {
        reject(new Error('Card not found'));
        return;
      }

      const updatedCard: StoredCard = {
        id,
        name: customName || card.text?.title?.text || existingCard.name,
        timestamp: existingCard.timestamp, // Preserve original timestamp
        card,
        thumbnail: thumbnail || existingCard.thumbnail,
      };

      const putRequest = objectStore.put(updatedCard);

      putRequest.onsuccess = () => {
        resolve();
      };

      putRequest.onerror = () => {
        reject(new Error('Failed to update card in IndexedDB'));
      };
    };

    getRequest.onerror = () => {
      reject(new Error('Failed to retrieve card for update'));
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}

/**
 * Check if IndexedDB is available in the current browser
 */
export function isIndexedDBAvailable(): boolean {
  try {
    return typeof indexedDB !== 'undefined';
  } catch {
    return false;
  }
}
