import React from "react";
import { useTranslation } from "react-i18next";
import CustomTable from "../components/tables/customTable/CustomTable";
import { products, productsHeader } from "../constants/tables";

function Projects() {
  const { t } = useTranslation();

  return (
    <section>
      <h2 className="title">{t("Projects")}</h2>
      <CustomTable
        headData={productsHeader}
        bodyData={products}
        limit={10}
      />
    </section>
  );
}

export default Projects;