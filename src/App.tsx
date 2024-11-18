import "./App.css";
import FileUpload from "./components/elements/translation-file-upload";

function App() {
  return (
    <main>
      <h1>Babbel Edit</h1>
      <FileUpload
        maxSize={10 * 1024 * 1024}
        acceptedTypes={[".json"]}
        onUpload={(file) => {
          console.log("Uploaded file:", file);
        }}
      />
    </main>
  );
}

export default App;
