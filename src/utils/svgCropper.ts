/**
 * SVG Cropper Utility
 * Fetches SVG files from local Keyrune folder, crops to bounding box, and returns data URL
 * Port from creator-23.js getSetSymbolWatermark function
 */

/**
 * Load and crop an SVG watermark from Keyrune set symbols
 * @param urlOrSetCode - Either a full path to SVG or a set code (e.g., 'cmd', 'war')
 * @returns Promise that resolves to a cropped SVG data URL
 */
export async function loadAndCropSVG(urlOrSetCode: string): Promise<string> {
  let url = urlOrSetCode;

  // If it's just a set code (no slashes), prepend the local Keyrune path
  if (!url.includes('/')) {
    url = `/img/Keyrune_svg/${url}.svg`;
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.overrideMimeType('image/svg+xml');

    xhr.onload = function () {
      if (this.readyState === 4 && this.status === 200) {
        try {
          // Parse the SVG XML
          const svgDoc = xhr.responseXML;
          if (!svgDoc) {
            reject(new Error('Failed to parse SVG XML'));
            return;
          }

          // Append SVG to DOM temporarily to calculate bounding box
          const svgElement = document.body.appendChild(svgDoc.documentElement as unknown as SVGSVGElement);

          // Get the bounding box
          const box = svgElement.getBBox();

          // Update viewBox to crop to content
          svgElement.setAttribute('viewBox', `${box.x} ${box.y} ${box.width} ${box.height}`);
          svgElement.setAttribute('width', box.width.toString());
          svgElement.setAttribute('height', box.height.toString());

          // Convert to data URL
          const dataUrl = 'data:image/svg+xml,' + encodeURIComponent(svgElement.outerHTML);

          // Remove temporary SVG from DOM
          svgElement.remove();

          resolve(dataUrl);
        } catch (error) {
          reject(error);
        }
      } else if (this.status === 404) {
        reject(new Error('SVG file not found (404): ' + url));
      } else {
        reject(new Error('Failed to load SVG: ' + this.statusText));
      }
    };

    xhr.onerror = function () {
      reject(new Error('Network error loading SVG'));
    };

    xhr.send();
  });
}
