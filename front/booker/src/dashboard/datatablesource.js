export const columnsData = 
  { 'ROLE_COTTAGE_OWNER': 
    [
      { field: "id", headerName: "ID", width: 100 },
      {
        field: "name",
        headerName: "Name",
        width: 250,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img className="cellImg" src={params.row.img || "https://img.favpng.com/5/18/7/log-cabin-ico-icon-png-favpng-68ATTkwWVbt7jKvV6mmTS9mCs.jpg"} alt="avatar" />
              {params.row.name}
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
        field: "rating",
        headerName: "Rating",
        width: 100,
      },
      {
        field: "price",
        headerName: "Price [$]",
        width: 100,
      },
      {
        field: "capacity",
        headerName: "Max People",
        width: 120,
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
    ],
    'ROLE_BOAT_OWNER':
    [
      { field: "id", headerName: "ID", width: 100 },
      {
        field: "name",
        headerName: "Name",
        width: 250,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img className="cellImg" src={params.row.img || "https://thumbs.dreamstime.com/b/boat-icon-vector-travel-concept-thin-line-illustration-editable-stroke-linear-sign-use-web-mobile-apps-logo-192170108.jpg"} alt="avatar" />
              {params.row.name}
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
        field: "rating",
        headerName: "Rating",
        width: 100,
      },
      {
        field: "price",
        headerName: "Price [$]",
        width: 100,
      },
      {
        field: "capacity",
        headerName: "Max People",
        width: 120,
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
    ],
    'ROLE_ADMIN':
    [
      { field: "id", 
      headerName: "ID", 
      width: 60 },
      {
        field: "icon",
        headerName: "Icon",
        width: 60,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img className="cellImg" src={params.row.img || "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"} alt="avatar" />

              {params.row.name}
            </div>
          );
        }
      },
      {
        field: "type",
        headerName: "User Type",
        width: 150,
      },
      {
        field: "email",
        headerName: "Email",
        width: 220,
      },
      {
        field: "firstName",
        headerName: "First Name",
        width: 100,
      },
      {
        field: "lastName",
        headerName: "Last Name",
        width: 100,
      },
      {
        field: "country",
        headerName: "Country",
        width: 100,
      },
      {
        field: "city",
        headerName: "City",
        width: 100,
      },
      {
        field: "street",
        headerName: "Street",
        width: 150,
      },
      {
        field: "phoneNumber",
        headerName: "Phone Number",
        width: 120,
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
    ],
    'ROLE_SUPER_ADMIN':
    [
      { field: "id", 
      headerName: "ID", 
      width: 60 },
      {
        field: "icon",
        headerName: "Icon",
        width: 60,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img className="cellImg" src={params.row.img || "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"} alt="avatar" />

              {params.row.name}
            </div>
          );
        }
      },
      {
        field: "type",
        headerName: "User Type",
        width: 150,
      },
      {
        field: "email",
        headerName: "Email",
        width: 220,
      },
      {
        field: "firstName",
        headerName: "First Name",
        width: 100,
      },
      {
        field: "lastName",
        headerName: "Last Name",
        width: 100,
      },
      {
        field: "country",
        headerName: "Country",
        width: 100,
      },
      {
        field: "city",
        headerName: "City",
        width: 100,
      },
      {
        field: "street",
        headerName: "Street",
        width: 150,
      },
      {
        field: "phoneNumber",
        headerName: "Phone Number",
        width: 120,
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
    ],
    'ROLE_INSTRUCTOR':
    [
      { field: "id", headerName: "ID", width: 100 },
      {
        field: "name",
        headerName: "Name",
        width: 250,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img className="cellImg" src={params.row.img || "https://cdn-icons-png.flaticon.com/512/71/71543.png"} alt="avatar" />
              {params.row.name}
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
        field: "rating",
        headerName: "Rating",
        width: 100,
      },
      {
        field: "price",
        headerName: "Price [$]",
        width: 100,
      },
      {
        field: "capacity",
        headerName: "Max People",
        width: 120,
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
    ],
    'ROLE_CLIENT':
    [
      { field: "id", headerName: "ID", width: 100 },
      {
        field: "name",
        headerName: "Name",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img className="cellImg" src={params.row.img || "https://thumbs.dreamstime.com/b/boat-icon-vector-travel-concept-thin-line-illustration-editable-stroke-linear-sign-use-web-mobile-apps-logo-192170108.jpg"} alt="avatar" />
              {params.row.name}
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
        field: "rating",
        headerName: "Rating",
        width: 100,
      },
      {
        field: "price",
        headerName: "Price [$]",
        width: 100,
      }
    ],
    'ROLE_ADMIN/COMPLAINTS':
    [
      {
        field: "id",
        headerName: "Complaint ID",
        width: 150,
      },
      {
        field: "clientEmail",
        headerName: "Client's Email",
        width: 220,
      },
      { field: "offerId", 
      headerName: "Offer ID", 
      width: 100 
      },
      {
        field: "icon",
        headerName: "Icon",
        width: 60,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img className="cellImg" src={params.row.img || "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"} alt="avatar" />

              {params.row.name}
            </div>
          );
        }
      },
      {
        field: "offerName",
        headerName: "Offer Name",
        width: 150,
      },
      {
        field: "providerEmail",
        headerName: "Provder's Email",
        width: 220,
      }
    ],
    'ROLE_SUPER_ADMIN/COMPLAINTS':
    [
      {
        field: "id",
        headerName: "Complaint ID",
        width: 150,
      },
      {
        field: "clientEmail",
        headerName: "Client's Email",
        width: 220,
      },
      { field: "offerId", 
      headerName: "Offer ID", 
      width: 100 
      },
      {
        field: "icon",
        headerName: "Icon",
        width: 60,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img className="cellImg" src={params.row.img || "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"} alt="avatar" />

              {params.row.name}
            </div>
          );
        }
      },
      {
        field: "offerName",
        headerName: "Offer Name",
        width: 150,
      },
      {
        field: "providerEmail",
        headerName: "Provder's Email",
        width: 220,
      }
    ],
    'ROLE_ADMIN/PENALTIES':
    [
      {
        field: "id",
        headerName: "Request ID",
        width: 85,
      },
      {
        field: "clientId",
        headerName: "Client's ID",
        width: 85,
      },
      {
        field: "clientEmail",
        headerName: "Client's Email",
        width: 220,
      },
      {
        field: "clientName",
        headerName: "Client's First Name",
        width: 150,
      },
      {
        field: "clientLastName",
        headerName: "Client's Last Name",
        width: 150,
      },
      {
        field: "providerId",
        headerName: "Provider's ID",
        width: 100,
      },
      {
        field: "providerEmail",
        headerName: "Provider's Email",
        width: 220,
      },
      {
        field: "icon",
        headerName: "Icon",
        width: 60,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img className="cellImg" src={params.row.img || "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"} alt="avatar" />

              {params.row.name}
            </div>
          );
        }
      },
      {
        field: "offerName",
        headerName: "Offer Name",
        width: 150,
      }
    ],
    'ROLE_SUPER_ADMIN/PENALTIES':
    [
      {
        field: "id",
        headerName: "Request ID",
        width: 85,
      },
      {
        field: "clientId",
        headerName: "Client's ID",
        width: 85,
      },
      {
        field: "clientEmail",
        headerName: "Client's Email",
        width: 220,
      },
      {
        field: "clientName",
        headerName: "Client's First Name",
        width: 150,
      },
      {
        field: "clientLastName",
        headerName: "Client's Last Name",
        width: 150,
      },
      {
        field: "providerId",
        headerName: "Provider's ID",
        width: 100,
      },
      {
        field: "providerEmail",
        headerName: "Provider's Email",
        width: 220,
      },
      {
        field: "icon",
        headerName: "Icon",
        width: 60,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img className="cellImg" src={params.row.img || "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"} alt="avatar" />

              {params.row.name}
            </div>
          );
        }
      },
      {
        field: "offerName",
        headerName: "Offer Name",
        width: 150,
      }
    ],
    'ROLE_ADMIN/FINANCIAL':
    [
      {
        field: "id",
        headerName: "ID",
        width: 60,
      },
      {
        field: "icon",
        headerName: "Icon",
        width: 60,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img className="cellImg" src={params.row.img || "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"} alt="avatar" />

              {params.row.name}
            </div>
          );
        }
      },
      {
        field: "offerName",
        headerName: "Offer Name",
        width: 150,
      },
      {
        field: "reservationEndDate",
        headerName: "End Date",
        width: 120,
      },
      {
        field: "numOfAdditionalServices",
        headerName: "Number Of Additional Services",
        width: 220,
      },
      {
        field: "basePrice",
        headerName: "Base Price",
        width: 150,
      },
      {
        field: "additionalServicesPrice",
        headerName: "Additional Services Price",
        width: 200,
      },
      {
        field: "cashFlow",
        headerName: "Cash Flow",
        width: 100,
      },
      {
        field: "profitPercentage",
        headerName: "Profit Percentage",
        width: 170,
      },
      {
        field: "profit",
        headerName: "Profit",
        width: 120,
      },
    ],
    'ROLE_SUPER_ADMIN/FINANCIAL':
    [
      {
        field: "id",
        headerName: "ID",
        width: 60,
      },
      {
        field: "icon",
        headerName: "Icon",
        width: 60,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img className="cellImg" src={params.row.img || "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"} alt="avatar" />

              {params.row.name}
            </div>
          );
        }
      },
      {
        field: "offerName",
        headerName: "Offer Name",
        width: 150,
      },
      {
        field: "reservationEndDate",
        headerName: "End Date",
        width: 120,
      },
      {
        field: "numOfAdditionalServices",
        headerName: "Number Of Additional Services",
        width: 220,
      },
      {
        field: "basePrice",
        headerName: "Base Price",
        width: 150,
      },
      {
        field: "additionalServicesPrice",
        headerName: "Additional Services Price",
        width: 200,
      },
      {
        field: "cashFlow",
        headerName: "Cash Flow",
        width: 100,
      },
      {
        field: "profitPercentage",
        headerName: "Profit Percentage",
        width: 170,
      },
      {
        field: "profit",
        headerName: "Profit",
        width: 120,
      },
    ],
    'ROLE_ADMIN/RATING_REQUESTS':
    [
      {
        field: "id",
        headerName: "Request ID",
        width: 150,
      },
      {
        field: "clientEmail",
        headerName: "Client's Email",
        width: 220,
      },
      { field: "offerId", 
      headerName: "Offer ID", 
      width: 100 
      },
      {
        field: "icon",
        headerName: "Icon",
        width: 60,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img className="cellImg" src={params.row.img || "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"} alt="avatar" />

              {params.row.name}
            </div>
          );
        }
      },
      {
        field: "offerName",
        headerName: "Offer Name",
        width: 150,
      },
      {
        field: "providerEmail",
        headerName: "Provder's Email",
        width: 220,
      }
    ],
    'ROLE_SUPER_ADMIN/RATING_REQUESTS':
    [
      {
        field: "id",
        headerName: "Request ID",
        width: 150,
      },
      {
        field: "clientEmail",
        headerName: "Client's Email",
        width: 220,
      },
      { field: "offerId", 
      headerName: "Offer ID", 
      width: 100 
      },
      {
        field: "icon",
        headerName: "Icon",
        width: 60,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img className="cellImg" src={params.row.img || "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"} alt="avatar" />

              {params.row.name}
            </div>
          );
        }
      },
      {
        field: "offerName",
        headerName: "Offer Name",
        width: 150,
      },
      {
        field: "providerEmail",
        headerName: "Provder's Email",
        width: 220,
      }
    ],
};