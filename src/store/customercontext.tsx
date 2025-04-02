import React, { createContext, useContext, useState } from "react";
import { IcustomersTable } from "../interfaces/Itable";
import { customers as initialCustomers } from "../constants/tables";

interface CustomersContextType {
  customers: IcustomersTable[];
  updateCustomer: (customer: IcustomersTable) => void;
}

const CustomersContext = createContext<CustomersContextType>({
  customers: [],
  updateCustomer: () => {},
});

export const CustomersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customers, setCustomers] = useState<IcustomersTable[]>(initialCustomers);

  const updateCustomer = (updatedCustomer: IcustomersTable) => {
    setCustomers((prev) => {
      const updatedList = prev.map((customer) =>
        customer.ID === updatedCustomer.ID ? updatedCustomer : customer
      );
      return [...updatedList]; // Return new array to trigger re-render
    });
  };

  return (
    <CustomersContext.Provider value={{ customers, updateCustomer }}>
      {children}
    </CustomersContext.Provider>
  );
};

export const useCustomers = () => useContext(CustomersContext);
