"use client";

import React, { useState } from "react";
import TextInput from "../Input/TextInput";

const initialState = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  address: {
    address: "",
    city: "",
    postalCode: "",
  },
  company: {
    name: "",
    department: "",
  },
  image: "",
};

function CommonHeader({
  value = "",
  onChange,
  onSort,
  formSubmit,
  lastIndexOfData,
  ...restProps
}) {
  const [formData, setFormData] = useState(initialState);

  const handleOnChange = (e) => {
    onChange(e);
  };
  const handleSort = (e) => {
    onSort(e);
  };

  const handleModalOpen = (modalId) => {
    document.getElementById(modalId).style.display = "block";
    document.getElementsByTagName("body")[0].classList.add("overflow-y-hidden");
  };

  const handleModalClose = (modalId) => {
    document.getElementById(modalId).style.display = "none";
    document
      .getElementsByTagName("body")[0]
      .classList.remove("overflow-y-hidden");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    formSubmit({
      ...formData,
      id: lastIndexOfData + 5,
    });
    setFormData(initialState);
    handleModalClose("modelConfirm");
  };

  return (
    <div className="border-t border-teal-800 bg-gray-200">
      <div className="flex justify-between items-center p-4">
        <div className="text-2xl font-semibold">User List</div>
        <div className="flex flex-row gap-4 items-center">
          {/* create select dropdown */}
          <div>
            <select
              className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:border-teal-500"
              onChange={(e) => {
                const value = e.target.value;
                handleSort(value);
              }}
              {...restProps}
            >
              <option value="">Select</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="company">Company</option>
            </select>
          </div>
          <div>
            <TextInput
              placeholder="Search"
              className="rounded-lg border border-gray-300 p-2"
              onChange={(e) => {
                const value = e.target.value;
                handleOnChange(value);
              }}
              type="text"
              name="userSearch"
              value={value}
            />
          </div>
          <div className="">
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              onClick={() => handleModalOpen("modelConfirm")}
            >
              Add User
            </button>

            <div
              id="modelConfirm"
              className="fixed hidden z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 "
            >
              <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-2xl">
                <div
                  onClick={() => handleModalClose("modelConfirm")}
                  type="button"
                  className="flex justify-between items-center mt-2 h-12"
                >
                  <span className="ml-4 text-2xl font-semibold">
                    Add User Form
                  </span>
                  <span className="text-gray-400 mr-2 bg-transparent hover:bg-red-200 hover:text-gray-900 rounded-lg text-sm p-2 inline-flex items-center">
                    Close
                  </span>
                </div>

                <div className="p-6 pt-0">
                  {/* add a form of user */}
                  <form
                    className="border-2 p-4 rounded-lg"
                    onSubmit={handleFormSubmit}
                  >
                    <div className="flex flex-col gap-4">
                      <div>
                        <TextInput
                          placeholder="First Name"
                          className="rounded-lg border border-gray-300 p-2"
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData({ ...formData, firstName: value });
                          }}
                        />
                      </div>
                      <div>
                        <TextInput
                          placeholder="Last Name"
                          className="rounded-lg border border-gray-300 p-2"
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData({ ...formData, lastName: value });
                          }}
                        />
                      </div>
                      <div>
                        <TextInput
                          placeholder="Email"
                          className="rounded-lg border border-gray-300 p-2"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData({ ...formData, email: value });
                          }}
                        />
                      </div>
                      <div>
                        <TextInput
                          placeholder="Address"
                          className="rounded-lg border border-gray-300 p-2"
                          type="text"
                          name="address"
                          value={formData.address.address}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData({
                              ...formData,
                              address: { ...formData.address, address: value },
                            });
                          }}
                        />
                      </div>
                      <div>
                        <TextInput
                          placeholder="City"
                          className="rounded-lg border border-gray-300 p-2"
                          type="text"
                          name="city"
                          value={formData.address.city}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData({
                              ...formData,
                              address: { ...formData.address, city: value },
                            });
                          }}
                        />
                      </div>
                      <div>
                        <TextInput
                          placeholder="Postal Code"
                          className="rounded-lg border border-gray-300 p-2"
                          type="text"
                          name="postalCode"
                          value={formData.address.postalCode}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData({
                              ...formData,
                              address: {
                                ...formData.address,
                                postalCode: value,
                              },
                            });
                          }}
                        />
                      </div>
                      <div>
                        <TextInput
                          placeholder="Company"
                          className="rounded-lg border border-gray-300 p-2"
                          type="text"
                          name="company"
                          value={formData.company.name}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData({
                              ...formData,
                              company: { ...formData.company, name: value },
                            });
                          }}
                        />
                      </div>
                      <div>
                        <TextInput
                          placeholder="Department"
                          className="rounded-lg border border-gray-300 p-2"
                          type="text"
                          name="department"
                          value={formData.company.department}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData({
                              ...formData,
                              company: {
                                ...formData.company,
                                department: value,
                              },
                            });
                          }}
                        />
                      </div>
                      <div>
                        <TextInput
                          placeholder="Image URL"
                          className="rounded-lg border border-gray-300 p-2"
                          type="text"
                          name="image"
                          value={formData.image}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData({
                              ...formData,
                              image: value,
                            });
                          }}
                        />
                      </div>
                      <div>
                        <button
                          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                          type="submit"
                        >
                          Add User
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommonHeader;
