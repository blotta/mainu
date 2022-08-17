import { v4 as uuid } from "uuid";
import { useState } from "react";
import MenuSectionForm from "./MenuSectionForm";

// styles
import styles from "./MenuSections.module.css";

export const SECTION_TYPES = ["product-list", "banner"];

export default function MenuSections({ sections, addSection, updateSection }) {
  const [editingSection, setEditingSection] = useState(null);

  const handleSectionFormSubmit = (s) => {
    console.log(s);
    if (!s.id) {
      addSection({ id: uuid(), ...s });
    } else {
      updateSection(s)
    }
    setEditingSection(null);
  };

  return (
    <>
      {editingSection === "new" && (
        <MenuSectionForm
          section={{}}
          cancel={() => setEditingSection(false)}
          submit={handleSectionFormSubmit}
        />
      )}
      {!editingSection && (
        <button
          className="btn d-block"
          onClick={() => setEditingSection("new")}
        >
          Add Section
        </button>
      )}
      <div className={styles.sections}>
        {sections.map((sec) => (
          <>
            {editingSection && editingSection.id === sec.id && (
              <MenuSectionForm
                section={editingSection}
                cancel={() => setEditingSection(false)}
                submit={handleSectionFormSubmit}
              />
            )}

            {(!editingSection || editingSection.id !== sec.id) && (
              <div key={sec.id} className={styles.section} draggable>
                <div className={styles.header}>
                  <p>
                    {sec.name} - [{sec.type}]
                  </p>
                  <p onClick={() => setEditingSection(sec)}>edit</p>
                </div>
                <div className={styles.body}>
                  {sec.type === "product-list" && (
                    <div className={styles.products}>
                      {(!sec.products || sec.products.length === 0) && (
                        <p>Drop products here</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </>
  );
}
