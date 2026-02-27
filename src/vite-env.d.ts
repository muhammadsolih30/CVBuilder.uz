/// <reference types="vite/client" />


/// <reference types="vite/client" />

// html2pdf.js uchun type declaration (package'da @types yo'q)
declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | number[];
    filename?: string;
    image?: { type?: string; quality?: number };
    html2canvas?: {
      scale?: number;
      useCORS?: boolean;
      logging?: boolean;
      letterRendering?: boolean;
    };
    jsPDF?: {
      unit?: string;
      format?: string | number[];
      orientation?: string;
    };
    pagebreak?: { mode?: string | string[] };
  }

  interface Html2Pdf {
    set(options: Html2PdfOptions): Html2Pdf;
    from(element: HTMLElement): Html2Pdf;
    save(): Promise<void>;
    output(type: string): Promise<unknown>;
    toPdf(): Html2Pdf;
    toImg(): Html2Pdf;
    toCanvas(): Html2Pdf;
  }

  function html2pdf(): Html2Pdf;
  function html2pdf(element: HTMLElement, options?: Html2PdfOptions): Html2Pdf;
  export = html2pdf;
}