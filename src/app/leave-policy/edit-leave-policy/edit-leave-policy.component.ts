import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ServerService } from "src/app/server.service";
import swal from "sweetalert2";
import * as moment from "moment";
@Component({
  selector: "app-edit-leave-policy",
  templateUrl: "./edit-leave-policy.component.html",
  styleUrls: ["./edit-leave-policy.component.css"],
})
export class EditLeavePolicyComponent implements OnInit {
  lstTableData = [];

  lstLeaveType = [];

  leavePolicy: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public router: Router,
    private toastr: ToastrService,
    private serverService: ServerService
  ) {
    // this.dataSource = new MatTableDataSource(this.lstTableData);
  }
  LeavePolicyID = localStorage.getItem("leavePolicyID");

  ngOnInit(): void {
    this.leavePolicy = this.formBuilder.group({
      policyName: ["", Validators.required],
      applicableFrom: ["", Validators.required],
    });
    this.serverService
      .getData("api/DropDownBindingAPI/ddlleavetype/")
      .subscribe((res: any[]) => {
        this.lstLeaveType = res["leaveTypeList"];
        this.getEditData();
      });
  }
  getEditData() {
    this.serverService
      .getData(
        "api/LeavePolicyAPI/FindLeavePolicyById/?leavePolicyID=" +
          this.LeavePolicyID
      )
      .subscribe((res: any[]) => {
        console.log(res, "edit value");
        this.leavePolicy
          .get("policyName")
          .setValue(res["leavePolicyInfo"]["leavePolicyName"]);
        this.leavePolicy
          .get("applicableFrom")
          .setValue(res["leavePolicyInfo"]["applicableFromstr"]),
          res["leavePolicyDetail"].forEach((element) => {
            let dct = {};
            dct["leaveType"] = element.LeaveTypeID;
            dct["days"] = element.NoOfLeave;
            dct["carryForward"] = element.CarryForwardLeave;
            dct["encDays"] = element.EncashDays;
            dct["peroid"] = element.Period;
            dct["monthly"] = element.MonthLeave;

            let row = this.lstLeaveType.filter(
              (item) => item.leaveTypeId === element.LeaveTypeID
            );
            console.log(row, "row");

            dct["leaveTypeName"] = row[0]["leaveType"];
            this.lstTableData.push(dct);
          });
        console.log(this.lstTableData, "lstTableData");
      });
  }
  leaveTypeChanged(index, value) {
    this.lstTableData[index].leaveType = value.leaveTypeId;
  }

  addRow(index, leaveType) {
    let dctData = {
      leaveTypeName: "",
      leaveType: null,
      days: null,
      monthly: null,
      carryForward: null,
      encDays: null,
      peroid: null,
    };
    this.lstTableData.push(dctData);
  }
  deleteRow(index) {
    this.lstTableData.splice(index, 1);
  }
  saveDetail() {
    if (!this.leavePolicy.get("policyName").value) {
      this.toastr.error("Enter Policy Name", "Error!");
      return false;
    } else if (this.leavePolicy.get("applicableFrom").value === "") {
      this.toastr.error("Choose a applicable from date", "Error!");
      return false;
    } else {
      let HasError = false;
      this.lstTableData.forEach((element, index) => {
        let rowNo = index + 1;
        if (element.leaveType == null) {
          this.toastr.error("Choose a Leave type for row " + rowNo, "Error!");
          HasError = true;
          return false;
        } else if (element.days == null) {
          this.toastr.error("Enter a Days for row " + rowNo, "Error!");
          HasError = true;
          return false;
        } else if (element.monthly == null) {
          this.toastr.error("Enter a Mothly for row " + rowNo, "Error!");
          HasError = true;
          return false;
        }
      });
      let dctData = {
        Status: "sample string 1",
        leavePolicyInfo: {
          leavePolicyID: this.LeavePolicyID,
          leavePolicyName: this.leavePolicy.get("policyName").value,
          applicableFromstr: this.leavePolicy.get("applicableFrom").value,
          applicableFrom: moment(this.leavePolicy.get("applicableFrom").value)
            .format("DD/MM/YYYY")
            .toString(),
        },
        leavePolicyDetail: [],
        leavePolicyDetailInfo: {},
      };
      this.lstTableData.forEach((element) => {
        let dct = {};
        dct["LeaveTypeID"] = element.leaveType;
        dct["NoOfLeave"] = element.days;
        dct["CarryForwardLeave"] = element.carryForward;
        dct["EncashDays"] = element.encDays;
        dct["Period"] = element.peroid;
        dct["MonthLeave"] = element.monthly;

        dctData.leavePolicyDetail.push(dct);
      });
      if (!HasError) {
        this.serverService
          .postData("api/LeavePolicyAPI/Create/", dctData)
          .subscribe((res: any[]) => {
            swal.fire("Success", "Data Updated Successfully", "success");
            this.router.navigate(["leave-policy/list-leave-policy/"]);
          });
      }
    }
  }
  cancel() {}
}
