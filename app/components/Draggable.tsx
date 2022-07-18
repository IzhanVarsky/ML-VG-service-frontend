import React, { useRef, useState, useEffect, useCallback } from "react";
import { useDraggable } from "~/use-draggable"


/// example.ts
const quickAndDirtyStyle = {
  width: "200px",
  height: "200px",
  background: "#FF9900",
  color: "#FFFFFF",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const DraggableComponent = ({ children }) => {
  // handlers must be wrapped into `useCallback`. even though
  // resubscribing to `mousedown` on every tick is quite cheap
  // due to React's event system, `handleMouseDown` might be used
  // in `deps` argument of another hook, where it would really matter.
  // as you never know where return values of your hook might end up,
  // it's just generally a good idea to ALWAYS use `useCallback`

  // it's nice to have a way to at least prevent element from
  // getting dragged out of the page
  const handleDrag = useCallback(
    ({ x, y }) => ({
      x: x, y: y
      // x: Math.max(0, x),
      // y: Math.max(0, y)
    }),
    []
  );

  const [ref, pressed] = useDraggable({
    onDrag: handleDrag
  });

  return (
    <div ref={ref} style={{ width: 'fit-content', height: 'fit-content' }}>{children}</div>
  );
};

// please, don't `export default`! it messes up autocompletion,
// usage search and regular text search in IDE!
// export default DraggableComponent

export default useDraggable;
// export default DraggableComponent;
