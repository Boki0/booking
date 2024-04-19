export const cottageInputs = [
  {
    id:1,
    name:"cottageName",
    type:"text",
    placeholder:"Nova Cottage",
    errorMessage: "This field is required!",
    label:"Cottage Name",
    required: true,
  },
  {
    id:2,
    name:"country",
    type:"text",
    placeholder:"Serbia",
    errorMessage:"Invalid input!",
    label:"Country",
    required: true,
    pattern: `^.{1,}$`,
  },
  {
    id:3,
    name:"city",
    type:"text",
    placeholder:"Belgrade",
    errorMessage:"Invalid input!",
    label:"City",
    required: true,
    pattern: `^.{1,}$`
  },
  {
    id:4,
    name:"street",
    type:"text",
    placeholder:"Kraljevica Marka 12",
    errorMessage:"Invalid input!",
    label:"Street",
    required: true,
    pattern: `^.{1,}$`
  },
  {
    id:5,
    name:"numOfRooms",
    type:"number",
    placeholder:"3",
    errorMessage: "Invalid input!",
    label:"Number of Rooms",
    required: true,
    min: "0"
  },
  {
    id:6,
    name:"capacity",
    type:"number",
    placeholder:"10",
    errorMessage: "Invalid input!",
    label:"Max People",
    required: true,
    min: "0"
  },
  {
    id: 7,
    name:"price",
    type:"number",
    placeholder:"100",
    errorMessage:"Invalid input!",
    label:"Price per Night [$]",
    required: true,
    min: "0"
  },
  {
    id: 8,
    name:"fee",
    type:"number",
    placeholder:"50",
    errorMessage:"Invalid input!",
    label:"Cancellation Fee [$]",
    required: true,
    min: "0"
  },
  {
    id:9,
    name:"regulations",
    type:"text",
    placeholder:"No regulations...",
    errorMessage: "This field is required!",
    label:"Regulations",
    required: true,
    multiline: true,
    rows: 5,
  },
  {
    id:10,
    name:"description",
    type:"text",
    placeholder:"Description of cottage...",
    errorMessage: "This field is required!",
    label:"Description",
    required: true,
    multiline:true,
    rows: 5,
  }
];

export const lessonInputs = [
  {
    id:1,
    name:"lessonName",
    type:"text",
    placeholder:"New Lesson",
    errorMessage: "This field is required!",
    label:"Lesson name",
    required: true,
  },
  {
    id:2,
    name:"country",
    type:"text",
    placeholder:"Serbia",
    errorMessage:"Invalid input!",
    label:"Country",
    required: true,
    pattern: `^.{1,}$`,
  },
  {
    id:3,
    name:"city",
    type:"text",
    placeholder:"Belgrade",
    errorMessage:"Invalid input!",
    label:"City",
    required: true,
    pattern: `^.{1,}$`
  },
  {
    id:4,
    name:"street",
    type:"text",
    placeholder:"Ribnjak Donji put 44",
    errorMessage:"Invalid input!",
    label:"Street",
    required: true,
    pattern: `^.{1,}$`
  },
  {
    id:5,
    name:"capacity",
    type:"number",
    placeholder:"10",
    errorMessage: "Invalid input!",
    label:"Max People",
    required: true,
    min: "0"
  },
  {
    id: 6,
    name:"price",
    type:"number",
    placeholder:"100",
    errorMessage:"Invalid input!",
    label:"Price [$]",
    required: true,
    min: "0"
  },
  {
    id: 7,
    name:"fee",
    type:"number",
    placeholder:"50",
    errorMessage:"Invalid input!",
    label:"Cancellation Fee [$]",
    required: true,
    min: "0"
  },
  {
    id:8,
    name:"regulations",
    type:"text",
    placeholder:"No regulations...",
    errorMessage: "This field is required!",
    label:"Regulations",
    required: true,
    multiline: true,
    rows: 5,
  },
  {
    id:9,
    name:"description",
    type:"text",
    placeholder:"Description of lesson...",
    errorMessage: "This field is required!",
    label:"Description",
    required: true,
    multiline:true,
    rows: 5,
  }
];

export const boatInputs = [
  {
    id:1,
    name:"name",
    type:"text",
    placeholder:"Enter name of new boat",
    errorMessage: "This field is required!",
    label:"Boat Name",
    required: true,
  },
  {
    id:2,
    name:"country",
    type:"text",
    placeholder:"Montenegro",
    errorMessage:"Invalid input!",
    label:"Country",
    required: true,
    pattern: `^.{1,}$`,
  },
  {
    id:3,
    name:"city",
    type:"text",
    placeholder:"Herceg Novi",
    errorMessage:"Invalid input!",
    label:"City",
    required: true,
    pattern: `^.{1,}$`
  },
  {
    id:4,
    name:"street",
    type:"text",
    placeholder:"Kraljevica Marka 12",
    errorMessage:"Invalid input!",
    label:"Street",
    required: true,
    pattern: `^.{1,}$`
  },
  {
    id:5,
    name:"capacity",
    type:"number",
    placeholder:"10",
    errorMessage: "Invalid input!",
    label:"Max People",
    required: true,
    min: "0"
  },
  {
    id: 6,
    name:"price",
    type:"number",
    placeholder:"100",
    errorMessage:"Invalid input!",
    label:"Price per Night [$]",
    required: true,
    min: "0"
  },
  {
    id: 7,
    name:"fee",
    type:"number",
    placeholder:"50",
    errorMessage:"Invalid input!",
    label:"Cancellation Fee [$]",
    required: true,
    min: "0"
  },
  {
    id: 8,
    name:"length",
    type:"number",
    placeholder:"9",
    errorMessage:"Invalid input!",
    label:"Length of Boat [m]",
    required: true,
    min: "0"
  },
  {
    id: 9,
    name:"engineNum",
    type:"number",
    placeholder:"1",
    errorMessage:"Invalid input!",
    label:"Number of Engines",
    required: true,
    min: "0",
  },
  {
    id: 10,
    name:"enginePow",
    type:"number",
    placeholder:"100",
    errorMessage:"Invalid input!",
    label:"Engine Power [kW]",
    required: true,
    min: "0"
  },
  {
    id: 11,
    name:"maxSpeed",
    type:"number",
    placeholder:"15.7",
    errorMessage:"Invalid input!",
    label:"Max Speed [km/h]",
    required: true,
    min: "0"
  },
  {
    id: 12,
    name:"boatType",
    select: true,
    type: "select",
  },
  {
    id:13,
    name:"regulations",
    type:"text",
    placeholder:"No regulations...",
    errorMessage: "This field is required!",
    label:"Regulations",
    required: true,
    multiline: true,
    rows: 5,
  },
  {
    id:14,
    name:"description",
    type:"text",
    placeholder:"Description of cottage...",
    errorMessage: "This field is required!",
    label:"Description",
    required: true,
    multiline:true,
    rows: 5,
  }
];

export const boatTypes = [
  {
    id:1,
    type:"Flats Boat",
    value:"FLATS_BOAT"
  },
  {
    id:2,
    type:"Bay Boat",
    value:"BAY_BOAT"
  },
  {
    id:3,
    type:"Center Console Boat",
    value:"CENTER_CONSOLE_BOAT"
  },
  {
    id:4,
    type:"Catamaran",
    value:"CATAMARAN"
  },
  {
    id:5,
    type:"Kayak",
    value:"KAYAK"
  },
  {
    id:6,
    type:"Inflatable Boat",
    value:"INFLATABLE_BOAT"
  },
  {
    id:7,
    type:"Bass Boat",
    value:"BASS_BOAT"
  },
  {
    id:8,
    type:"Air Boat",
    value:"AIR_BOAT",
  },
  {
    id:9,
    type:"Pontoon Boat",
    value:"PONTOON_BOAT"
  },
  {
    id:10,
    type:"Cuddy Cabin Boat",
    value:"CUDDY_CABIN_BOAT"
  },
  {
    id:11,
    type:"Pilothouse Boat",
    value:"PILOTHOUSE_BOAT",
  },
  {
    id:12,
    type:"Flybridge Sportfishing Boat",
    value:"FLYBRIDGE_SPORTFISHING_BOAT"
  },
  {
    id:13,
    type:"Other",
    value:"OTHER"
  },
];