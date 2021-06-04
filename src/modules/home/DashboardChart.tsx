import { Box, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import React from "react";
import { default as ReactApexChart } from "react-apexcharts";
import { useIntl } from "react-intl";
import { some, SUCCESS_CODE } from "../../constants/constants";
import {
  actionGetDataColumn,
  actionGetDataPie,
} from "../app_manager/managerAction";
import { Row } from "../common/Elements";
import FormControlTextField from "../common/FormControlTextField";
const DashboardChart = (props: any) => {
  const [startDate, setStartDate] = React.useState<string>("2021-05-14");
  const [endDate, setEndDate] = React.useState<string>("2021-06-03");
  const [dataColumn, setDataColumn] = React.useState<some>({});
  const [dataPie, setDataPie] = React.useState<some>({});
  const intl = useIntl();
  const ActionGetDataLine = async () => {
    try {
      const res: some = await actionGetDataColumn({
        fromDate: startDate,
        toDate: endDate,
      });
      if (res?.code === SUCCESS_CODE) {
        setDataColumn(res);
      } else {
      }
    } catch (error) {}
  };
  const ActionGetDataPie1 = async () => {
    try {
      const res: some = await actionGetDataPie({
        fromDate: startDate,
        toDate: endDate,
      });
      if (res?.code === SUCCESS_CODE) {
        setDataPie(res);
      } else {
      }
    } catch (error) {}
  };
  React.useEffect(() => {
    ActionGetDataLine();
    ActionGetDataPie1();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);
  const ConvertDataColumn = () => {
    let DataColumnConvert: some = { x: [], y: [] };
    dataColumn?.data?.forEach((items: some) => {
      DataColumnConvert.x.push(items.date);
      DataColumnConvert.y.push(items.value);
    });
    return DataColumnConvert;
  };
  const series = [
    {
      name: "Doanh thu",
      data: ConvertDataColumn().y,
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Thống kê doanh thu theo ngày",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ConvertDataColumn().x,
    },
  };
  const seriesPie =
    dataPie?.data?.labels !== undefined && dataPie?.data?.labels;
  const optionsPie = {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: dataPie?.data?.series,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <Box style={{ padding: 24 }}>
      <Row className="header-management">
        <Typography variant="subtitle1" component="p">
          {intl.formatMessage({ id: "IDS_DASHBOARD" })}
        </Typography>
      </Row>
      <Row>
        <FormControlTextField
          id="date"
          label="Từ Ngày"
          type="date"
          value={startDate}
          placeholder={intl.formatMessage({ id: "Chọn" })}
          onChange={(event: any) => setStartDate(event.target.value)}
          formControlStyle={{ width: 80 }}
        />
        <FormControlTextField
          id="date"
          label="Đến Ngày"
          type="date"
          value={endDate}
          placeholder={intl.formatMessage({ id: "Chọn" })}
          onChange={(event: any) => setEndDate(event.target.value)}
          formControlStyle={{ width: 80 }}
        />
      </Row>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        <Paper style={{ flex: 1 }} elevation={5}>
          <ReactApexChart
            options={options || {}}
            series={series || {}}
            type="line"
            height={450}
          />
        </Paper>
        <div style={{ flex: 1, paddingLeft: "5%" }}>
          <Paper elevation={5}>
            <Typography variant="h5" style={{ padding: 10 }}>
              Thống kê theo sản phẩm
            </Typography>
            <ReactApexChart
              options={optionsPie || {}}
              series={seriesPie || {}}
              type="pie"
              width={600}
            />
          </Paper>
        </div>
      </div>
    </Box>
  );
};
export default DashboardChart;
