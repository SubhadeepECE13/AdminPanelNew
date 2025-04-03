import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomTable from "../components/tables/customTable/CustomTable";
import { IProductsTable } from "../interfaces/Itable";
import { products, productsHeader } from "../constants/tables";
import Dropdown from "../components/UI/dropdown/Dropdown";

const dropdownOptions = [
  { label: "All", value: "all" },
  { label: "Digital", value: "digital" },
  { label: "Clothing", value: "clothing" },
  { label: "Beauty", value: "beauty" },
];

function Products() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(dropdownOptions[0].value);

  function selectedChangeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelected(() => e.target.value);
  }

  // Filter data based on selected category
  const tableData = selected === "all" 
    ? products 
    : products.filter((item) => item.category === selected);

  return (
    <section>
      <h2 className="title">{t("Projects")}</h2>
      <Dropdown
        dropdownData={dropdownOptions}
        onChange={selectedChangeHandler}
      />
      <CustomTable
        selectedCategory={selected}
        headData={productsHeader}
        bodyData={tableData}
        limit={10}
      />
    </section>
  );
}

export default Products;