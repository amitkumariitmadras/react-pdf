import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import pdf from "./9th_science_sound_chapter_11 (1).pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PagePdf() {
  const [numPages, setNumPages] = useState(null);
  const [allPagesRendered, setAllPagesRendered] = useState(false);
  // Variables to highlight specific spans
  const pageNumberToHighlight = 1; // Adjust this as needed
  const startSpanIndex = 61; // Adjust this as needed
  const endSpanIndex = 77; // Adjust this as needed

  function onDocumentLoadSuccess({ numPages }) {
    console.log("Successfully loaded PDF");
    setNumPages(numPages);
  }

  function onPageRenderSuccess() {
    // Check if all pages have been rendered
    setAllPagesRendered(true);
  }

  useEffect(() => {
    if (allPagesRendered) {
      setTimeout(() => {
        const textLayers = document.querySelectorAll('.react-pdf__Page__textContent');
        textLayers.forEach((layer, pageIndex) => {
          const spans = layer.querySelectorAll('span');
          // Log spans for all pages
          console.log(`Spans for page ${pageIndex + 1}:`, spans);
          // Highlight spans for a specific page
          if (pageIndex + 1 === pageNumberToHighlight) {
            spans.forEach((span, spanIndex) => {
              if (spanIndex >= startSpanIndex && spanIndex <= endSpanIndex) {
                span.style.backgroundColor = 'rgba(0, 255, 0, 0.2)'; // Highlight style
              }
            });
          }
        });
      }, 10000); // Adjust delay as necessary
    }
  }, [allPagesRendered]);
  
  return (
    <div className='pdf-page'>
      <p>Total Pages: {numPages}</p>
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from({ length: numPages }, (_, index) => (
          <Page key={index} pageNumber={index + 1} onLoadSuccess={onPageRenderSuccess} />
        ))}
      </Document>
    </div>
  );
}

export default PagePdf;
