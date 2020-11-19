import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ServerService } from "src/app/server.service";
import { MatTabChangeEvent } from "@angular/material/tabs";
import swal from "sweetalert2";

@Component({
  selector: "app-add-work-policy",
  templateUrl: "./add-work-policy.component.html",
  styleUrls: ["./add-work-policy.component.css"],
})
export class AddWorkPolicyComponent implements OnInit {
  workPolicy: FormGroup;
  lstGeneralShift = [];
  selectedIndex = 0;
  isFillTab1 = true;

  lstPolicyDetails = [
    {
      workingDay: false,
      dayId: 1,
      day: "Sunday",
      shiftId: null,
      shift: "",
    },
    {
      workingDay: false,
      dayId: 2,
      day: "Monday",
      shiftId: null,
      shift: "",
    },
    {
      workingDay: false,
      dayId: 3,
      day: "Tuesday",
      shiftId: null,
      shift: "",
    },
    {
      workingDay: false,
      dayId: 4,
      day: "Wednesday",
      shiftId: null,
      shift: "",
    },
    {
      workingDay: false,
      dayId: 5,
      day: "Thursday",
      shiftId: null,
      shift: "",
    },
    {
      workingDay: false,
      dayId: 6,
      day: "Friday",
      shiftId: null,
      shift: "",
    },
    {
      workingDay: false,
      dayId: 7,
      day: "Saturday",
      shiftId: null,
      shift: "",
    },
  ];

  lstPolicyConsequences = [
    {
      consequences: "Break Time",
      consequencesId: 1,
      allowedDays: "",
      lop: null,
      casual: null,
      amount: null,
    },
    {
      consequences: "Early Leaving",
      consequencesId: 2,
      allowedDays: "",
      lop: null,
      casual: null,
      amount: null,
    },
    {
      consequences: "Late Coming",
      consequencesId: 3,
      allowedDays: "",
      lop: null,
      casual: null,
      amount: null,
    },
    {
      consequences: "Work Time",
      consequencesId: 4,
      allowedDays: "",
      lop: null,
      casual: null,
      amount: null,
    },
  ];
  lstLop = [];
  lstCasual = [];
  policyName: "";
  generalShift: null;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public router: Router,
    private toastr: ToastrService,
    private serverService: ServerService
  ) {}

  ngOnInit(): void {
    this.serverService
      .getData("api/DropDownBindingAPI/ddlshift/")
      .subscribe((res: any[]) => {
        this.lstGeneralShift = res["shiftList"];
      });

    this.serverService
      .getData("api/DropDownBindingAPI/ddlDayTypeList/")
      .subscribe((res: any[]) => {
        this.lstLop = res["dayTypeList"];
        this.lstCasual = res["dayTypeList"];
      });
  }
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
  }

  public nextStep() {
    let isValid = true;
    if (!this.policyName) {
      this.toastr.error("Enter Policy Name", "Error!");
      return false;
    } else if (!this.generalShift) {
      this.toastr.error("Choose a General Shift", "Error!");
      return false;
    } else {
      for (let i = 0; i < this.lstPolicyDetails.length; i++) {
        let rowNo = i + 1;
        if (
          this.lstPolicyDetails[i].workingDay &&
          this.lstPolicyDetails[i].shiftId === null
        ) {
          this.toastr.error("Select a Shift Type For Row " + rowNo, "Error!");
          this.isFillTab1 = false;
          isValid = false;
          break;
        }
      }
      if (isValid) {
        this.isFillTab1 = false;
        this.selectedIndex += 1;
      }
    }
  }

  public previousStep() {
    this.selectedIndex -= 1;
  }
  saveDetail() {
    let dctData = {
      workPolicyInfo: {
        workPolicyID: null,
        workPolicyName: this.policyName,
        generalShiftID: this.generalShift,
      },
      alternativeOffDay: null,
      ShiftName: null,
      workPolicyList: [],
      workPolicyDetailList: [],
      workPolicyConseqList: [],
    };

    this.lstPolicyDetails.forEach((element) => {
      let dct = {};
      // if (element.workingDay) {
      dct["DayID"] = element.dayId;
      dct["WorkPolicyID"] = null;
      dct["ShiftID"] = element.dayId;
      dctData.workPolicyDetailList.push(dct);
      // }
    });

    this.lstPolicyConsequences.forEach((element) => {
      let dct = {};
      dct["WorkPolicyID"] = null;
      dct["ConsequenceID"] = element.consequencesId;
      dct["AllowedDaysPerMonth"] = element.allowedDays;
      dct["LOP"] = element.lop;
      dct["Casual"] = element.casual;
      dct["Amount"] = element.amount;
      dctData.workPolicyConseqList.push(dct);
    });

    this.serverService
      .postData("api/WorkPolicyAPI/Create/", dctData)
      .subscribe((res: any[]) => {
        if (res["Status"]) {
          swal.fire("Success", "Data Saved Successfully", "success");
          this.router.navigate(["work-policy/list-work-policy/"]);
        }
      });
  }
}
