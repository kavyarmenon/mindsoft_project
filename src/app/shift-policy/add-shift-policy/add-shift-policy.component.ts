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
  selector: "app-add-shift-policy",
  templateUrl: "./add-shift-policy.component.html",
  styleUrls: ["./add-shift-policy.component.css"],
})
export class AddShiftPolicyComponent implements OnInit {
  lstTableData = [
    {
      shiftName: "",
      shiftType: null,
      fromTime: null,
      toTime: null,
      duration: null,
    },
  ];

  lstShiftType = [];
  shiftPolicy: FormGroup;

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
    this.shiftPolicy = this.formBuilder.group({
      shiftName: ["", Validators.required],
      shiftType: [null, Validators.required],
      noOfTimings: [""],
      fromTime: ["", Validators.required],
      toTime: ["", Validators.required],
      duration: [""],
      bufferTime: [""],
      lateComing: [""],
      earlyLeaving: [""],
      allowedBreakTime: [""],
      minWorkingHours: ["", Validators.required],
      minTimeForOverTime: [""],
      weeklyOtLimit: [""],
      consequenceApplicable: [""],
      overTimeCalcForMinWrkHr: [""],
    });

    this.serverService
      .getData("api/DropDownBindingAPI/ddlshifttype/")
      .subscribe((res: any[]) => {
        this.lstShiftType = res["shiftTypeList"];
      });
  }

  addRow(index, shiftType) {
    let dctData = {
      shiftName: "",
      shiftType: null,
      fromTime: null,
      toTime: null,
      duration: null,
    };
    this.lstTableData.push(dctData);
  }

  deleteRow(index) {
    this.lstTableData.splice(index, 1);
  }
  saveDetail() {
    if (!this.shiftPolicy.get("shiftName").value) {
      this.toastr.error("Enter Policy Name", "Error!");
      return false;
    } else if (!this.shiftPolicy.get("shiftType").value) {
      this.toastr.error("Choose a Shift Type", "Error!");
      return false;
    } else if (!this.shiftPolicy.get("fromTime").value) {
      this.toastr.error("Choose a From Time", "Error!");
      return false;
    } else if (!this.shiftPolicy.get("toTime").value) {
      this.toastr.error("Choose a To Time", "Error!");
      return false;
    } else if (!this.shiftPolicy.get("minWorkingHours").value) {
      this.toastr.error("Choose a Min Working Hours", "Error!");
      return false;
    } else {
      let HasError = false;
      if (this.shiftPolicy.get("shiftType").value == 3) {
        this.lstTableData.forEach((element, index) => {
          let rowNo = index + 1;
          if (element.shiftName == "") {
            this.toastr.error("Enter Shift Name for row " + rowNo, "Error!");
            HasError = true;
            return false;
          } else if (element.fromTime == null) {
            this.toastr.error("Enter a From Time  for row " + rowNo, "Error!");
            HasError = true;
            return false;
          } else if (element.toTime == null) {
            this.toastr.error("Enter a To Time for row " + rowNo, "Error!");
            HasError = true;
            return false;
          } else if (element.shiftType == null) {
            this.toastr.error("Choose Shift Type for row " + rowNo, "Error!");
            HasError = true;
            return false;
          }
        });
      }

      let dctData = {
        shiftPolicyName: this.shiftPolicy.get("shiftName").value,
        shiftTypeID: this.shiftPolicy.get("shiftType").value,
        noOfTiming: this.shiftPolicy.get("noOfTimings").value,
        fromTime: JSON.stringify(this.shiftPolicy.get("fromTime").value),
        toTime: JSON.stringify(this.shiftPolicy.get("toTime").value),
        duration: JSON.stringify(this.shiftPolicy.get("duration").value),
        bufferTime: JSON.stringify(this.shiftPolicy.get("bufferTime").value),
        isBufferForOT: "",
        lateComing: JSON.stringify(this.shiftPolicy.get("lateComing").value),
        earlyLeaving: JSON.stringify(
          this.shiftPolicy.get("earlyLeaving").value
        ),
        allowedBreakTime: JSON.stringify(
          this.shiftPolicy.get("allowedBreakTime").value
        ),
        minWorkingHour: JSON.stringify(
          this.shiftPolicy.get("minWorkingHours").value
        ),
        isConsequenceApplicable: this.shiftPolicy.get("consequenceApplicable")
          .value,
        isOTBasedOnMinWorkingHour: this.shiftPolicy.get(
          "overTimeCalcForMinWrkHr"
        ).value,
        minTimeForOT: JSON.stringify(
          this.shiftPolicy.get("minTimeForOverTime").value
        ),
        weeklyOTLimit: JSON.stringify(
          this.shiftPolicy.get("weeklyOtLimit").value
        ),
        isIncentive: "",
        ScheduleFrequency: "",
        ScheduleDay: "",
        ScheduleTime: "",
        ShiftSpanFrom: "",
        ShiftSpanTo: "",
        ScheduleDayName: "",
        shiftRotation: "",
        shiftPolicyList: this.lstTableData,
      };
      if (!HasError) {
        this.serverService
          .postData("api/ShiftPolicyAPI/Create/", dctData)
          .subscribe((res: any[]) => {
            swal.fire("Success", "Data Saved Successfully", "success");
            this.router.navigate(["shift-policy/list-shift-policy/"]);
          });
      }
    }
  }
  cancel() {
    this.router.navigate(["shift-policy/list-shift-policy/"]);
  }
}
