import { useMemo, useRef, useState } from "react";
import type {
  ElementColor,
  ElementSize,
  ScreenElement,
  ScreenModel,
  ScreenUnit,
} from "./types";

const COLS = 28;
const ROWS = 13;

// Un carácter ocupa aproximadamente 1 unidad de ancho
// y 2 unidades de alto.
const CELL_W = 20;
const CELL_H = 36;

const COLORS: ElementColor[] = [
  "WHITE",
  "GREEN",
  "YELLOW",
  "RED",
  "CYAN",
  "MAGENTA",
];

const initialSample = {
  UNIT_00_TITTLE: {
    ELEMENT_1: {
      TITTLE: "DL",
      COLOR: "WHITE",
      SIZE: "BIG",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 2,
      ROW: 0,
    },
    ELEMENT_2: {
      TITTLE: "ATIS REQ",
      COLOR: "WHITE",
      SIZE: "BIG",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 9,
      ROW: 0,
    },
  },

  UNIT_L1_0_UP: {
    ELEMENT_1: {
      TITTLE: "AIRPORT",
      COLOR: "WHITE",
      SIZE: "SMALL",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 2,
      ROW: 1,
    },
  },

  UNIT_L1_1_DWN: {
    ELEMENT_1: {
      TITTLE: "KORD",
      COLOR: "WHITE",
      SIZE: "BIG",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 2,
      ROW: 2,
    },
  },

  UNIT_L2_0_UP: {
    ELEMENT_1: {
      TITTLE: "SERVICE TYPE",
      COLOR: "WHITE",
      SIZE: "SMALL",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 3,
      ROW: 3,
    },
  },

  UNIT_L2_1_DWN: {
    ELEMENT_1: {
      TITTLE: "↓ARRIVAL ATIS",
      COLOR: "WHITE",
      SIZE: "BIG",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 2,
      ROW: 4,
    },
  },

  UNIT_L3_0_UP: {
    ELEMENT_1: {
      TITTLE: "REPORTING MODE",
      COLOR: "WHITE",
      SIZE: "SMALL",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 3,
      ROW: 5,
    },
  },

  UNIT_L3_1_DWN: {
    ELEMENT_1: {
      TITTLE: "↓START AUTO-UPDATES",
      COLOR: "WHITE",
      SIZE: "BIG",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 2,
      ROW: 6,
    },
  },

  UNIT_L4_0_UP: {
    ELEMENT_1: {
      TITTLE: "",
      COLOR: "WHITE",
      SIZE: "SMALL",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 0,
      ROW: 7,
    },
  },

  UNIT_L4_1_DWN: {
    ELEMENT_1: {
      TITTLE: "",
      COLOR: "WHITE",
      SIZE: "BIG",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 0,
      ROW: 8,
    },
  },

  UNIT_L5_0_UP: {
    ELEMENT_1: {
      TITTLE: "",
      COLOR: "WHITE",
      SIZE: "SMALL",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 0,
      ROW: 9,
    },
  },

  UNIT_L5_1_DWN: {
    ELEMENT_1: {
      TITTLE: "",
      COLOR: "WHITE",
      SIZE: "BIG",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 0,
      ROW: 10,
    },
  },

  UNIT_L6_0_UP: {
    ELEMENT_1: {
      TITTLE: "",
      COLOR: "WHITE",
      SIZE: "BIG",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 0,
      ROW: 11,
    },
  },

  UNIT_L6_1_DWN: {
    ELEMENT_1: {
      TITTLE: "<RETURN",
      COLOR: "WHITE",
      SIZE: "BIG",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 0,
      ROW: 11,
    },
    ELEMENT_2: {
      TITTLE: "HH:MM",
      COLOR: "WHITE",
      SIZE: "SMALL",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 10,
      ROW: 11,
    },
  },

  UNIT_R1_0_UP: {
    ELEMENT_1: {
      TITTLE: "",
      COLOR: "WHITE",
      SIZE: "SMALL",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 16,
      ROW: 1,
    },
  },

  UNIT_R1_1_DWN: {
    ELEMENT_1: {
      TITTLE: "",
      COLOR: "WHITE",
      SIZE: "BIG",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 16,
      ROW: 2,
    },
  },

  UNIT_R2_0_UP: {
    ELEMENT_1: {
      TITTLE: "",
      COLOR: "WHITE",
      SIZE: "SMALL",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 13,
      ROW: 3,
    },
  },

  UNIT_R2_1_DWN: {
    ELEMENT_1: {
      TITTLE: "",
      COLOR: "WHITE",
      SIZE: "BIG",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 13,
      ROW: 4,
    },
  },

  UNIT_R3_0_UP: {
    ELEMENT_1: {
      TITTLE: "",
      COLOR: "WHITE",
      SIZE: "SMALL",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 12,
      ROW: 5,
    },
  },

  UNIT_R3_1_DWN: {
    ELEMENT_1: {
      TITTLE: "",
      COLOR: "WHITE",
      SIZE: "BIG",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 12,
      ROW: 6,
    },
  },

  UNIT_R4_0_UP: {
    ELEMENT_1: {
      TITTLE: "",
      COLOR: "WHITE",
      SIZE: "SMALL",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 12,
      ROW: 7,
    },
  },

  UNIT_R4_1_DWN: {
    ELEMENT_1: {
      TITTLE: "",
      COLOR: "WHITE",
      SIZE: "BIG",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 12,
      ROW: 8,
    },
  },

  UNIT_R5_0_UP: {
    ELEMENT_1: {
      TITTLE: "REQ",
      COLOR: "WHITE",
      SIZE: "SMALL",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 20,
      ROW: 9,
    },
  },

  UNIT_R5_1_DWN: {
    ELEMENT_1: {
      TITTLE: "SEND*",
      COLOR: "WHITE",
      SIZE: "BIG",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 21,
      ROW: 10,
    },
  },

  UNIT_R6_0_UP: {
    ELEMENT_1: {
      TITTLE: "",
      COLOR: "WHITE",
      SIZE: "SMALL",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 21,
      ROW: 11,
    },
  },

  UNIT_R6_1_DWN: {
    ELEMENT_1: {
      TITTLE: "",
      COLOR: "WHITE",
      SIZE: "BIG",
      UNDERLINED: false,
      FLASHING: false,
      REVERSE_VIDEO: false,
      COL: 23,
      ROW: 12,
    },
  },
} as const;

type RawElement = {
  TITTLE: string;
  COLOR: ElementColor;
  SIZE: ElementSize;
  UNDERLINED: boolean;
  FLASHING: boolean;
  REVERSE_VIDEO: boolean;
  COL: number;
  ROW: number;
};

type RawJson = Record<string, Record<string, RawElement>>;

function uid() {
  return crypto.randomUUID();
}

function emptyElement(size: ElementSize = "BIG", col: number = 0): ScreenElement {
  return {
    id: uid(),
    title: "",
    color: "WHITE",
    size,
    underlined: false,
    flashing: false,
    reverseVideo: false,
    col: col,
    row: 0,
  };
}

function unitFromKey(
  key: string,
  elements: ScreenElement[],
): ScreenUnit {
  if (key === "UNIT_00_TITTLE") {
    return {
      key,
      kind: "TITLE",
      row: 0,
      elements,
    };
  }

  const match = /^UNIT_([LR])(\d+)_([01])_(UP|DWN)$/.exec(key);

  if (!match) {
    throw new Error(`UNIT no reconocida: ${key}`);
  }

  const side = match[1] as "L" | "R";
  const index = Number(match[2]);
  const mode = match[4] as "UP" | "DWN";

  const row =
    mode === "UP"
      ? index * 2 - 1
      : index * 2;

  return {
    key,
    kind: side === "L" ? "LEFT" : "RIGHT",
    side,
    index,
    mode,
    row,
    elements,
  };
}

/**
 * Convierte un ROW en el UNIT correspondiente.
 *
 * ROW 0:
 *   TITLE
 *
 * ROW 1:
 *   L1 UP / R1 UP
 *
 * ROW 2:
 *   L1 DWN / R1 DWN
 *
 * etc.
 */
function unitKeyFromRow(
  row: number,
  side: "L" | "R",
): string | null {
  if (row === 0) {
    return "UNIT_00_TITTLE";
  }

  if (row < 1 || row > 12) {
    return null;
  }

  const index = Math.ceil(row / 2);

  if (row % 2 === 1) {
    return `UNIT_${side}${index}_0_UP`;
  }

  return `UNIT_${side}${index}_1_DWN`;
}

function fromRaw(raw: RawJson): ScreenModel {
  const units: Record<string, ScreenUnit> = {};

  for (const [key, value] of Object.entries(raw)) {
    const parsedUnit = unitFromKey(key, []);

    const elements: ScreenElement[] = Object.values(value).map(
      (e) => ({
        id: uid(),
        title: e.TITTLE ?? "",
        color: e.COLOR ?? "WHITE",
        size: e.SIZE ?? "BIG",
        underlined: !!e.UNDERLINED,
        flashing: !!e.FLASHING,
        reverseVideo: !!e.REVERSE_VIDEO,
        col: Math.max(
          0,
          Math.min(COLS - 1, Number(e.COL) || 0),
        ),
        row: parsedUnit.row,
      }),
    );

    units[key] = {
      ...parsedUnit,
      elements,
    };
  }

  return {
    title: "SCREEN",
    units,
  };
}

function toRaw(model: ScreenModel): RawJson {
  const result: RawJson = {};

  for (const [key, unit] of Object.entries(model.units)) {
    result[key] = {};

    unit.elements.forEach((e, i) => {
      result[key][`ELEMENT_${i + 1}`] = {
        TITTLE: e.title,
        COLOR: e.color,
        SIZE: e.size,
        UNDERLINED: e.underlined,
        FLASHING: e.flashing,
        REVERSE_VIDEO: e.reverseVideo,
        COL: e.col,
        ROW: unit.row,
      };
    });
  }

  return result;
}

function createEmptyModel(): ScreenModel {
  const units: Record<string, ScreenUnit> = {};

  units.UNIT_00_TITTLE = unitFromKey(
    "UNIT_00_TITTLE",
    [emptyElement("BIG")],
  );

  for (const side of ["L"] as const) {
    for (let i = 1; i <= 6; i++) {
      const upKey = `UNIT_${side}${i}_0_UP`;
      const downKey = `UNIT_${side}${i}_1_DWN`;

      const up = unitFromKey(upKey, [
        emptyElement("SMALL"),
      ]);

      const down = unitFromKey(downKey, [
        emptyElement("BIG"),
      ]);

      units[upKey] = up;
      units[downKey] = down;
    }
  }

  for (const side of ["R"] as const) {
    for (let i = 1; i <= 6; i++) {
      const upKey = `UNIT_${side}${i}_0_UP`;
      const downKey = `UNIT_${side}${i}_1_DWN`;
      const maxCols = 23;
      const up = unitFromKey(upKey, [
        emptyElement("SMALL", maxCols),
      ]);
      const down = unitFromKey(downKey, [
        emptyElement("BIG", maxCols),
      ]);

      units[upKey] = up;
      units[downKey] = down;
    }
  }

  return {
    title: "SCREEN",
    units,
  };
}

function colorClass(color: ElementColor) {
  return `c-${color.toLowerCase()}`;
}

/**
 * Mueve un elemento desde un modelo base.
 *
 * IMPORTANTE:
 * Siempre recibe el modelo original del comienzo del drag.
 * Así evitamos los problemas de mover/reparentar sobre un
 * estado que ya ha cambiado en el movimiento anterior.
 */
function moveElementFromBase(
  baseModel: ScreenModel,
  fromUnitKey: string,
  elementId: string,
  newCol: number,
  newRow: number,
): {
  model: ScreenModel;
  unitKey: string;
} | null {
  const sourceUnit = baseModel.units[fromUnitKey];

  if (!sourceUnit) {
    return null;
  }

  const sourceElement = sourceUnit.elements.find(
    (e) => e.id === elementId,
  );

  if (!sourceElement) {
    return null;
  }

  // El TITLE solo existe en ROW 0.
  if (sourceUnit.kind === "TITLE") {
    if (newRow !== 0) {
      return null;
    }

    const model: ScreenModel = {
      ...baseModel,
      units: {
        ...baseModel.units,
        [fromUnitKey]: {
          ...sourceUnit,
          elements: sourceUnit.elements.map((e) =>
            e.id === elementId
              ? {
                  ...e,
                  col: newCol,
                  row: 0,
                }
              : e,
          ),
        },
      },
    };

    return {
      model,
      unitKey: fromUnitKey,
    };
  }

  const side =
    sourceUnit.kind === "LEFT"
      ? "L"
      : sourceUnit.kind === "RIGHT"
        ? "R"
        : null;

  if (!side) {
    return null;
  }

  const targetUnitKey = unitKeyFromRow(
    newRow,
    side,
  );

  if (!targetUnitKey) {
    return null;
  }

  const targetUnit = baseModel.units[targetUnitKey];

  if (!targetUnit) {
    return null;
  }

  // -----------------------------
  // MISMO UNIT
  // -----------------------------

  if (targetUnitKey === fromUnitKey) {
    const model: ScreenModel = {
      ...baseModel,
      units: {
        ...baseModel.units,
        [fromUnitKey]: {
          ...sourceUnit,
          elements: sourceUnit.elements.map((e) =>
            e.id === elementId
              ? {
                  ...e,
                  col: newCol,
                  row: newRow,
                }
              : e,
          ),
        },
      },
    };

    return {
      model,
      unitKey: fromUnitKey,
    };
  }

  // -----------------------------
  // CAMBIO DE UNIT
  // -----------------------------

  const movedElement: ScreenElement = {
    ...sourceElement,
    col: newCol,
    row: newRow,
  };

  let sourceElements = sourceUnit.elements.filter(
    (e) => e.id !== elementId,
  );

  /**
   * Si era el último elemento de la UNIT,
   * dejamos una caja vacía.
   *
   * Esto es importante porque las UNIT siguen
   * existiendo visualmente aunque hayamos movido
   * su elemento a otra UNIT.
   */
  if (sourceElements.length === 0) {
    sourceElements = [
      {
        ...emptyElement(sourceElement.size),
        row: sourceUnit.row,
      },
    ];
  }

  const targetElements = targetUnit.elements.filter(
    (e) => e.id !== elementId,
  );

  const model: ScreenModel = {
    ...baseModel,

    units: {
      ...baseModel.units,

      [fromUnitKey]: {
        ...sourceUnit,
        elements: sourceElements,
      },

      [targetUnitKey]: {
        ...targetUnit,
        elements: [
          ...targetElements,
          movedElement,
        ],
      },
    },
  };

  return {
    model,
    unitKey: targetUnitKey,
  };
}

function modelsEqual(
  a: ScreenModel,
  b: ScreenModel,
) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export default function App() {
  const initialModel = useMemo(
    () => fromRaw(initialSample),
    [],
  );

  const [model, setModel] =
    useState<ScreenModel>(initialModel);

  const [selectedUnitKey, setSelectedUnitKey] =
    useState("UNIT_00_TITTLE");

  const [selectedElementId, setSelectedElementId] =
    useState(
      () =>
        initialModel.units.UNIT_00_TITTLE
          ?.elements[0]?.id ?? "",
    );

  const [history, setHistory] =
    useState<ScreenModel[]>([]);

  const [future, setFuture] =
    useState<ScreenModel[]>([]);

  const fileRef =
    useRef<HTMLInputElement>(null);

  const selectedUnit =
    model.units[selectedUnitKey];

  const selectedElement =
    selectedUnit?.elements.find(
      (e) => e.id === selectedElementId,
    );

  const orderedUnits = useMemo(
    () => Object.values(model.units),
    [model],
  );

  function commit(next: ScreenModel) {
    setHistory((h) => [
      ...h.slice(-39),
      model,
    ]);

    setFuture([]);

    setModel(next);
  }

  function selectElement(
    unitKey: string,
    elementId: string,
  ) {
    setSelectedUnitKey(unitKey);
    setSelectedElementId(elementId);
  }

  function updateElement(
    patch: Partial<ScreenElement>,
  ) {
    if (!selectedUnit || !selectedElement) {
      return;
    }

    const next: ScreenModel = {
      ...model,

      units: {
        ...model.units,

        [selectedUnitKey]: {
          ...selectedUnit,

          elements:
            selectedUnit.elements.map((e) =>
              e.id === selectedElement.id
                ? {
                    ...e,
                    ...patch,
                    row: selectedUnit.row,
                  }
                : e,
            ),
        },
      },
    };

    commit(next);
  }

  function addElement() {
    if (!selectedUnit) {
      return;
    }

    const nextElement = emptyElement(
      selectedUnit.kind === "TITLE"
        ? "BIG"
        : "BIG",
    );

    nextElement.row = selectedUnit.row;

    const next: ScreenModel = {
      ...model,

      units: {
        ...model.units,

        [selectedUnitKey]: {
          ...selectedUnit,

          elements: [
            ...selectedUnit.elements,
            nextElement,
          ],
        },
      },
    };

    commit(next);

    setSelectedElementId(
      nextElement.id,
    );
  }

  function duplicateElement() {
    if (!selectedUnit || !selectedElement) {
      return;
    }

    const copy: ScreenElement = {
      ...selectedElement,
      id: uid(),
      col: Math.min(
        COLS - 1,
        selectedElement.col + 1,
      ),
      row: selectedUnit.row,
    };

    const next: ScreenModel = {
      ...model,

      units: {
        ...model.units,

        [selectedUnitKey]: {
          ...selectedUnit,

          elements: [
            ...selectedUnit.elements,
            copy,
          ],
        },
      },
    };

    commit(next);

    setSelectedElementId(copy.id);
  }

  function deleteElement() {
    if (!selectedUnit || !selectedElement) {
      return;
    }

    if (selectedUnit.elements.length <= 1) {
      alert(
        "Cada UNIT mantiene al menos una caja. Puedes dejarla vacía.",
      );
      return;
    }

    const remaining =
      selectedUnit.elements.filter(
        (e) => e.id !== selectedElement.id,
      );

    const next: ScreenModel = {
      ...model,

      units: {
        ...model.units,

        [selectedUnitKey]: {
          ...selectedUnit,
          elements: remaining,
        },
      },
    };

    commit(next);

    setSelectedElementId(
      remaining[0]?.id ?? "",
    );
  }

  /**
   * Drag completo.
   *
   * Aquí está la parte importante:
   *
   * 1. Guardamos una copia del modelo al empezar.
   * 2. Cada movimiento se calcula desde esa copia.
   * 3. No vamos acumulando movimientos sobre movimientos.
   * 4. Por eso X + Y simultáneamente funciona correctamente.
   */
  function handleDragStart(
    event: React.PointerEvent,
    unitKey: string,
    element: ScreenElement,
  ) {
    event.preventDefault();
    event.stopPropagation();

    const startX = event.clientX;
    const startY = event.clientY;

    const baseModel = model;

    const startUnit =
      baseModel.units[unitKey];

    if (!startUnit) {
      return;
    }

    const startCol = element.col;
    const startRow = startUnit.row;

    const target =
      event.currentTarget as HTMLElement;

    target.setPointerCapture(
      event.pointerId,
    );

    let lastModel = baseModel;
    let lastUnitKey = unitKey;

    const onMove = (
      moveEvent: PointerEvent,
    ) => {
      const deltaCol = Math.round(
        (moveEvent.clientX - startX) /
          CELL_W,
      );

      const deltaRow = Math.round(
        (moveEvent.clientY - startY) /
          CELL_H,
      );

      const newCol = Math.max(
        0,
        Math.min(
          COLS - 1,
          startCol + deltaCol,
        ),
      );

      const newRow = Math.max(
        0,
        Math.min(
          ROWS - 1,
          startRow + deltaRow,
        ),
      );

      const result =
        moveElementFromBase(
          baseModel,
          unitKey,
          element.id,
          newCol,
          newRow,
        );

      if (!result) {
        return;
      }

      lastModel = result.model;
      lastUnitKey = result.unitKey;

      setModel(result.model);

      setSelectedUnitKey(
        result.unitKey,
      );

      setSelectedElementId(
        element.id,
      );
    };

    const onUp = () => {
      target.releasePointerCapture?.(
        event.pointerId,
      );

      window.removeEventListener(
        "pointermove",
        onMove,
      );

      window.removeEventListener(
        "pointerup",
        onUp,
      );

      // Solo guardamos historial si realmente
      // hubo un movimiento.
      if (!modelsEqual(baseModel, lastModel)) {
        setHistory((h) => [
          ...h.slice(-39),
          baseModel,
        ]);

        setFuture([]);
      }

      setModel(lastModel);

      setSelectedUnitKey(
        lastUnitKey,
      );

      setSelectedElementId(
        element.id,
      );
    };

    window.addEventListener(
      "pointermove",
      onMove,
    );

    window.addEventListener(
      "pointerup",
      onUp,
      { once: true },
    );
  }

  function undo() {
    const previous =
      history.at(-1);

    if (!previous) {
      return;
    }

    setFuture((f) => [
      model,
      ...f,
    ]);

    setHistory((h) =>
      h.slice(0, -1),
    );

    setModel(previous);

    const unit =
      previous.units[selectedUnitKey] ??
      Object.values(previous.units)[0];

    if (unit) {
      setSelectedUnitKey(
        unit.key,
      );

      setSelectedElementId(
        unit.elements[0]?.id ?? "",
      );
    }
  }

  function redo() {
    const next =
      future[0];

    if (!next) {
      return;
    }

    setHistory((h) => [
      ...h,
      model,
    ]);

    setFuture((f) =>
      f.slice(1),
    );

    setModel(next);

    const unit =
      next.units[selectedUnitKey] ??
      Object.values(next.units)[0];

    if (unit) {
      setSelectedUnitKey(
        unit.key,
      );

      setSelectedElementId(
        unit.elements[0]?.id ?? "",
      );
    }
  }

  function exportJson() {
    const blob = new Blob(
      [
        JSON.stringify(
          toRaw(model),
          null,
          4,
        ),
      ],
      {
        type: "application/json",
      },
    );

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download =
      `${model.title || "screen"}.json`;

    a.click();

    URL.revokeObjectURL(url);
  }

  function importJson(file: File) {
    const reader =
      new FileReader();

    reader.onload = () => {
      try {
        const parsed =
          JSON.parse(
            String(reader.result),
          ) as RawJson;

        const next =
          fromRaw(parsed);

        commit(next);

        const firstUnit =
          Object.values(
            next.units,
          )[0];

        if (firstUnit) {
          setSelectedUnitKey(
            firstUnit.key,
          );

          setSelectedElementId(
            firstUnit.elements[0]?.id ??
              "",
          );
        }
      } catch (error) {
        alert(
          `JSON no válido: ${
            error instanceof Error
              ? error.message
              : "error desconocido"
          }`,
        );
      }
    };

    reader.readAsText(file);
  }

  function newScreen() {
    const next =
      createEmptyModel();

    commit(next);

    setSelectedUnitKey(
      "UNIT_00_TITTLE",
    );

    setSelectedElementId(
      next.units.UNIT_00_TITTLE
        .elements[0].id,
    );
  }

  const canvasW =
    COLS * CELL_W;

  const canvasH =
    ROWS * CELL_H;

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <div className="brand">
            SCREEN EDITOR
          </div>

          <div className="subtitle">
            24 COL × 13 ROW · UNIT /
            ELEMENT editor
          </div>
        </div>

        <div className="toolbar">
          <input
            className="screen-name"
            value={model.title}
            onChange={(e) =>
              setModel((m) => ({
                ...m,
                title:
                  e.target.value,
              }))
            }
          />

          <button onClick={newScreen}>
            NEW
          </button>

          <button
            onClick={() =>
              fileRef.current?.click()
            }
          >
            IMPORT JSON
          </button>

          <button
            onClick={exportJson}
          >
            EXPORT JSON
          </button>

          <button
            disabled={!history.length}
            onClick={undo}
          >
            ↶
          </button>

          <button
            disabled={!future.length}
            onClick={redo}
          >
            ↷
          </button>

          <input
            ref={fileRef}
            type="file"
            accept=".json,application/json"
            hidden
            onChange={(e) => {
              const file =
                e.target.files?.[0];

              if (file) {
                importJson(file);
              }

              e.target.value = "";
            }}
          />
        </div>
      </header>

      <main className="workspace">
        {/* -------------------------------- */}
        {/* LEFT SIDEBAR                     */}
        {/* -------------------------------- */}

        <aside className="sidebar left">
          <div className="panel-title">
            UNITS
          </div>

          <button
            className={`unit-item title-unit ${
              selectedUnitKey ===
              "UNIT_00_TITTLE"
                ? "selected"
                : ""
            }`}
            onClick={() =>
              selectElement(
                "UNIT_00_TITTLE",
                model.units
                  .UNIT_00_TITTLE
                  .elements[0]?.id ??
                  "",
              )
            }
          >
            <span>▾</span>
            <strong>
              UNIT_00_TITTLE
            </strong>
          </button>

          <div className="group-label">
            LEFT
          </div>

          {orderedUnits
            .filter(
              (u) =>
                u.kind === "LEFT",
            )
            .map((unit) => (
              <UnitTree
                key={unit.key}
                unit={unit}
                selectedUnitKey={
                  selectedUnitKey
                }
                selectedElementId={
                  selectedElementId
                }
                onSelect={
                  selectElement
                }
              />
            ))}

          <div className="group-label">
            RIGHT
          </div>

          {orderedUnits
            .filter(
              (u) =>
                u.kind === "RIGHT",
            )
            .map((unit) => (
              <UnitTree
                key={unit.key}
                unit={unit}
                selectedUnitKey={
                  selectedUnitKey
                }
                selectedElementId={
                  selectedElementId
                }
                onSelect={
                  selectElement
                }
              />
            ))}
        </aside>

        {/* -------------------------------- */}
        {/* CANVAS                            */}
        {/* -------------------------------- */}

        <section className="canvas-area">
          <div className="screen-frame">
            <div
              className="screen-canvas"
              style={{
                width: canvasW,
                height: canvasH,
              }}
              onPointerDown={(e) => {
                if (
                  e.target ===
                  e.currentTarget
                ) {
                  setSelectedElementId(
                    "",
                  );
                }
              }}
            >
              {/* ROWS */}
              {Array.from({
                length: ROWS,
              }).map((_, row) => (
                <div
                  key={row}
                  className="row-label"
                  style={{
                    top:
                      row * CELL_H,
                  }}
                >
                  {row}
                </div>
              ))}

              {/* COLS */}
              {Array.from({
                length: COLS,
              }).map((_, col) => (
                <div
                  key={col}
                  className="col-label"
                  style={{
                    left:
                      col * CELL_W,
                  }}
                >
                  {col}
                </div>
              ))}

              {/* ELEMENTS */}
              {orderedUnits.flatMap(
                (unit) =>
                  unit.elements.map(
                    (element) => {
                      const selected =
                        element.id ===
                          selectedElementId &&
                        unit.key ===
                          selectedUnitKey;

                      const isEmpty =
                        element.title
                          .length === 0;

                      return (
                        <button
                          key={
                            element.id
                          }
                          className={[
                            "canvas-element",
                            colorClass(
                              element.color,
                            ),
                            element.size ===
                            "BIG"
                              ? "big"
                              : "small",
                            selected
                              ? "selected"
                              : "",
                            element.underlined
                              ? "underlined"
                              : "",
                            element.reverseVideo
                              ? "reverse"
                              : "",
                            element.flashing
                              ? "flashing"
                              : "",
                            isEmpty
                              ? "empty"
                              : "",
                          ].join(" ")}
                          style={{
                            left:
                              (unit.kind === "RIGHT"
                                ? element.col - Math.max(1, element.title.length) + 1
                                : element.col) * CELL_W + 1,
                            top: unit.row * CELL_H + 2,
                            width: Math.max(1, element.title.length) * CELL_W,
                            height: CELL_H,
                          }}
                          onPointerDown={(
                            e,
                          ) => {
                            selectElement(
                              unit.key,
                              element.id,
                            );

                            handleDragStart(
                              e,
                              unit.key,
                              element,
                            );
                          }}
                          title={`${unit.key} · COL ${element.col} · ROW ${unit.row}`}
                        >
                          {(element.title || " ").split("").map((char, index) => {
                            const charOffset = index;
                            return (
                              <span
                                key={`${element.id}-${index}`}
                                className="canvas-char"
                                style={{ left: charOffset * CELL_W }}
                              >
                                {char}
                              </span>
                            );
                          })}
                        </button>
                      );
                    },
                  ),
              )}
            </div>
          </div>

          <div className="canvas-help">
            Arrastra cualquier ELEMENT horizontal o verticalmente. En RIGHT, COL es la coordenada del carácter situado más a la derecha.
            Al cruzar una fila cambiará
            automáticamente de UNIT.
          </div>
        </section>

        {/* -------------------------------- */}
        {/* RIGHT SIDEBAR                    */}
        {/* -------------------------------- */}

        <aside className="sidebar right">
          <div className="panel-title">
            PROPERTIES
          </div>

          {selectedUnit && (
            <>
              <div className="unit-card">
                <div className="eyebrow">
                  UNIT
                </div>

                <div className="unit-name">
                  {selectedUnit.key}
                </div>

                <div className="unit-meta">
                  ROW{" "}
                  {selectedUnit.row} ·{" "}
                  {
                    selectedUnit
                      .elements
                      .length
                  }{" "}
                  ELEMENT
                  {selectedUnit
                    .elements
                    .length === 1
                    ? ""
                    : "S"}
                </div>
              </div>

              <div className="button-row">
                <button
                  onClick={addElement}
                >
                  + ELEMENT
                </button>

                <button
                  onClick={
                    duplicateElement
                  }
                  disabled={
                    !selectedElement
                  }
                >
                  DUPLICATE
                </button>

                <button
                  className="danger"
                  onClick={
                    deleteElement
                  }
                  disabled={
                    !selectedElement ||
                    selectedUnit
                      .elements
                      .length <= 1
                  }
                >
                  DELETE
                </button>
              </div>

              {selectedElement ? (
                <div className="form">
                  <label>
                    <span>
                      TITTLE
                    </span>

                    <input
                      value={
                        selectedElement.title
                      }
                      onChange={(e) =>
                        updateElement({
                          title:
                            e.target
                              .value,
                        })
                      }
                    />
                  </label>

                  <label>
                    <span>
                      COLOR
                    </span>

                    <select
                      value={
                        selectedElement.color
                      }
                      onChange={(e) =>
                        updateElement({
                          color:
                            e.target
                              .value as ElementColor,
                        })
                      }
                    >
                      {COLORS.map(
                        (c) => (
                          <option
                            key={c}
                          >
                            {c}
                          </option>
                        ),
                      )}
                    </select>
                  </label>

                  <label>
                    <span>
                      SIZE
                    </span>

                    <select
                      value={
                        selectedElement.size
                      }
                      onChange={(e) =>
                        updateElement({
                          size:
                            e.target
                              .value as ElementSize,
                        })
                      }
                    >
                      <option value="BIG">
                        BIG
                      </option>

                      <option value="SMALL">
                        SMALL
                      </option>
                    </select>
                  </label>

                  <div className="coords">
                    <label>
                      <span>
                        COL
                      </span>

                      <input
                        type="number"
                        min={0}
                        max={
                          COLS - 1
                        }
                        value={
                          selectedElement.col
                        }
                        onChange={(
                          e,
                        ) =>
                          updateElement({
                            col: Math.max(
                              0,
                              Math.min(
                                COLS - 1,
                                Number(
                                  e
                                    .target
                                    .value,
                                ),
                              ),
                            ),
                          })
                        }
                      />
                    </label>

                    <label>
                      <span>
                        ROW
                      </span>

                      <input
                        value={
                          selectedUnit.row
                        }
                        disabled
                      />
                    </label>
                  </div>

                  <label className="check">
                    <input
                      type="checkbox"
                      checked={
                        selectedElement.underlined
                      }
                      onChange={(
                        e,
                      ) =>
                        updateElement({
                          underlined:
                            e.target
                              .checked,
                        })
                      }
                    />

                    UNDERLINED
                  </label>

                  <label className="check">
                    <input
                      type="checkbox"
                      checked={
                        selectedElement.flashing
                      }
                      onChange={(
                        e,
                      ) =>
                        updateElement({
                          flashing:
                            e.target
                              .checked,
                        })
                      }
                    />

                    FLASHING
                  </label>

                  <label className="check">
                    <input
                      type="checkbox"
                      checked={
                        selectedElement.reverseVideo
                      }
                      onChange={(
                        e,
                      ) =>
                        updateElement({
                          reverseVideo:
                            e.target
                              .checked,
                        })
                      }
                    />

                    REVERSE VIDEO
                  </label>
                </div>
              ) : (
                <div className="empty-selection">
                  Selecciona un ELEMENT
                  de la pantalla o del
                  árbol.
                </div>
              )}
            </>
          )}
        </aside>
      </main>
    </div>
  );
}

function UnitTree({
  unit,
  selectedUnitKey,
  selectedElementId,
  onSelect,
}: {
  unit: ScreenUnit;
  selectedUnitKey: string;
  selectedElementId: string;
  onSelect: (
    unitKey: string,
    elementId: string,
  ) => void;
}) {
  return (
    <div
      className={`tree-unit ${
        selectedUnitKey === unit.key
          ? "active"
          : ""
      }`}
    >
      <button
        className="unit-item"
        onClick={() =>
          onSelect(
            unit.key,
            unit.elements[0]?.id ??
              "",
          )
        }
      >
        <span>▾</span>

        <strong>
          {unit.key}
        </strong>

        <em>
          R{unit.row}
        </em>
      </button>

      <div className="elements">
        {unit.elements.map(
          (element, i) => (
            <button
              key={
                element.id
              }
              className={`element-item ${
                selectedElementId ===
                  element.id &&
                selectedUnitKey ===
                  unit.key
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                onSelect(
                  unit.key,
                  element.id,
                )
              }
            >
              <span>
                ELEMENT_{i + 1}
              </span>

              <small>
                {element.title ||
                  "(empty)"}
              </small>
            </button>
          ),
        )}
      </div>
    </div>
  );
}