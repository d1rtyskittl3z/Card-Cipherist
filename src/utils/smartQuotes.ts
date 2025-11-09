/**
 * Smart Quotes Utility
 * Converts straight quotes to curly quotes
 */

/**
 * Convert all straight double quotes in a string to curly quotes
 * intelligently based on context
 *
 * @param text - The text to convert
 * @returns Text with curly quotes
 */
export const convertToSmartQuotes = (text: string): string => {
  if (!text) return text;

  let result = '';
  let inQuote = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === '"') {
      // Simple alternating logic: toggle between opening and closing quotes
      if (!inQuote) {
        result += '\u201C'; // Opening curly quote "
        inQuote = true;
      } else {
        result += '\u201D'; // Closing curly quote "
        inQuote = false;
      }
    } else {
      result += char;
    }
  }

  return result;
};

/**
 * Convert straight quotes to curly quotes for a single typed character
 * Used for real-time conversion as user types
 *
 * @param text - The full text string
 * @param cursorPosition - Position where the character was typed
 * @returns Object with converted text and cursor offset
 */
export const convertTypedQuote = (text: string, cursorPosition: number): { text: string; cursorOffset: number } => {
  // Find the last character that was typed (the one before cursor)
  const lastChar = text.charAt(cursorPosition - 1);

  // Only process if the last character was a straight quote
  if (lastChar !== '"') {
    return { text, cursorOffset: 0 };
  }

  // Count existing opening and closing curly quotes before the cursor to determine
  // if we should open or close
  const textBeforeCursor = text.substring(0, cursorPosition - 1);
  const openingQuotes = (textBeforeCursor.match(/\u201C/g) || []).length;
  const closingQuotes = (textBeforeCursor.match(/\u201D/g) || []).length;

  // If we have more opening quotes than closing, use closing quote
  // Otherwise use opening quote
  const replacement = openingQuotes > closingQuotes ? '\u201D' : '\u201C';
  const newText = text.substring(0, cursorPosition - 1) + replacement + text.substring(cursorPosition);

  // Curly quotes are multi-byte characters, no cursor offset needed in modern JS
  return { text: newText, cursorOffset: 0 };
};
