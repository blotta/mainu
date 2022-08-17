import React from "react";
import { useDocument } from "../../hooks/useDocument";

export default function MenuDesigner({ menuId }) {
  const { document: menu, isPending, error } = useDocument("menus", menuId);
  return (
    <div>
      {isPending && <p>Loading...</p>}

      {error && <p className="error">{error}</p>}

      {menu && (
        <>
          <h1>{menu.name}</h1>
          <h4>{menu.restaurantName}</h4>
        </>
      )}
    </div>
  );
}
