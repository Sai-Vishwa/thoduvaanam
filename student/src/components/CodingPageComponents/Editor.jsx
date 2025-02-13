function Editor({boiler}){
    const editorRef = useRef(null);
  const monacoInstance = useRef(null);

  useEffect(() => {
    window.MonacoEnvironment = {
      getWorkerUrl: () => "/monaco/base/worker/workerMain.js", // Load from local folder
    };

    if (editorRef.current) {
      monacoInstance.current = monaco.editor.create(editorRef.current, {
        value: "// Type your code here...",
        language: "javascript",
        theme: "vs-dark",
      });
    }

    return () => monacoInstance.current?.dispose();
  }, []);

  return <div ref={editorRef} style={{ height: "500px", width: "100%" }} />;
}

export default Editor;