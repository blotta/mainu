import { v4 as uuid } from "uuid";
import React, { useState } from "react";
import MenuSectionForm from "./MenuSectionForm";

// styles
import styles from "./MenuSections.module.css";

export const SECTION_TYPES = ["product-list", "banner"];

export default function MenuSections({ sections, addSection, updateSection, moveSectionBefore }) {
  const [editingSection, setEditingSection] = useState(null);
  const [dropHover, setDropHover] = useState(null);
  const [draggingSection, setDraggingSection] = useState(null);

  const handleSectionFormSubmit = (s) => {
    console.log(s);
    if (!s.id) {
      addSection({ id: uuid(), ...s });
    } else {
      updateSection(s);
    }
    setEditingSection(null);
  };

  const onSecDragStart = (e, id) => {
    setEditingSection(null);
    setDraggingSection(id);
  };

  const onSecDragOver = (e, id) => {
    if (draggingSection !== id) {
      setDropHover(id);
      e.preventDefault();
      return false;
    }
    setDropHover(null);
  };

  const onSecDrop = (e, id) => {
    e.preventDefault();
    moveSectionBefore(draggingSection, dropHover);
  };

  const onSecDragEnd = () => {
    setDropHover(null);
    setDraggingSection(null);
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
          <React.Fragment key={sec.id}>
            {editingSection && editingSection.id === sec.id && (
              <MenuSectionForm
                section={editingSection}
                cancel={() => setEditingSection(false)}
                submit={handleSectionFormSubmit}
              />
            )}

            {(!editingSection || editingSection.id !== sec.id) && (
              <div
                id={sec.id}
                className={
                  styles.section +
                  " " +
                  (draggingSection !== dropHover && dropHover === sec.id
                    ? styles.dropHover
                    : "")
                }
                draggable
                onDragOver={(e) => onSecDragOver(e, sec.id)}
                onDragStart={(e) => onSecDragStart(e, sec.id)}
                onDrop={(e) => onSecDrop(e, sec.id)}
                onDragEnd={onSecDragEnd}
              >
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
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
