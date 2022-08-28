import { useState } from "react";

import { useFirestore } from "./useFirestore";
import { useDocument } from "./useDocument";

export const useMenu = (id) => {
  const [ menuId ] = useState(id);
  const { updateDocument } = useFirestore("menus");
  const { document: menu } = useDocument("menus", menuId);

  const addSection = (sec) => {
    updateDocument(menuId, { sections: [...menu.sections, sec] });
  };

  const updateSection = (sec) => {
    const idx = menu.sections.findIndex(s => s.id === sec.id);
    const secs = [...menu.sections];
    secs.splice(idx, 1, sec)
    updateDocument(menuId, {sections: secs})
  };

  const moveSectionBefore = (moveSecId, afterSecId) => {
    if (moveSecId === afterSecId)
      return;
    const secs = [...menu.sections];
    const moveIdx = secs.findIndex(s => s.id === moveSecId);
    if (moveIdx == null)
      return;
    const moveSec = secs.splice(moveIdx, 1)[0];

    const afterIdx = secs.findIndex(s => s.id === afterSecId);
    if (afterIdx == null)
      return;
    secs.splice(afterIdx, 0, moveSec);
    updateDocument(menuId, {sections: secs});
  }

  return { menu, updateSection, addSection, moveSectionBefore };
};
