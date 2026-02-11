import { useReducer, useCallback } from "react";
import type { CanvasBox, BoxType } from "../types";
import { BOX_TYPE_COLORS } from "../types";

interface BoxState {
  boxes: CanvasBox[];
  selectedBoxId: string | null;
}

type BoxAction =
  | { type: "ADD"; payload: { x: number; y: number } }
  | { type: "SELECT"; payload: string | null }
  | { type: "MOVE"; payload: { id: string; x: number; y: number } }
  | { type: "RESIZE"; payload: { id: string; width: number; height: number } }
  | { type: "UPDATE"; payload: { id: string } & Partial<Pick<CanvasBox, "label" | "type" | "x" | "y" | "width" | "height">> }
  | { type: "DELETE"; payload: string };

let nextId = 1;

function boxReducer(state: BoxState, action: BoxAction): BoxState {
  switch (action.type) {
    case "ADD": {
      const id = `box-${nextId++}`;
      const newBox: CanvasBox = {
        id,
        x: action.payload.x,
        y: action.payload.y,
        width: 300,
        height: 200,
        label: "New Box",
        type: "generic",
        color: BOX_TYPE_COLORS.generic,
      };
      return { boxes: [...state.boxes, newBox], selectedBoxId: id };
    }
    case "SELECT":
      return { ...state, selectedBoxId: action.payload };
    case "MOVE":
      return {
        ...state,
        boxes: state.boxes.map((b) =>
          b.id === action.payload.id
            ? { ...b, x: action.payload.x, y: action.payload.y }
            : b
        ),
      };
    case "RESIZE":
      return {
        ...state,
        boxes: state.boxes.map((b) =>
          b.id === action.payload.id
            ? { ...b, width: action.payload.width, height: action.payload.height }
            : b
        ),
      };
    case "UPDATE":
      return {
        ...state,
        boxes: state.boxes.map((b) => {
          if (b.id !== action.payload.id) return b;
          const { id: _, ...updates } = action.payload;
          const updated = { ...b, ...updates };
          if ("type" in updates && updates.type) {
            updated.color = BOX_TYPE_COLORS[updates.type as BoxType];
          }
          return updated;
        }),
      };
    case "DELETE":
      return {
        boxes: state.boxes.filter((b) => b.id !== action.payload),
        selectedBoxId:
          state.selectedBoxId === action.payload ? null : state.selectedBoxId,
      };
  }
}

export function useCanvasBoxes() {
  const [state, dispatch] = useReducer(boxReducer, {
    boxes: [],
    selectedBoxId: null,
  });

  const addBox = useCallback(
    (x: number, y: number) => dispatch({ type: "ADD", payload: { x, y } }),
    []
  );
  const selectBox = useCallback(
    (id: string | null) => dispatch({ type: "SELECT", payload: id }),
    []
  );
  const moveBox = useCallback(
    (id: string, x: number, y: number) =>
      dispatch({ type: "MOVE", payload: { id, x, y } }),
    []
  );
  const resizeBox = useCallback(
    (id: string, width: number, height: number) =>
      dispatch({ type: "RESIZE", payload: { id, width, height } }),
    []
  );
  const updateBox = useCallback(
    (id: string, updates: Partial<Pick<CanvasBox, "label" | "type" | "x" | "y" | "width" | "height">>) =>
      dispatch({ type: "UPDATE", payload: { id, ...updates } }),
    []
  );
  const deleteBox = useCallback(
    (id: string) => dispatch({ type: "DELETE", payload: id }),
    []
  );

  const selectedBox = state.boxes.find((b) => b.id === state.selectedBoxId) ?? null;

  return {
    boxes: state.boxes,
    selectedBoxId: state.selectedBoxId,
    selectedBox,
    addBox,
    selectBox,
    moveBox,
    resizeBox,
    updateBox,
    deleteBox,
  };
}
