import formJSON from './config/formData.json';
import DynamicFormBuilder from './features/components/DynamicFormBuilder';

function App() {
  const handleSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <div>
      <h1>Dynamic Form Builder</h1>
      <DynamicFormBuilder formJSON={formJSON} onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
