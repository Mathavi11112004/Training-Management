// import React, { Component } from 'react';
// import ZTable from '../../components/ZTable/ztable';
// import { Box } from '@mui/material';
// //import styles from '../../utils/constants/styles'
// // import { GetApi } from '../../utils/api/networking'
// // import { PostApi } from '../../utils/api/networking'
// // import { ApiUrl } from '../../utils/api/apiUrl'
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import withRouter from '../../navigation/withRouter';
// class ZTable extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             rows: [],
//             columns: [
//                 { field: "FullName", label: "Name" },
//                 { field: "DOB", label: "DOB" },
//                 { field: "Mobile", label: "Mobile" },
//                  { field: "Email", label: "Email" },
//                 { field: "Blood", label: "Blood" },
//                 { field: "EmergencyContact", label: "Emergency Contact" },
//                 { field: "Address", label: "Address" },
//                 { field: "Gender", label: "Gender" },
//                 { field: "Marital", label: "Marital" },
//                 { field: "Aadhar", label: "Aadhar No" },
//                 { field: "PAN", label: "PAN" },
//                 { field: "Passport", label: "Passport" },
//                 { field: "Designation", label: "Designation" },
//                 { field: "EmpCode", label: "Employee Code" },
//                 { field: "Joining", label: "Joining Date" },
//                 { field: "Department", label: "Department" },
//                 { field: "Reporting", label: "Reporting" },
//                 { field: "Location", label: "Location" },
//                 { field: "EmploymentType", label: "Employment Type" },
//                 { field: "WorkEmail", label: "Work Email" },
//                 { field: "Bank", label: "Bank" },
//                 { field: "AccountNo", label: "Account No" },
//                 { field: "IFSC", label: "IFSC Code" },
//                 { field: "PF", label: "PF UAN" },
//                 { field: "SalaryStructure", label: "Salary Structure" },
//                 { field: "EISC", label: "EISC" },
//                 { field: "Document", label: "Document" },
//                 { field: "Experience", label: "Work Experience" },
//                 { field: "Education", label: "Education" },
//                 { field: "Skill", label: "Skill" }
//             ]
//         }
//     }
//     componentDidMount() {
//         this.getUserData();

//     }
//     getUserData = async () => {
//         try {
//             const result = await GetApi(ApiUrl.getUser);

//             if (result.status === "S") {
//                 this.setState({
//                     rows: result.data || []
//                 });
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     }
//     handleAdd = () => {
       
//         const { name, email, address, mobile, dob, rows } = this.state;

//         if (!name.value || !email.value || !address.value || !mobile.value || !dob.value) {
//             alert("Please fill all fields");
//             return;
//         }
//         if (name.error || email.error || address.error || mobile.error) {
//             alert("Please fix the errors before adding");
//             return;
//         }
//         const dobFormatted = dob.value ? new Date(dob.value).toLocaleDateString() : "";
//         const newRow = {
//             name: name.value,
//             email: email.value,
//             address: address.value,
//             mobile: mobile.value,
//             dob: dobFormatted,
//         };

//         this.setState({
//             rows: [...rows, newRow],
//             name: { value: "", error: "" },
//             email: { value: "", error: "" },
//             address: { value: "", error: "" },
//             mobile: { value: "", error: "" },
//             dob: { value: null, error: "" },
//         });
//     };

//     handleEdit = (row) => {
//         // window.scroll({
//         //     top: 0,
//         //     behavior: 'smooth'
//         // })
//         this.setState({
//             ID: row.ID,
//             name: { value: row.FullName, error: '' },
//             dob: { value: row.DOB, error: '' },

//             mobile: { value: row.Mobile, error: '' },
//             email: { value: row.Email, error: '' },
//             blood: { value: row.Blood, error: '' },
//             designation: { value: row.Designation, error: '' },
//             emergency: { value: row.EmergencyContact, error: '' },
//             address: { value: row.Address, error: '' },
//             gender: { value: row.Gender, error: '' },
//             empCode: { value: row.EmployeeCode, error: '' },
//             pincode: { value: row.Pincode, error: '' },
//             degree: { value: row.Degree, error: '' },
//             college: { value: row.College, error: '' },
//             graduation: { value: row.Graduation, error: '' },
//             isActive: row.IsActive
//         })
//     }
//     handleDelete = (row) => {
//         this.setState({
//             rows: this.state.rows.filter((r) => r !== row),
//         });
//     };
//     render() {
//         return (
//             <Box >
//                 <ZTable
//                     title="Personal Details List"
//                     rows={this.state.rows}
//                     columns={this.state.columns}
//                     onAdd={this.handleAdd}
//                     onEdit={this.handleEdit}
//                     onDelete={this.handleDelete}
//                     navigate={this.props.navigate}
//                     addNewRoute="/PersonalDetails"
//                 // onActivate={handleActive}
//                 />
//                 <ToastContainer
//                     position="bottom-right"
//                     autoClose={3000}
//                     closeOnClick
//                     theme="colored"
//                 // size = "small"
//                 />
//             </Box>
//         )
//     }
// }
// export default withRouter(Table);