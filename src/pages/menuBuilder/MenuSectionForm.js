import { useState } from "react";
import { SECTION_TYPES } from "./MenuSections";

// styles
import styles from './MenuSectionForm.module.css'

export default function MenuSectionForm({section, submit, cancel}) {
  const [secId] = useState(section.id || null);
  const [name, setName] = useState(section.name || "");
  const [type, setType] = useState(section.type || SECTION_TYPES[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const s = {
      ...section,
      name,
      type
    }
    if (secId) {
      s.id = secId;
    } 
    submit(s)
  }

  const handleCancel = (e) => {
    e.preventDefault();
    cancel();
  }
  return (
    <div className={styles.menuSectionForm}>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
        </label>
        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            {SECTION_TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        <div className={styles.actionButtons}>
          <button type="submit" className="btn">OK</button>
          <button className="btn btn-warning" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
