function makeDocument() {
    let frame = document.getElementById("theFrame");
  
    let doc = document.implementation.createHTMLDocument("New Document");
    let p = doc.createElement("p");
    p.textContent = "This is a new paragraph.";
  
    try {
      doc.body.appendChild(p);
    } catch(e) {
      console.log(e);
    }
  
    // Copy the new HTML document into the frame
  
    let destDocument = frame.contentDocument;
    let srcNode = doc.documentElement;
    let newNode = destDocument.importNode(srcNode, true);
  
    destDocument.replaceChild(newNode, destDocument.documentElement);
  }