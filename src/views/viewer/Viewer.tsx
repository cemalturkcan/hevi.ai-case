import React, { useEffect } from "react";
import "./style.css";
import { useDicomViewer } from "@/hook/useViewer.tsx";
import ViewerNav from "@/components/viewer/viewernav/ViewerNav.tsx";
import { useParams } from "react-router-dom";
import data from "@/assets/dummy/data.json";
import LoaderBase from "@/layout/loader/LoaderBase.tsx";
import { Studies } from "@/types/types";

const DicomViewer: React.FC = () => {
  const [image, setImage] = React.useState<string | null>(null);
  const typedData = data as Studies;

  const {
    elementRef,
    rectangleRoiTool,
    toggleTool,
    activeTools,
    deleteRectangleById,
    loading,
  } = useDicomViewer({
    image,
  });

  const { id } = useParams();

  useEffect(() => {
    const study = typedData.studies.find((study) => study.id === id);
    if (study) {
      setImage(study.dcm);
    }
  }, [id]);

  return (
    <>
      <LoaderBase isLoading={loading} />
      <div className="viewer-container">
        <div ref={elementRef} className="viewer"></div>
        <ViewerNav
          rectangleRoiTool={rectangleRoiTool}
          activeTools={activeTools}
          deleteRectangleById={deleteRectangleById}
          toggleTool={toggleTool}
        />
      </div>
    </>
  );
};

export default DicomViewer;
