export const reservationColumns = 
  [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "offerName",
      headerName: "Offer Name",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img || "https://img.favpng.com/5/18/7/log-cabin-ico-icon-png-favpng-68ATTkwWVbt7jKvV6mmTS9mCs.jpg"} alt="avatar" />
            {params.row.offerName}
          </div>
        );
      }
    },
    {
      field: "client",
      headerName: "Client",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="clientCellWithImg">
            <img className="cellImg" src={params.row.clientImg || "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"} alt="avatar" />
            {params.row.client}
          </div>
        );
      }
    },
    {
      field: "city",
      headerName: "City",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price [$]",
      width: 100,
    },
    {
      field: "capacity",
      headerName: "Attendants",
      width: 120,
    },
    {
      field: "period",
      headerName: "Period",
      width: 230,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    }
  ]
  

  export const reservationColumnsForClient = 
  [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "offerName",
      headerName: "Offer Name",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img || "https://img.favpng.com/5/18/7/log-cabin-ico-icon-png-favpng-68ATTkwWVbt7jKvV6mmTS9mCs.jpg"} alt="avatar" />
            {params.row.offerName}
          </div>
        );
      }
    },
    {
      field: "city",
      headerName: "City",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price [$]",
      width: 100,
    },
    {
      field: "capacity",
      headerName: "Attendants",
      width: 120,
    },
    {
      field: "period",
      headerName: "Period",
      width: 230,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    }
  ]
  

export const quickReservationCol = 
  [
    { field: "id", headerName: "ID", width: 40 },
   ,
   {
    field: "time",
    headerName: "Period",
    width: 230,
  },
    {
      field: "price",
      headerName: "Price [$]",
      width: 110,
    },
    {
      field: "addServ",
      headerName: "Additional services",
      width: 800,
    }

    
  ]
  