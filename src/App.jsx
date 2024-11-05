import formJSON from "./formData.json";

import DynamicFormBuilder from "./dynamicFormBuilder";

function App() {
  return (
    <div className="container">
      <DynamicFormBuilder formJSON={formJSON} />
    </div>
  );
}

export default App;
