"use client";

import ApiKit from "@/common/helper/Apikit";
import { get, isEmpty } from "lodash";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import defaultImage from "@/assets/images/user.png";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/Loading/layout";

function Details({ params }) {
  const { id } = params;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const firstName = get(data, "firstName", "");
  const lastName = get(data, "lastName", "");
  const email = get(data, "email", "");
  const imageUrl = get(data, "image", "");

  const address = get(data, "address", {});
  const city = get(address, "city", "");
  const postalCode = get(address, "postalCode", "");
  const addressName = get(address, "address", "");

  const company = get(data, "company", {});
  const companyName = get(company, "name", "");
  const companyDept = get(company, "department", "");

  const handleBack = () => {
    router.push("/users");
  };

  const callData = () => {
    const onSuccess = (response) => {
      const data = get(response, "data", {});
      setData(data);
    };
    const onError = (error) => {
      toast.error("Error fetching data");
    };

    const onFinally = () => {
      setLoading(false);
    };

    ApiKit.user
      .getUserById(id)
      .then(onSuccess)
      .catch(onError)
      .finally(onFinally);
  };

  const init = () => {
    setLoading(true);
    callData();
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!isEmpty(data)) {
      window.sessionStorage.removeItem("userDetails");
    } else {
      const data = window.sessionStorage.getItem("userDetails");
      setData(JSON.parse(data));
    }
  }, [data]);

  const PersonalTab = (
    <div className="flex flex-col p-6">
      <h3 className="text-2xl">PERSONAL INFORMATION</h3>
      <div className="grid grid-cols-1 md:grid-cols-2  mt-2 text-md">
        <div className="flex flex-col">
          <div className="grid grid-cols-2">
            <span className="ml-2 my-2 font-medium">Name</span>
            <span className="ml-2 my-2">
              {firstName ? `${firstName}` : ""} {lastName ? `${lastName}` : ""}
            </span>
          </div>
          <div className="grid grid-cols-2">
            <span className="ml-2 my-2 font-medium">Email</span>
            <span className="ml-2 my-2">{email}</span>
          </div>
          <div className="grid grid-cols-2">
            <span className="ml-2 my-2 font-medium">Address</span>
            <span className="ml-2 my-2">
              {addressName ? `${addressName}` : ""}
              {city ? `, ${city}` : ""}
              {postalCode ? `, ${postalCode}` : ""}
            </span>
          </div>
          <div className="grid grid-cols-2">
            <span className="ml-2 my-2 font-medium">Company</span>
            <span className="ml-2 my-2">
              {companyName ? `${companyName}` : ""}
              {companyDept ? `, ${companyDept}` : ""}
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src={imageUrl ? imageUrl : defaultImage}
            width={200}
            height={200}
            alt="Picture of the author"
          />
        </div>
      </div>
    </div>
  );
  return (
    <div className="">
      <h1 className="text-2xl font-bold  ml-6 my-4">Details</h1>
      <hr />
      {loading ? <LoadingSpinner show={loading} /> : <>{PersonalTab}</>}
      <div className="flex justify-end mr-6 mt-16">
        {/* add a back button */}
        <button
          onClick={handleBack}
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default Details;
