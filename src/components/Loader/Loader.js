import PuffLoader from "react-spinners/PuffLoader";
import './Loader.css'

const Loader = ({ isloading }) => {
  return (
    <div className="loader">
      <PuffLoader
        color={"#d6caca"}
        loading={isloading}
        speedMultiplier={1.2}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> <span><p>Searching tweets...</p></span>
    </div>
  );
}

export default Loader;