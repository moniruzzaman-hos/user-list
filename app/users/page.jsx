"use client";

import ApiKit from "@/common/helper/Apikit";
import List from "@/components/List/List";
import { get } from "lodash";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Users() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const callData = () => {
    const onSuccess = (response) => {
      const data = get(response, "data", {});
      const getUsers = get(data, "users", []);
      if (getUsers.length === 0) {
        toast.error("No data found");
      }
      setData(getUsers);
    };
    const onError = (error) => {
      toast.error("Error fetching data");
    };

    const onFinally = () => {
      setLoading(false);
    };

    ApiKit.user.getUser().then(onSuccess).catch(onError).finally(onFinally);
  };

  const init = () => {
    setLoading(true);
    callData();
  };
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center">
      <List loading={loading} data={data} callApi={init} />
    </div>
  );
}

export default Users;
