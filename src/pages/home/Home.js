import React from "react";
import MenuList from "../../components/MenuList";
import { useCollection } from "../../hooks/useCollection";

export default function Home() {
  const { documents: menus } = useCollection("menus");

  return (
    <>
      <MenuList menus={menus} />
    </>
  );
}
