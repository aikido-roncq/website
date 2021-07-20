import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const config = {
  toolbar: ['bold', 'italic', '|', 'undo', 'redo'],
};

const Editor = ({ value, onChange, onReady }) => {
  const handleChange = (event, editor) => {
    const data = editor.getData();
    onChange(data);
  };

  const handleReady = editor => {
    editor.editing.view.change(writer => {
      writer.setStyle('height', '250px', editor.editing.view.document.getRoot());
    });
    onReady();
  };

  return (
    <CKEditor
      data={value}
      onChange={handleChange}
      editor={ClassicEditor}
      config={config}
      onReady={handleReady}
    />
  );
};

export default Editor;
