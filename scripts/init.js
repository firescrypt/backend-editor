function init() {

  // document.querySelector(".main--editor").style.display="block";
require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@latest/min/vs' } });
  window.MonacoEnvironment = { getWorkerUrl: () => proxy };

  let proxy = URL.createObjectURL(new Blob([`
	self.MonacoEnvironment = {
		baseUrl: 'https://unpkg.com/monaco-editor@latest/min/'
	};
	importScripts('https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js');
`], { type: 'text/javascript' }));



  require(["vs/editor/editor.main"], function () {
    window.editor = monaco.editor.create(document.getElementById('firepad-container'), {
      language: 'python',
      minimap: { enabled: false },
      theme: 'vs-dark'
    });

const user = firebase.auth().currentUser;
window.editor.getModel().onDidChangeContent((event) => {
  cloudUpload(user.uid,fileName)
});
    

    
  });

  
  
}

