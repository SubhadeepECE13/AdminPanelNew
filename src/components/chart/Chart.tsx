import React, { useState } from "react";
import { faker } from "@faker-js/faker";

import { useTranslation } from "react-i18next";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import classes from "./Chart.module.scss";
import data from "../../constants/data";
import Card from "../UI/card/Card";

const SaleChart = () => {
  const { t } = useTranslation();
  const labels = data.revenueByMonths.labels.map((month) => t(month));
  const [userData] = useState({
    labels,
    datasets: [
      {
        label: t("summaryOfSale"),
        data: data.revenueByMonths.data,
        borderColor: "rgba(22, 24, 114, 0.99)",
        backgroundColor: "rgba(247, 211, 8, 0.99)",
      },
    ],
  });

  const [orderData] = useState({
    labels,
    datasets: [
      {
        label: t("summaryOfOrders"),
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgba(22, 24, 114, 0.99)",
      },
    ],
  });

  const [revenueData] = useState({
    labels,
    datasets: [
      {
        label: t("summaryOfRevenue"),
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgba(22, 24, 114, 0.99)",
      },
    ],
  });

  return (
    <section className={classes.chart}>
      <p className="subTitle">{t("quickAnalysis")}</p>
      <div className={classes.charts__container}>
        <div className={classes.charts__wrapper}>
          <Card>
            <div className={classes.chart__wrapper}>
              <BarChart
                chartData={orderData}
                chartTitle={`${t("summaryOfOrders")}`}
              />
            </div>
          </Card>
          <Card>
            <div className={classes.chart__wrapper}>
              <BarChart
                chartData={revenueData}
                chartTitle={`${t("summaryOfRevenue")}`}
              />
            </div>
          </Card>
        </div>
        <Card>
          <div className={classes.chart__wrapper}>
            <LineChart chartData={userData} />
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SaleChart;
