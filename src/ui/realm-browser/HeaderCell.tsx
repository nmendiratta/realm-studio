import * as React from "react";
import Draggable, { DraggableData } from "react-draggable";
import * as Realm from "realm";

// This constant should match the $realm-browser-header-handle-width in scss
const HANDLE_WIDTH = 8;
const HANDLE_OFFSET = HANDLE_WIDTH / 2;

export const getPropertyDisplayed = (property: Realm.ObjectSchemaProperty) => {
  let typeDesc;

  switch (property.type) {
    case "list":
      typeDesc = `${property.objectType}[]`;
      break;
    case "object":
    case "linkingObjects":
      typeDesc = property.objectType;
      break;
    default:
      typeDesc = property.type;
  }

  if (property.optional) {
    typeDesc += " (optional)";
  }

  return typeDesc;
};

export const HeaderCell = ({
  onWidthChanged,
  property,
  propertyName,
  style,
  width,
}: {
  onWidthChanged: (width: number) => void,
  property: Realm.ObjectSchemaProperty,
  propertyName: string,
  style: React.CSSProperties,
  width: number,
}) => (
  <div style={style} className="RealmBrowser__Content__HeaderCell" title={propertyName}>
    <div className="RealmBrowser__Content__HeaderName">
      {propertyName}
    </div>
    <div className="RealmBrowser__Content__HeaderType">
      {getPropertyDisplayed(property)}
    </div>
    <Draggable axis="x" onDrag={(e: Event, data: DraggableData) => {
      onWidthChanged(data.x + HANDLE_OFFSET);
    }} position={{
      x: width - HANDLE_OFFSET,
      y: 0,
    }}>
      <div className="RealmBrowser__Content__HeaderHandle" />
    </Draggable>
  </div>
);
