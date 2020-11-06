import { Component, OnInit, ViewChild } from "@angular/core";
import * as moment from "moment";
import { ServerService } from "../../server.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import swal from "sweetalert2";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-list-settlement-policy",
  templateUrl: "./list-settlement-policy.component.html",
  styleUrls: ["./list-settlement-policy.component.css"],
})
export class ListSettlementPolicyComponent implements OnInit {
  data;
  lstTableData = [];
  dataSource;
  blnShowData = false;

  lstDisplayedColumns = ["policyName", "action"];

  constructor(
    private serviceObject: ServerService,
    private toastr: ToastrService,
    public router: Router
  ) {
    this.dataSource = new MatTableDataSource(this.lstTableData);
  }

  ngOnInit() {
    this.searchData();
  }

  searchData() {
    this.serviceObject
      .getData("api/GratuityPolicyAPI/GratuityPolicyList/")
      .subscribe(
        (res) => {
          // if (res['status'] == 1)
          // {

          this.data = res["gratuityMasterList"];
          // console.log(this.data, "data");

          if (this.data.length > 0) {
            this.blnShowData = true;
          }
          this.lstTableData = this.data;
          this.dataSource = new MatTableDataSource(this.lstTableData);
        },
        (error) => {
          swal.fire("Error!", "Server Error!!", "error");
        }
      );
  }

  editCompany(item) {
    localStorage.setItem("gratuityPolicyId", item.gratuityPolicyId);
    this.router.navigate(["settlement-policy/edit-settlement-policy/"]);
  }
  deleteCompany(item) {
    this.serviceObject
      .getData(
        "api/GratuityPolicyAPI/DeleteGratuity?gratuityPolicyId=" +
          item.gratuityPolicyId
      )
      .subscribe(
        (res) => {
          swal.fire("Success", "Data Saved Successfully", "success");
          this.searchData();
        },
        (error) => {
          swal.fire("Error!", "Server Error!!", "error");
        }
      );
  }
}
