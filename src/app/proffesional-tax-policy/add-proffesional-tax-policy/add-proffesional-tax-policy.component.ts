import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { element } from "protractor";
import { ServerService } from "src/app/server.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-add-proffesional-tax-policy",
  templateUrl: "./add-proffesional-tax-policy.component.html",
  styleUrls: ["./add-proffesional-tax-policy.component.css"],
})
export class AddProffesionalTaxPolicyComponent implements OnInit {
  stateId: null;
  lstState = [];
  lstTableData = [
    {
      StateID: null,
      id: null,
      range: null,
      rangeFrom: null,
      rangeTo: null,
      taxAmount: null,
    },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public router: Router,
    private toastr: ToastrService,
    private serverService: ServerService
  ) {}

  ngOnInit(): void {
    this.serverService
      .getData("api/DropDownBindingAPI/ddlStateList/")
      .subscribe((res: any[]) => {
        this.lstState = res["stateList"];
        let state = this.lstState.filter(
          (element) => element.state === "Kerala"
        );
        this.stateId = state[0]["stateId"];
        this.changeState();
      });
  }
  changeState() {
    this.serverService
      .getData(
        "api/ProfessionalTaxAPI/getStateWiseTaxById?StateID=" + this.stateId
      )
      .subscribe((res: any[]) => {
        this.lstTableData = res["taxList"];
        if (this.lstTableData.length === 0) {
          this.lstTableData = [
            {
              StateID: null,
              id: null,
              range: null,
              rangeFrom: null,
              rangeTo: null,
              taxAmount: null,
            },
          ];
        }
      });
  }

  addRow(index, leaveType) {
    let dctData = {
      StateID: null,
      id: null,
      range: null,
      rangeFrom: null,
      rangeTo: null,
      taxAmount: null,
      taxList: null,
    };
    this.lstTableData.push(dctData);
  }
  deleteRow(index) {
    this.lstTableData.splice(index, 1);
  }
  saveDetail() {
    let dctData = {
      // id	:null,
      // range	:null,
      // rangeFrom	:null,
      // rangeTo	:null,
      // taxAmount	:null,
      StateID: this.stateId,
      taxList: this.lstTableData,
    };
    this.serverService
      .postData("api/ProfessionalTaxAPI/Update/", dctData)
      .subscribe((res: any[]) => {
        if (res["Status"]) {
          Swal.fire("Success", "Data Saved Successfully", "success");
          this.stateId = null;
          this.lstTableData = [
            {
              StateID: null,
              id: null,
              range: null,
              rangeFrom: null,
              rangeTo: null,
              taxAmount: null,
            },
          ];
        }
      });
  }
  cancel() {
    this.stateId = null;
    this.lstTableData = [
      {
        StateID: null,
        id: null,
        range: null,
        rangeFrom: null,
        rangeTo: null,
        taxAmount: null,
      },
    ];
  }
}
