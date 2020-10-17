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
  // lstTableData = [
  //   {
  //     parameter: null,
  //     noOfday: null,
  //     noOfMonths: null,
  //   },
  // ];
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public router: Router,
    private toastr: ToastrService,
    private serverService: ServerService
  ) {
    // this.dataSource = new MatTableDataSource(this.lstTableData);
  }

  initiateForm(): FormGroup {
    return this.formBuilder.group({
      parameter: ["", Validators.required],
      noOfDays: [null, Validators.required],
      noOfMonth: [null, Validators.required],
    });
  }
  get getFormControls() {
    const control = this.normalForm.get("tableRows") as FormArray;
    return control;
  }

  ngAfterOnInit() {
    this.control = this.normalForm.get("tableRows") as FormArray;
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
      tableRows: this.formBuilder.array([]),
    });
    this.addRow();
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
  addRow() {
    const control = this.normalForm.get("tableRows") as FormArray;
    console.log(this.initiateForm(), "initial");

    control.push(this.initiateForm());
  }

  deleteRow(index) {
    // this.lstTableData.splice(index, 1);
    const control = this.normalForm.get("tableRows") as FormArray;
    control.removeAt(index);
  }
}
