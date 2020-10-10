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

@Component({
  selector: "app-add-leave-policy",
  templateUrl: "./add-leave-policy.component.html",
  styleUrls: ["./add-leave-policy.component.css"],
})
export class AddLeavePolicyComponent implements OnInit {
  lstTableData = [
    {
      leaveTypeName: "",
      leaveType: null,
      days: null,
      monthly: null,
      carryForward: null,
      encDays: null,
      peroid: null,
    },
  ];

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

  ngOnInit(): void {
    this.leavePolicy = this.formBuilder.group({
      policyName: ["", Validators.required],
      applicableFrom: ["", Validators.required],
    });
    this.serverService
      .getData("api/DropDownBindingAPI/ddlleavetype/")
      .subscribe((res: any[]) => {
        this.lstLeaveType = res["leaveTypeList"];
      });
  }
  leaveTypeChanged(index, value) {
    console.log(this.lstTableData, "check fn");
    if (
      this.lstTableData.find((x: any) => x.leaveTypeName === value.leaveType)
    ) {
      this.lstTableData[index] = {
        leaveTypeName: "",
        leaveType: null,
        days: null,
        monthly: null,
        carryForward: null,
        encDays: null,
        peroid: null,
      };
    } else {
      this.lstTableData[index].leaveType = value.leaveTypeId;
    }
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
    let dctData = {
      Status: "sample string 1",
      leavePolicyInfo: {
        leavePolicyID: null,
        leavePolicyName: this.leavePolicy.get("policyName").value,
        applicableFromstr: this.leavePolicy.get("applicableFrom").value,
        applicableFrom: "sample string 3",
      },
      leavePolicyDetail: [],
      //   {
      //     SerialNo: 1,
      //     LeavePolicyID: 2,
      //     LeaveTypeID: 3,
      //     NoOfLeave: 4.0,
      //     MonthLeave: 5.0,
      //     CarryForwardLeave: 6.0,
      //     EncashDays: 7.0,
      //     Period: 8.0,
      //   },
      //   {
      //     SerialNo: 1,
      //     LeavePolicyID: 2,
      //     LeaveTypeID: 3,
      //     NoOfLeave: 4.0,
      //     MonthLeave: 5.0,
      //     CarryForwardLeave: 6.0,
      //     EncashDays: 7.0,
      //     Period: 8.0,
      //   },
      // ],
      leavePolicyDetailInfo: {},
      //   SerialNo: 1,
      //   LeavePolicyID: 2,
      //   LeaveTypeID: 3,
      //   NoOfLeave: 4.0,
      //   MonthLeave: 5.0,
      //   CarryForwardLeave: 6.0,
      //   EncashDays: 7.0,
      //   Period: 8.0,
      // },
    };
    this.lstTableData.forEach((element) => {
      let dct = {};
      dct["LeaveTypeID"] = element.leaveType;
      dct["NoOfLeave"] = element.days;
      dct["CarryForwardLeave"] = element.carryForward;
      dct["EncashDays"] = element.encDays;
      dct["Period"] = element.peroid;
      dctData.leavePolicyDetail.push(dct);
    });
    console.log(dctData, "dctData");

    this.serverService
      .postData("api/LeavePolicyAPI/Create/", dctData)
      .subscribe((res: any[]) => {
        swal.fire("Success", res["Status"], "success");
        this.router.navigate(["leave-policy/list-leave-policy/"]);
      });
  }
  cancel() {}
}
