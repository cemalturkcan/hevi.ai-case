import "./style.css";

function LoadingBase({ isLoading }: { isLoading: boolean }) {
  return (
    isLoading && (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    )
  );
}

export default LoadingBase;
