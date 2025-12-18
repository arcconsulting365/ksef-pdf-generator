// Polyfill FileReader for Node.js environment
export function setupPolyfills() {
  if (typeof globalThis.FileReader === 'undefined') {
    class FileReaderPolyfill {
      result: string | ArrayBuffer | null = null;
      onload: ((event: any) => void) | null = null;
      onerror: ((event: any) => void) | null = null;

      readAsText(blob: Blob | File) {
        blob.text().then((text) => {
          this.result = text;
          if (this.onload) {
            this.onload({ target: this });
          }
        }).catch((error) => {
          if (this.onerror) {
            this.onerror({ target: this, error });
          }
        });
      }

      readAsArrayBuffer(blob: Blob | File) {
        blob.arrayBuffer().then((buffer) => {
          this.result = buffer;
          if (this.onload) {
            this.onload({ target: this });
          }
        }).catch((error) => {
          if (this.onerror) {
            this.onerror({ target: this, error });
          }
        });
      }

      readAsDataURL(blob: Blob | File) {
        blob.arrayBuffer().then((buffer) => {
          const base64 = Buffer.from(buffer).toString('base64');
          const mimeType = (blob as any).type || 'application/octet-stream';
          this.result = `data:${mimeType};base64,${base64}`;
          if (this.onload) {
            this.onload({ target: this });
          }
        }).catch((error) => {
          if (this.onerror) {
            this.onerror({ target: this, error });
          }
        });
      }
    }

    (globalThis as any).FileReader = FileReaderPolyfill;
  }
}
