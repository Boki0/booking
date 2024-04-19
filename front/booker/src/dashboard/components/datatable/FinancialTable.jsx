import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { DataGrid } from "@mui/x-data-grid";
import "./datatable.scss"
import { columnsData } from "../../datatablesource";
import { AuthContext } from "../../../components/context/AuthContext";
import ChangeProfitPercentage from "./ChangeProfitPercentage";
import DateBox from "devextreme-react/date-box";
import NotificationProvider from "../../../components/notification/NotificationProvider";


const FinancialTable = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [list, setList] = useState();
  const [totalInfo, setTotalInfo] = useState();
	const { user } = useContext(AuthContext);
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.accessToken}`,
  }
 
  const { data, loading, error } = useFetch(`http://localhost:8080/api/reservations-profit`);
  console.log(user)
  const columns = columnsData[user.type + "/FINANCIAL"];

  useEffect(() => {
    setList(data);
  }, [data]);

  const [startDate, setStartDate] = useState(new Date(2022, 0, 1));
  const [endDate, setEndDate] = useState(Date.now());
  const [startDatePicked, setStartDatePicked] = useState(false);
  const [endDatePicked, setEndDatePicked] = useState(false);

  const calculateTotalFlow = () =>
  {
    var totalCashFlow = 0;
    for(let reservation of data)
    {
        if(new Date(reservation.reservationEndDate) >= new Date(startDate) && new Date(reservation.reservationEndDate) <= new Date(endDate))
        {
          var cashFlow = parseInt(reservation.cashFlow.slice(1));
          totalCashFlow += cashFlow;
        }
    }

    return '$ ' + totalCashFlow;
  }

  const calculateTotalExpenses = () =>
  {
    var totalExpenses = 0;
    for(let reservation of data)
    {
      if(new Date(reservation.reservationEndDate) >= new Date(startDate) && new Date(reservation.reservationEndDate) <= new Date(endDate))
      {
        var cashFlow = parseInt(reservation.cashFlow.slice(1));
        var profit = parseInt(reservation.profit.slice(1));
        var expenses = cashFlow - profit
        totalExpenses += expenses;
      }
    }

    return '$ ' + totalExpenses;
  }

  const calculateTotalProfit = () =>
  {
    var totalProfit = 0;
    for(let reservation of data)
    {
      if(new Date(reservation.reservationEndDate) >= new Date(startDate) && new Date(reservation.reservationEndDate) <= new Date(endDate))
      {
        var profit = parseInt(reservation.profit.slice(1));
        totalProfit += profit;
      }
    }

    return '$ ' + totalProfit;
  }

  const filterTable = () =>
  {
    var filteredList = [];
    for (let reservation of data)
    {
      if(new Date(reservation.reservationEndDate) >= new Date(startDate) && new Date(reservation.reservationEndDate) <= new Date(endDate))
      {
        reservation.profitPercentage = parseFloat(reservation.profitPercentage).toFixed(2);
        reservation.profitPercentage += '%';
        filteredList.push(reservation);
      }
    }
    return filteredList;
  }


  return (
    <div className="datatable">
        <div className="datatableTitle">
            <h2>Income From Reservations</h2>
            <NotificationProvider>
              <ChangeProfitPercentage/>
            </NotificationProvider>
                <div className="inputs">
                    <label>Start Date</label>
                    <DateBox 
                    defaultValue={startDate}
                    type="date"
                    onValueChanged={(e)=>{setStartDatePicked(true); setStartDate(e.value);}}
                    />
                </div>
                <div className="inputs">
                    <label>End Date</label>
                    <DateBox 
                    defaultValue={endDate}
                    type="date"
                    min={startDate}
                    max={Date.now()}
                    onValueChanged={(e)=>{setEndDatePicked(true); setEndDate(e.value);}}
                    />
            </div>
        </div>
        
      <DataGrid
        className="datagrid"
        rows={filterTable()}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row.id}
      />
      <div className="dashboard-financial-footer">
        <div>
          <h2>Total Cash Flow</h2>
          {<h1 style={{color: '#006400'}}><b>{calculateTotalFlow()}</b></h1>}
        </div>
        <div>
          <h2>Total Expenses</h2>
          <h1 style={{color: '#8B0000'}}><b>{calculateTotalExpenses()}</b></h1>
        </div>
        <div>
          <h2>Total Profit</h2>
          <h1 style={{color: '#DAA520'}}><b>{calculateTotalProfit()}</b></h1>
        </div>
      </div>
    </div>
  );
};

export default FinancialTable