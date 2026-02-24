import { MoreVert } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import IosShareIcon from "@mui/icons-material/IosShare";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Chip,
  Grid,
  Modal,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
 import color from "../../utils/Constant/color.jsx";
 import label from "../../utils/Constant/label.jsx";
import style from '../../utils/Constant/style'
import ZH1 from "../Zheader/zH1";
import ZIconButton from "../ZButton/zIconButton";
import ZPrimaryButton from "../ZButton/zPrimaryButton.jsx";
import ZDropdown from "../ZDropDown/zdropDown.jsx";
import ZButtonIcon from "../ZIcons/zbuttonIcon";
import ZMenuList from '../ZMenu/zmenuList.jsx'
import ZTooltip from "../ZToolTip/ztoolTip.jsx";
import ZDatePicker from '../../Component/ZDatePicker/zDatePicker.jsx'
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
export default function ZTable({
  columns = [],
  rows = [],
  pageSize = 10,
  title = "",
  navigate,
  addNewRoute = "",
  onEdit,
  onDelete,
  onActivate,
  actionType,
  actionOptions = [],
  onAdd = 'true',
  onPage = 'true',
  assignTo = [],
  onAssignMenuClick,
  onAssignClick,
  searchText = "",
  onFilterChange
}) {
  const [page, setPage] = useState(1);
  const [filteredRows, setFilteredRows] = useState(rows);
  const [pageSizeState, setPageSizeState] = useState(pageSize);
  const [openImage, setOpenImage] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [search, setSearch] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const [selected, setSelected] = useState({
    employee: "",
    severity: "",
    branch: "",
    issueCategory: "",
    date: null,
    isActive: ""
  });

  const [ticketsOriginal, setTicketsOriginal] = useState([]);
  const unique = (field) => [...new Set(rows.map(r => r[field]))];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenFilter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  // Update selected filters
  const handleChange = (name, value) => {
    setSelected((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const isBase64Image = (val) => {
    if (!val) return false;
    if (Array.isArray(val))
      return (
        val.length > 0 &&
        typeof val[0] === "string" &&
        val[0].startsWith("data:image")
      );
    if (typeof val !== "string") return false;
    return (
      val.startsWith("data:image") ||
      (val.length > 100 && /^[A-Za-z0-9+/]+={0,2}$/.test(val))
    );
  };

  const handleImageClick = (images) => {
    const arr = Array.isArray(images) ? images : [images];
    setPreviewImages(arr);
    setCurrentIndex(0);
    setOpenImage(true);
  };

  const currentImg = previewImages && previewImages.length > 0 ? previewImages[currentIndex] || "" : "";
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % previewImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? previewImages.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (!Array.isArray(rows)) return;
    let f = [...rows];

    // Search filter
    f = f.filter((r) =>
      Object.values(r).some((x) =>
        String(x).toLowerCase().includes(searchText.toLowerCase())
      )
    );

    // Employee filter
    if (selected.employee) {
      f = f.filter(r => r.EmployeeName === selected.employee);
    }

    // Severity filter
    if (selected.severity) {
      f = f.filter(r => r.Severity === selected.severity);
    }

    // Branch filter
    if (selected.branch) {
      f = f.filter(r => r.Branch === selected.branch);
    }

    // Issue Category filter
    if (selected.issueCategory) {
      f = f.filter(r =>
        r.IssueCategory?.toLowerCase().includes(selected.issueCategory.toLowerCase())
      );
    }

    // Date filter
    if (selected.date) {
      const selectedDate = dayjs(selected.date).format("YYYY-MM-DD");

      f = f.filter(r => {
        const rowDate = dayjs(r.Date).format("YYYY-MM-DD");
        return rowDate === selectedDate;
      });
    }
    // Active/Inactive filter
    if (selected.isActive !== "") {
      f = f.filter(r => String(r.IsActive) === selected.isActive);
    }

    setFilteredRows(f);
    setPage(1);
  }, [searchText, selected, rows]);

  // Dynamic dropdown lists
  const employeeList = [...new Set(rows.map(r => r.EmployeeName))].map(name => ({
    value: name,
    label: name
  }));

  const branchList = [...new Set(rows.map(r => r.Branch))].map(b => ({
    value: b,
    label: b
  }));

  const categoryList = [...new Set(rows.map(r => r.IssueCategory))].map(c => ({
    value: c,
    label: c
  }));

  const severityList = [...new Set(rows.map(r => r.Severity))].map(d => ({
    value: d,
    label: d
  }));

  const status = [...new Set(rows.map(r => r.IsActive))].map(e => ({
    value: e,
    label: e
  }));

  const clearFilters = () => {
    setSelected({
      employee: "",
      severity: "",
      branch: "",
      issueCategory: "",
      date: null,
      isActive: ""
    });
  };

  // SAFE totalPages
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSizeState));
  const exportToCSV = () => {
    if (!filteredRows || filteredRows.length === 0) {
      alert("No data to export");
      return;
    }
    const replacer = (_, value) => {
      // Replace base64 images with placeholder
      if (typeof value === "string" && value.startsWith("data:image"))
        return "[Image]";
      return value === null ? "" : value;
    };
    // Filter out the action column
    const exportColumns = columns.filter((col) => col.field !== "action");
    const header = exportColumns.map((col) => col.label);
    const fields = exportColumns.map((col) => col.field);
    const csvRows = [
      header.join(","), // header row
      ...filteredRows.map((row) =>
        fields
          .map((field) =>
            JSON.stringify(row[field], replacer).replace(/(^"|"$)/g, "")
          )
          .join(",")
      ),
    ];
    const csvData = csvRows.join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title || "Export"}.csv`;
    link.click();
  };
  // SAFE slice
  const start = (page - 1) * pageSizeState;
  const paginated = filteredRows.slice(start, start + pageSizeState);
  return (
    <div style={{
      ...style.ticketcontainer,
      padding: onAdd === false && onPage === false ? '0px' : '25px'
    }}>
      {/* HEADER BAR */}
      {onAdd && (
        <div style={style.tableheaderBar}>
          <div style={style.tableleftSection}>
            <ZH1 text={title} />
          </div>

          <div style={style.tableleftSection}>
            <Typography variant="subtitle">Showing</Typography>
            <select
              style={style.tableselect}
              value={pageSizeState}
              onChange={(e) => {
                setPageSizeState(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
            <ZIconButton
              style={style.filterBtn}
              label={label.filter}
              startIcon={<FilterAltTwoToneIcon />}
              onClick={(e) => handleOpenFilter(e)}
            />
            <ZIconButton
              style={style.filterBtn}
              label={label.export}
              startIcon={<IosShareIcon />}
              onClick={exportToCSV}
            />
            <ZPrimaryButton
              style={style.addBtn}
              label={label.addNew}
              onClick={() => addNewRoute && navigate(addNewRoute)}
            />
          </div>
        </div>
      )}
      {/* TABLE */}
      <TableContainer component={Paper} style={style.tableContainer}>
        <Table sx={{ minWidth: "100%" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f9fafb" }}>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  style={style.th}
                  sx={style.tablecell}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((row, index) => (
              <TableRow key={index} sx={style.tableBody}>
                {columns.map((col) => (
                  <TableCell
                    key={col.field}
                    style={style.td}
                    sx={style.tblBodyCell}
                  >
                    {col.field === "IsActive" ? (
                      <Chip
                        label={row.IsActive ? "Active" : "Inactive"}
                        size="small"
                        sx={{
                          ...style.tableChip,
                          backgroundColor: row.IsActive ? color.low : color.notStarted,
                          color: row.IsActive ? color.txtlow : color.txtNotStarted,
                        }}
                      />
                    ) : col.badgeColors ? (
                      <Chip
                        label={row[col.field] ?? "-"}
                        size="small"
                        sx={{
                          ...style.tableChip,
                          backgroundColor: col.badgeColors[row[col.field]] || "#E5E7EB",
                          color: col.badgeTextColors?.[row[col.field]] || "#111",
                        }}
                      />
                    ) : col.field === "action" ? (
                      <>
                        <ZMenuList
                          trigger={
                            <ZButtonIcon
                              title={"More Options"}
                              icon={<MoreVert sx={{ cursor: "pointer" }} />}
                            />
                          }
                          row={row}
                          options={actionOptions.flatMap((opt) => {
                            if (opt.value === "assign-menu") {
                              return [
                                {
                                  label: "Assign To",
                                  onClick: () => {
                                    onAssignClick &&
                                      onAssignClick(row.AssetManageId);
                                  },
                                  children:
                                    Array.isArray(assignTo) &&
                                      assignTo.length > 0
                                      ? assignTo.map((person) => ({
                                        label: person.AssignTo,
                                        onClick: () => {
                                          onAssignMenuClick &&
                                            onAssignMenuClick(person);
                                        },
                                      }))
                                      : [
                                        {
                                          label: "No menu's available",
                                          onClick: () => { },
                                        },
                                      ],
                                },
                              ];
                            }
                            return {
                              label: opt.label,
                              onClick: () => opt.onClick && opt.onClick(row),
                            };
                          })}
                        />
                      </>
                    ) : col.field === "Action" ? (
                      <div style={style.actionIcon}>
                        {row.IsActive ? (
                          <>
                            {/* SHOW EDIT & DELETE ONLY IF ACTIVE */}
                            <ZTooltip title={label.editTicket} placement="bottom">
                              <CreateIcon
                                sx={style.editIcon}
                                onClick={() => onEdit(row.ID)}
                              />
                            </ZTooltip>
                            <ZTooltip title={label.inactiveTicket} placement="bottom">
                              <DeleteIcon
                                sx={style.deleteIcon}
                                onClick={() => onDelete(row.ID)}
                              />
                            </ZTooltip>
                          </>
                        ) : (
                          <>
                            {/* SHOW ACTIVATE ICON FOR INACTIVE */}
                            <ZTooltip title={label.activeTicket} placement="bottom">
                              <CheckCircleOutlineIcon
                                sx={style.activeIcon}
                                onClick={() => onActivate(row.ID)}
                              />
                            </ZTooltip>
                          </>
                        )}
                      </div>

                    ) : isBase64Image(row[col.field]) ? (
                      <ZTooltip title="Preview" placement="bottom">
                        <VisibilityIcon
                          sx={style.viewIcon}
                          onClick={() => handleImageClick(row[col.field])}
                        />
                      </ZTooltip>
                    ) : (
                      row[col.field] ?? "-"
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* PAGINATION */}
      {onPage && (
        <div style={style.paginationBtn}>
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            style={style.pageNum}
          >
            Previous
          </button>
          <div style={style.tablepageNum}>
            {[...Array(totalPages)].map((_, i) => (
              <span
                key={i}
                onClick={() => setPage(i + 1)}
                style={{
                  ...style.pageNum,
                  background: page === i + 1 ? "#2563eb" : "#fff",
                  color: page === i + 1 ? "#fff" : "#111",
                  border: page === i + 1
                    ? "1px solid #2563eb"
                    : "1px solid #d1d5db",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            ))}
          </div>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            style={style.pageNum}
          >
            Next
          </button>
        </div>
      )}
      {/* IMAGE MODAL */}
      <Modal open={openImage} onClose={() => setOpenImage(false)}>
        <Box sx={style.tableImgPopup}>
          <CloseIcon onClick={() => setOpenImage(false)} sx={style.closeIcon} />

          {/* SHOW < > ONLY IF MORE THAN 1 IMAGE */}
          {previewImages.length > 1 && (
            <>
              <ChevronLeftIcon
                sx={style.prevBtn}
                onClick={handlePrev}
              />
              <ChevronRightIcon
                sx={style.nextBtn}
                onClick={handleNext}
              />
            </>
          )}

          <img
            src={
              currentImg
                ? (currentImg.startsWith("data:image")
                  ? currentImg
                  : `data:image/png;base64,${currentImg}`)
                : ""
            }
            style={style.previewImages}
          />

        </Box>
      </Modal>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseFilter}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2, width: 300 }}>
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
              {/* Employee */}
              {/* <Typography variant="subtitle">{label.tname}</Typography> */}
              <ZDropdown
                fullWidth
                options={employeeList}
                value={selected.employee}
                label={label.tname}
                onChange={(e) => handleChange("employee", e.target.value)}
              />

            </Grid>
            {/* Severity */}
            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
              <ZDropdown
                label={label.severity}
                value={selected.severity}
                onChange={(e) => handleChange("severity", e.target.value)}
                options={severityList}
              />
            </Grid>
            {/* Branch */}
            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
              <ZDropdown
                label={label.branch}
                value={selected.branch}
                onChange={(e) => handleChange("branch", e.target.value)}
                options={branchList}
              />
            </Grid>
            {/* Issue Category */}
            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
              <ZDropdown
                label={label.request}
                value={selected.issueCategory}
                onChange={(e) => handleChange("issueCategory", e.target.value)}
                options={categoryList}
              />
            </Grid>
            {/* Date */}
            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
              <ZDatePicker
                label={label.date}
                value={selected.date}
                onChange={(value) => handleChange("date", value)}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container sx={style.ticketGrid3} spacing={1}>
            <Grid>
              <ZPrimaryButton
                label={label.clear}
                onClick={clearFilters}
              />
            </Grid>
            <Grid>
              <ZPrimaryButton
                label={label.close}
                onClick={handleCloseFilter}
              />
            </Grid>
          </Grid>
        </Box>
      </Popover>
    </div>
  );
}