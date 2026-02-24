import color from "./color";
const style = {
  textboxborder: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "20px",
      "& fieldset": {
        borderColor: color.tertiary,
      },
      "&:hover fieldset": {
        borderColor: color.textPrimary,
      },
      "&.Mui-focused fieldset": {
        borderColor: "grey !important",
      },
      "& .MuiInputBase-root": { height: "48px" },
      bgcolor: color.tertiary,
    },
    "& .MuiFormHelperText-root.Mui-error": {
      color: "red",
    },
  },
  //Table
  ticketcontainer: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "25px",
    boxShadow: "0px 6px 25px rgba(0,0,0,0.06)",
    fontFamily: "Inter, sans-serif",
    width: "100%",
  },

  /* ==== HEADER BAR ==== */
  tableheaderBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  tableleftSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  tableselect: {
    padding: "10px 12px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "14px",
  },

  filterBtn: {
    padding: "9px 16px",
    background: "#f3f4f6",
    borderRadius: "12px",
    cursor: "pointer",
    border: "1px solid #e5e7eb",
  },

  exportBtn: {
    padding: "9px 16px",
    background: "#fff",
    borderRadius: "12px",
    cursor: "pointer",
    border: "1px solid #e5e7eb",
  },

  addBtn: {
    padding: "10px 20px",
    background: "#2563eb",
    color: "white",
    borderRadius: "12px",
    cursor: "pointer",
    border: "none",
    fontSize: "14px",
    fontWeight: "500",
  },

  /* ==== TABLE ==== */
  tableContainer: {
    borderRadius: "18px",
    overflowX: "auto",
    overflowY: "hidden",
    whiteSpace: "nowrap",
  },

  th: {
    fontWeight: "600",
    background: "#f3f4f6",
    fontSize: "14px",
    padding: "15px",
  },

  td: {
    padding: "18px 15px",
    fontSize: "14px",
  },

  productCell: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  productImg: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    objectFit: "cover",
  },

  statusBadge: {
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
    display: "inline-block",
    textTransform: "capitalize",
  },

  /* ==== PAGINATION ==== */
  paginationBar: {
    marginTop: "25px",
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
  },

  pageNum: {
    padding: "10px 16px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    cursor: "pointer",
    fontSize: "14px",
  },
  tablecell: {
    fontWeight: 600,
    fontSize: "14px",
    borderBottom: "1px solid #e5e7eb",
    color: "#374151",
  },
  tableBody: {
    "&:hover": {
      backgroundColor: "#f3f4f6",
      cursor: "pointer",
    },
  },

  tblBodyCell: {
    fontSize: "13px",
    padding: "12px 16px",
    borderBottom: "1px solid #e5e7eb",
    color: "#111827",
  },

  statusBadge: {
    fontWeight: "bold",
    borderRadius: "15px",
    minWidth: "80px",
    border: "none",
  },

  tableChip: {
    fontSize: "12px",
    borderRadius: "15px",
    padding: "2px 6px",
    fontWeight: 500,
    fontWeight: 500,
    minWidth: 80,
    textAlign: "center",
    justifyContent: "center",
  },

  actionIcon: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },

  editIcon: {
    fontSize: 30,
    padding: "6px",
    borderRadius: "50%",
    background: "#EFF6FF",
    color: "#1D4ED8",
    cursor: "pointer",
    transition: "0.2s",
    "&:hover": {
      background: "#DBEAFE",
      transform: "scale(1.1)",
    },
  },

  deleteIcon: {
    fontSize: 30,
    padding: "6px",
    borderRadius: "50%",
    background: "#FEF2F2",
    color: "#B91C1C",
    cursor: "pointer",
    transition: "0.2s",
    "&:hover": {
      background: "#FEE2E2",
      transform: "scale(1.1)",
    },
  },

  paginationBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "16px",
    gap: 2,
    // position: "sticky",
    // bottom: 0,
    // background: "#fff",
    // padding: "10px 0",
    // zIndex: 10,
  },

  tablepageNum: {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
    flexGrow: 1
  },

  tableScreenshot: {
    width: 60,
    height: 60,
    objectFit: "cover",
    borderRadius: 4,
    cursor: "pointer",
    border: "1px solid #ccc",
  },

  // tableImgPopup: {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   bgcolor: "white",
  //   boxShadow: 24,
  //   p: 2,
  //   borderRadius: 2,
  // },
  tableImgPopup: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "500px",
    maxHeight: "80vh",
    overflowY: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    cursor: "pointer",
    fontSize: 28,
    color: "#333",
    "&:hover": { color: "#000" },
    background: "#fff"
  },

  tableImg: {
    maxWidth: "80vw",
    maxHeight: "80vh",
    display: "block",
    margin: "auto",
  },

  //Ticket Form
  ticketImg: {
    width: "70px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },

  screenshotclose: {
    position: "relative",
    width: 80,
    height: 80
  },

  screenshotImg: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    objectFit: "cover",
    border: "1px solid #ccc"
  },

  screenshotImgIcon: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "#fff",
    boxShadow: 1,
  },

  screenshotCloseIcon: {
    display: "flex",
    gap: 2,
    flexWrap: "wrap"
  },

  totalRecords: {
    marginRight: "20px",
    display: "flex",
    alignItems: "center",
  },
  //table
  table: {
    minWidth: "100%"
  },

  tableRow: {
    backgroundColor: "#f9fafb"
  },
  activeIcon:
  {
    color: "#16a34a",
    cursor: "pointer",
    fontSize: 22,
    marginRight: "8px"
  },

  viewIcon: {
    cursor: "pointer",
    color: "#2563eb"
  },

  previewImages: {
    width: "100%",
    marginBottom: "20px",
    borderRadius: "10px"
  },
  filterModal: {
    background: "#fff",
    padding: "20px",
    width: "300px",
    borderRadius: "8px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  filterSelect: {
    width: "100%",
    padding: "8px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #d1d5db",
  },
  filterBtnRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  prevBtn: {
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "40px",
    color: "#fff",
    background: "rgba(0,0,0,0.4)",
    borderRadius: "50%",
    padding: "6px",
    cursor: "pointer",
  },

  nextBtn: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "40px",
    color: "#fff",
    background: "rgba(0,0,0,0.4)",
    borderRadius: "50%",
    padding: "6px",
    cursor: "pointer",
  },
  //header
  h1: {
    fontWeight: 700,
    fontSize: { xs: '20px', sm: '24px', md: '28px', lg: '32px' }
  },
  h2: {
    fontWeight: 500,
    fontSize: { xs: '16px', sm: '17px', md: '18px', lg: "20px" }
  },
  h3: {
    fontWeight: 400,
    fontSize: { xs: '12px', sm: '13px', md: '13px', lg: "14px" }
  },
  //button
  primaryButton: {
    borderRadius: "25px",
    textTransform: "none",
    // backgroundColor: color.primary,
    // '&:hover': {
    //   backgroundColor: color.secondary,
    //   opacity: 0.9,
    // },
    "&:disabled": {
      backgroundColor: color.grey,
      color: color.textTertiary,
    },
  },
  //Dashboard
  card: {
    background: "#413f3f",
    padding: "20px",
    margin: "20px 0",
    borderRadius: 25,
    boxShadow: "0 2px 8px rgba(61, 58, 58, 0.05)"
  },

  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px"
  },

  input: {
    flex: 1,
    padding: "8px"
  },

  button: {
    padding: "8px 14px",
    cursor: "pointer"
  },

  error: {
    color: "red",
    fontSize: "14px"
  },

  empty: {
    color: "gray"
  },

  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0"
  },

  deleteBtn: {
    background: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer"
  },
  card: {
    background: "#ffffff",
    padding: "24px",
    margin: "20px 0",
    borderRadius: "10px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.06)"
  },

  title: {
    marginBottom: "16px",
    fontSize: "20px",
    fontWeight: "600"
  },

  formColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },

  input: {
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #dcdcdc",
    fontSize: "14px"
  },

  checkboxGroup: {
    background: "#f9fafb",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #eee"
  },

  checkboxItem: {
    display: "block",
    marginBottom: "6px",
    fontSize: "14px",
    cursor: "pointer"
  },

  button: {
    padding: "10px",
    background: "#4a90e2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  buttonDisabled: {
    padding: "10px",
    background: "#ccc",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "not-allowed"
  },

  error: {
    color: "#d9534f",
    fontSize: "13px",
    marginTop: "6px"
  },

  empty: {
    color: "#888",
    fontSize: "14px"
  },

  list: {
    marginTop: "20px"
  },

  listItemColumn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "12px 0",
    borderBottom: "1px solid #f0f0f0"
  },

  subjectTags: {
    marginTop: "6px"
  },

  tag: {
    display: "inline-block",
    background: "#e7f1ff",
    color: "#1c6ed5",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    margin: "3px"
  },

  deleteBtn: {
    background: "#ff4d4f",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer"
  },

  userBox: {
    borderRadius: '20px',
    boxShadow: '0px 0px 10px rgba(1, 5, 12, 0.8)',
    margin: 'auto',
    mt: 4,
    width: '50%',
    // height: '80%',
    padding: 2,
    bgcolor: 'white',
    color: color.textPrimary,

  },
  reqerror: {
    marginTop: "1rem",
    color: 'red'
  },
  checkBox: {
    alignItems: "center",
    gap: "0.3rem"
  },
  minimum: {
    alignItems: 'center'
  },
  delete: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10
  },
   buttonIcon: (active) => ({
    color: active ? color.white : color.grey,
    backgroundColor: active ? color.primary : "transparent",
    borderRadius: "10px",
    transition: "0.2s",
    "&:hover": {
      opacity: 0.8
    }
  })
};
export default style;