import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormArray,
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
  selector: "app-add-settlement-policy",
  templateUrl: "./add-settlement-policy.component.html",
  styleUrls: ["./add-settlement-policy.component.css"],
})
export class AddSettlementPolicyComponent implements OnInit {
  settlementPolicy: FormGroup;
  normalForm: FormGroup;
  control: FormArray;

  lstCalcBasedOn = [];
  lstParticular = [];
  lstCalcDay = [];
  lstParameter = [];
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
    this.settlementPolicy = this.formBuilder.group({
      policyName: ["", Validators.required],
    });
    this.normalForm = this.formBuilder.group({
      calcBasedOn: ["", Validators.required],
      calcDay: [null, Validators.required],
      isLessThanFive: [false],
      particulars: [[], Validators.required],
      isIncludeEligibleLeave: [false, Validators.required],
      tableLessThanRows: this.formBuilder.array([]),
      tableGreaterThanRows: this.formBuilder.array([]),
    });
    this.addRow("lessThan");
    this.addRow("greaterThan");

    this.serverService
      .getData("api/DropDownBindingAPI/ddlCalculationBasedOn/")
      .subscribe((res: any[]) => {
        this.lstCalcBasedOn = res["ddlCalcList"];
      });

    this.serverService
      .getData("api/DropDownBindingAPI/ddlExcludefromGrossSalary/")
      .subscribe((res: any[]) => {
        this.lstParticular = res["particularsList"];
      });

    this.serverService
      .getData("api/DropDownBindingAPI/ddlCalcdayList/")
      .subscribe((res: any[]) => {
        this.lstCalcDay = res["calculationDayList"];
      });

    this.serverService
      .getData("api/DropDownBindingAPI/parameterValueDDList/")
      .subscribe((res: any[]) => {
        this.lstParameter = res["calculationDayList"];
      });
  }
  mode: boolean;
  touchedRows: any;

  ngAfterOnInit() {
    this.control = this.normalForm.get("tableLessThanRows") as FormArray;
    this.control = this.normalForm.get("tableGreaterThanRows") as FormArray;
  }

  initiateForm(): FormGroup {
    return this.formBuilder.group({
      parameter: ["", Validators.required],
      noOfMonth: ["", [Validators.required]],
      noOfDays: ["", [Validators.required]],
    });
  }

  addRow(type) {
    if (type === "lessThan") {
      const control = this.normalForm.get("tableLessThanRows") as FormArray;
      control.push(this.initiateForm());
    } else {
      const control = this.normalForm.get("tableGreaterThanRows") as FormArray;
      control.push(this.initiateForm());
    }
  }

  deleteRow(index: number, type) {
    if (type === "lessThan") {
      const control = this.normalForm.get("tableLessThanRows") as FormArray;
      control.removeAt(index);
    } else {
      const control = this.normalForm.get("tableGreaterThanRows") as FormArray;
      control.removeAt(index);
    }
  }
  saveUserDetails() {
    console.log(this.normalForm.value);
  }

  get getFormControls1() {
    const control = this.normalForm.get("tableLessThanRows") as FormArray;
    return control;
  }
  get getFormControls2() {
    const control = this.normalForm.get("tableGreaterThanRows") as FormArray;
    return control;
  }

  // submitForm() {
  //   const control = this.normalForm.get("tableLessThanRows") as FormArray;
  //   this.touchedRows = control.controls
  //     .filter((row) => row.touched)
  //     .map((row) => row.value);
  //   console.log(this.touchedRows);
  // }

  // toggleTheme() {
  //   this.mode = !this.mode;
  // }
}
