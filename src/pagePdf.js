import React from 'react'
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import pdfs from "./9th_science_sound_chapter_11.pdf"
import pdf from "./Tution-Anna-Chunks.pdf"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();



export default function PagePdf(){
  const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    // const [pdfFile, setPdfFile] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
      console.log(numPages)
    setNumPages(numPages);
  }

  return (
      <div className='pdf-page'>
                           <p>
        Total Pages: {numPages}
      </p>
          {/* <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.apply(null, Array(numPages))
                .map((x, i) => i + 1)
                  .map(page => (
                      <>
                    <Page
                        pageNumber={page}
                        // renderTextLayer={false}
                              renderAnnotationLayer={false}
                              
                          />
                          </>
                ))}
        {/* <Page pageNumber={pageNumber} /> */}
      {/* </Document> * /} */}
      <div className="pdfContainer">
  <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
    {Array.apply(null, Array(numPages))
      .map((x, i) => i + 1)
      .map(page => (
        <Page
          pageNumber={page}
          renderAnnotationLayer={false}
        />
      ))}
  </Document>
</div>

     
    </div>
  );
}



// export default pagePdf
