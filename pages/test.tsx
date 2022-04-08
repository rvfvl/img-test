import React, { ReactNode, useState } from "react";

enum AvailableWidgetTypes {
  TEXT = "text",
  IMAGE = "image",
  SECTION = "section",
}

const WIDGETS: (IWidget | ISection)[] = [
  { type: AvailableWidgetTypes.TEXT, properties: { value: "", label: "" } },
  { type: AvailableWidgetTypes.IMAGE, properties: { src: "" } },
  { type: AvailableWidgetTypes.SECTION, widgets: [] },
];

type IWidget =
  | {
      type: AvailableWidgetTypes.TEXT;
      properties: { value: string; label: string };
    }
  | {
      type: AvailableWidgetTypes.IMAGE;
      properties: { src: string };
    };

interface ISection {
  type: AvailableWidgetTypes.SECTION;
  widgets: (IWidget | ISection)[];
}

const Section = ({ children }: { children: ReactNode }) => (
  <>
    <div style={{ fontWeight: 700 }}>Section:</div>
    {children && <div>{children}</div>}
  </>
);

const test = () => {
  const [config, setConfig] = useState<ISection[]>([
    {
      type: AvailableWidgetTypes.SECTION,
      widgets: [
        {
          type: AvailableWidgetTypes.SECTION,
          widgets: [
            {
              type: AvailableWidgetTypes.TEXT,
              properties: { value: "", label: "" },
            },
            {
              type: AvailableWidgetTypes.SECTION,
              widgets: [
                { type: AvailableWidgetTypes.IMAGE, properties: { src: "" } },
              ],
            },
          ],
        },
      ],
    },
    {
      type: AvailableWidgetTypes.SECTION,
      widgets: [],
    },
  ]);

  const addConfigType = (type: AvailableWidgetTypes) => () => {
    const configValue = JSON.parse(
      JSON.stringify(
        WIDGETS.find((widget: IWidget | ISection) => widget.type === type) ?? ""
      )
    );

    if (configValue === "") return;

    setConfig((prev) => [...prev, configValue]);
  };

  const generateVisualTree = (config: ISection[]): ReactNode => {
    const createNode = (section: ISection | IWidget) => (
      <div
        style={{
          marginLeft: 20,
          minWidth: "500px",
        }}
      >
        {section.type === "section" ? (
          <Section>
            {section.widgets.map((item: IWidget | ISection) =>
              createNode(item)
            )}
          </Section>
        ) : (
          <>{JSON.stringify(section, null, 2)}</>
        )}
      </div>
    );

    return (
      <div>
        {config.map((item: ISection) => (
          <div>{createNode(item)}</div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", gap: "10rem" }}>
      <div>
        <h1>Items</h1>
        <div>
          {WIDGETS.map((widget: ISection | IWidget) => (
            <button onClick={addConfigType(widget.type)}>
              Add {widget.type}
            </button>
          ))}
        </div>
        <div>{generateVisualTree(config)}</div>
      </div>
      <div>PREVIEW</div>
      <div>{JSON.stringify(config, null, "\t")}</div>
    </div>
  );
};

export default test;
