"use client";

import { isEmpty } from "lodash";
import get from "lodash/get";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import defaultImage from "@/assets/images/user.png";
import NoDataFound from "../NoDataFound/layout";
import CardSkeleton from "../Skeletons/layout";
import CommonHeader from "../CommonHeader/CommonHeader";

const BodyListItem = ({ router, id, item }) => {
  const firstName = get(item, "firstName", "");
  const lastName = get(item, "lastName", "");
  const email = get(item, "email", "");
  const imageUrl = get(item, "image", "");

  const address = get(item, "address", {});
  const city = get(address, "city", "");
  const postalCode = get(address, "postalCode", "");
  const addressName = get(address, "address", "");

  const company = get(item, "company", {});
  const companyName = get(company, "name", "");
  const companyDept = get(company, "department", "");

  const handleDetails = () => {
    router.push(`/users/${id}`);
    window.sessionStorage.setItem("userDetails", JSON.stringify(item));
  };

  return (
    <div className="h-[400px] bg-gray-300 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-70 border border-gray-100">
      <div className="flex items-center h-36 rounded-xl bg-cyan-950 bg-opacity-10 border-green-950 relative">
        <Image
          src={imageUrl ? imageUrl : defaultImage}
          layout="fill"
          priority={true}
          objectFit="contain"
          className="rounded-xl p-1"
          alt=""
        />
      </div>
      <div className="mt-2 ml-2">
        <div className="flex flex-col">
          <p>
            <span className="text-sm font-semibold text-gray-700">
              First Name:{" "}
            </span>
            <span>{firstName ? `${firstName}` : ""}</span>
          </p>
          <p>
            <span className="text-sm font-semibold text-gray-700">
              Last Name:{" "}
            </span>
            <span>{lastName ? `${lastName}` : ""}</span>
          </p>
          <p className="text-sm font-light text-gray-700">
            <span className="font-semibold">Email: </span>
            {email}
          </p>

          <p className="text-sm font-light text-gray-700">
            <span className="font-semibold">Address: </span>
            {addressName ? `${addressName}` : ""},{city ? ` ${city}` : ""},
            {postalCode ? ` ${postalCode}` : ""}
          </p>

          <p className="text-sm font-light text-gray-700">
            <span className="font-semibold">Company: </span>
            {companyName ? `${companyName}` : ""},
            {companyDept ? ` ${companyDept}` : ""}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="absolute p-2 bottom-0 w-full">
          <button
            onClick={handleDetails}
            className="w-full py-2 rounded-lg bg-teal-500 hover:bg-teal-600"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

const BodyItem = ({ listDataResults = [], router }) => {
  return (
    Array.isArray(listDataResults) &&
    listDataResults?.length > 0 &&
    listDataResults?.map?.((item, itemIndex) => {
      const id = get(item, "id", "id");
      return (
        <div className="md:hover:bg-listItemHoverBg" key={`${id}-${itemIndex}`}>
          <BodyListItem
            itemIndex={itemIndex}
            router={router}
            id={id}
            item={item}
          />
        </div>
      );
    })
  );
};

const List = ({ loading = false, data = [], callApi }) => {
  const [listData, setListData] = useState(data);
  const [isLoading, setIsLoading] = useState(loading);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [listDataResults, setListDataResults] = useState(
    listData ? listData : []
  );

  let lastIndexOfData = listDataResults?.length - 1;

  const router = useRouter();

  const handleSearch = (value) => {
    setSearchValue(value);
    const search = value.toLowerCase();
    const initialData = listData && listData?.length ? listData : data;
    const filteredData =
      initialData &&
      initialData?.length &&
      initialData.filter((item) => {
        return (
          item?.firstName?.toLowerCase().includes(search) ||
          item?.lastName?.toLowerCase().includes(search)
        );
      });
    setListData(filteredData);
  };

  const sortByName = () => {
    const sortedData = listDataResults.sort((a, b) => {
      const nameA = a?.firstName?.toLowerCase();
      const nameB = b?.firstName?.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    return sortedData;
  };

  const sortByEmail = () => {
    const sortedData = listDataResults.sort((a, b) => {
      const emailA = a?.email?.toLowerCase();
      const emailB = b?.email?.toLowerCase();
      if (emailA < emailB) {
        return -1;
      }
      if (emailA > emailB) {
        return 1;
      }
      return 0;
    });
    return sortedData;
  };

  const sortByCompany = () => {
    const sortedData = listDataResults.sort((a, b) => {
      const companyA = a?.company?.name?.toLowerCase();
      const companyB = b?.company?.name?.toLowerCase();
      if (companyA < companyB) {
        return -1;
      }
      if (companyA > companyB) {
        return 1;
      }
      return 0;
    });
    return sortedData;
  };

  const handleSort = (value) => {
    if (!value) {
      return;
    }
    setSortValue(value);
  };

  const handleFormSubmit = (data) => {
    setListDataResults([...listDataResults, data]);
    setListData([...listData, data]);
  };

  useEffect(() => {
    setListData(data);
    setIsLoading(loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);

  useEffect(() => {
    const newLastIndexOfData = listDataResults?.length - 1;
    if (lastIndexOfData !== newLastIndexOfData) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      lastIndexOfData = newLastIndexOfData;
    }
  }, [listDataResults, listData, data]);

  useEffect(() => {
    let sortedData = [];
    if (sortValue === "name") {
      sortedData = sortByName();
    }
    if (sortValue === "email") {
      sortedData = sortByEmail();
    }
    if (sortValue === "company") {
      sortedData = sortByCompany();
    }
    setListDataResults(sortedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortValue]);

  useEffect(() => {
    setListDataResults(listData);
  }, [listData]);

  const NoDataFoundItem = (
    <NoDataFound
      heading={`No Data Found`}
      button={<span onClick={() => callApi?.()}>TRY AGAIN?</span>}
    />
  );

  const TableItem = (
    <BodyItem router={router} listDataResults={listDataResults} />
  );

  const ListContentItem = (
    <div className="text-sm flex flex-grow flex-col justify-around">
      <CommonHeader
        onChange={handleSearch}
        onSort={handleSort}
        formSubmit={handleFormSubmit}
        lastIndexOfData={lastIndexOfData}
        value={searchValue}
      />
      {Array.isArray(listDataResults) && isEmpty(listDataResults) ? (
        !isLoading ? (
          <div className="flex flex-grow border border-borderColor m-4 items-center">
            {NoDataFoundItem}
          </div>
        ) : (
          <></>
        )
      ) : !isLoading && !Array.isArray(listDataResults) ? (
        <div className="flex flex-grow border border-borderColor m-4 items-center">
          {NoDataFoundItem}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 overflow-y-hidden justify-items-stretch gap-4 p-4">
          {TableItem}
        </div>
      )}
      {isLoading ? <CardSkeleton rows={20} /> : <></>}
    </div>
  );

  return <>{ListContentItem}</>;
};

export default List;
