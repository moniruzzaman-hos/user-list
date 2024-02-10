import Footer from "../Footer/layout";
import Header from "../Header/layout";

const BaseLayout = (props) => {
  return (
    <div className="top-0 min-h-screen flex flex-col w-full">
      <div>
        <Header />
        {props.children}
      </div>
      <div className="mt-auto w-full list-none h-24 bg-gray-200">
        <Footer />
      </div>
    </div>
  );
};

export default BaseLayout;
