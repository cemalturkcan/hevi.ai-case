// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

import { useEffect, useRef, useState } from "react";
import cornerstone from "cornerstone-core";

import cornerstoneTools from "cornerstone-tools";
import cornerstoneMath from "cornerstone-math";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";
import Hammer from "hammerjs";

cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.init({ showSVGCursors: true });

export interface RectangleRoiToolData {
  areaInPixels: number;
  mean: number;
  stdDev: number;
  max: number;
  id: string;
}

export const TOOL_NAMES = {
  RECTANGLE_ROI: "RectangleRoi",
};

export const useDicomViewer = ({ image }: { image: string | null }) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [activeTools, setActiveTools] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const toolAdded = useRef(false);
  const [rectangleRoiTool, setRectangleRoiTool] = useState<
    RectangleRoiToolData[]
  >([]);

  const updateRectangleRoiTool = () => {
    const toolData = cornerstoneTools.getToolState(
      elementRef.current,
      TOOL_NAMES.RECTANGLE_ROI,
    );
    if (toolData) {
      const temp: RectangleRoiToolData[] = toolData.data.map((data: any) => ({
        areaInPixels: data.cachedStats.area.toFixed(2),
        mean: data.cachedStats.mean.toFixed(2),
        stdDev: data.cachedStats.stdDev.toFixed(2),
        max: data.cachedStats.max.toFixed(2),
        id: data.uuid,
      }));
      setRectangleRoiTool(temp);
    }
  };

  function deleteRectangleById(id: string) {
    const toolData = cornerstoneTools.getToolState(
      elementRef.current,
      TOOL_NAMES.RECTANGLE_ROI,
    );
    if (toolData) {
      toolData.data = toolData.data.filter((data: any) => data.uuid !== id);

      updateRectangleRoiTool();

      cornerstone.updateImage(elementRef.current);
    }
  }

  useEffect(() => {
    if (!image) {
      return;
    }

    if (elementRef.current) {
      cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
      cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
      cornerstoneTools.external.cornerstoneMath = cornerstoneMath;

      cornerstone.enable(elementRef.current);
      const imageId = `wadouri:${image}`;

      cornerstone.loadImage(imageId).then((image) => {
        setLoading(false);
        cornerstone.displayImage(elementRef.current, image);
        if (!toolAdded.current) {
          toolAdded.current = true;
          const RectangleRoiTool = cornerstoneTools.RectangleRoiTool;
          cornerstoneTools.addTool(RectangleRoiTool);
          elementRef.current?.addEventListener(
            "cornerstonetoolsmeasurementmodified",
            updateRectangleRoiTool,
          );
          elementRef.current?.addEventListener(
            "cornerstonetoolsmeasurementremoved",
            updateRectangleRoiTool,
          );
        }
      });
    }
    return () => {
      if (elementRef.current) {
        cornerstone.disable(elementRef.current);
      }
    };
  }, [image]);

  const toggleTool = (toolName: string) => {
    if (activeTools.includes(toolName)) {
      cornerstoneTools.setToolDisabled(toolName);
      setActiveTools(activeTools.filter((tool) => tool !== toolName));
    } else {
      cornerstoneTools.setToolActive(toolName, { mouseButtonMask: 1 });
      setActiveTools([...activeTools, toolName]);
    }
  };

  return {
    elementRef,
    rectangleRoiTool,
    toggleTool,
    activeTools,
    deleteRectangleById,
    loading,
  };
};
