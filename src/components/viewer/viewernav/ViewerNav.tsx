import "./style.css";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { RectangleRoiToolData } from "@/hook/useViewer.tsx";

const ViewerNav = ({
  rectangleRoiTool,
  activeTools,
  toggleTool,
  deleteRectangleById,
}: {
  rectangleRoiTool: RectangleRoiToolData[];
  activeTools: string[];
  toggleTool: (toolName: string) => void;
  deleteRectangleById: (id: string) => void;
}) => {
  const { t } = useTranslation();

  return (
    <div className="viewer-nav">
      <div className="buttons">
        <Button
          label={t("measurements")}
          severity={
            activeTools.includes("RectangleRoi") ? "success" : "secondary"
          }
          icon="pi pi-arrow-up-right-and-arrow-down-left-from-center"
          size="small"
          iconPos="top"
          onClick={() => {
            toggleTool("RectangleRoi");
          }}
        />
      </div>
      {rectangleRoiTool.length > 0 && (
        <div className="overflow-y-auto flex flex-column  h-full gap-4 ">
          {rectangleRoiTool.map((tool: RectangleRoiToolData, index: number) => (
            <div key={tool.id} className="rect-data ">
              <div className="flex">
                <div className="tag">{index + 1}</div>
                <div className="measurements text-xs">
                  <p className="measurement">{tool.areaInPixels} mm²</p>
                  <div className="measurement-group">
                    <p className="measurement">
                      {t("max")}: {tool.max} {t("hu")}
                    </p>
                  </div>
                </div>
              </div>
              <i
                className="pi pi-times  cursor-pointer"
                onClick={() => {
                  deleteRectangleById(tool.id);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewerNav;
