import ReactPlaceholder from "react-placeholder/lib";
import { RectShape } from "react-placeholder/lib/placeholders";

const CardSkeleton = (props) => {
  const { rows } = props;
  return (
    <ReactPlaceholder
      type="rect"
      customPlaceholder={
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-y-hidden gap-4">
          {[...Array(rows).keys()].map((item, index) => {
            return (
              <div
                style={{
                  backgroundColor: `${"#f5f5f5"}`,
                }}
                key={index}
              >
                <RectShape
                  color={"#dedede"}
                  style={{
                    width: "95%",
                    height: 128,
                    marginBottom: "20px",
                    marginLeft: "2px",
                    marginRight: "2px",
                    marginTop: "2px",
                  }}
                />
                <RectShape
                  color={"#dedede"}
                  style={{ width: "80%", height: 15, marginBottom: "20px" }}
                />
                <RectShape
                  color={"#dedede"}
                  style={{ width: "40%", height: 15, marginBottom: "20px" }}
                />
                <RectShape
                  color={"#dedede"}
                  style={{ width: "70%", height: 15, marginBottom: "20px" }}
                />
                <RectShape
                  color={"#dedede"}
                  style={{
                    width: "95%",
                    height: 40,
                    marginBottom: "2px",
                    marginLeft: "2px",
                    marginRight: "2px",
                  }}
                />
              </div>
            );
          })}
        </div>
      }
    >
      {props.children}
    </ReactPlaceholder>
  );
};

export default CardSkeleton;
