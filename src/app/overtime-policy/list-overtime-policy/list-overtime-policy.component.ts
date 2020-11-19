import { Component, OnInit, ViewChild } from "@angular/core";
import * as moment from "moment";
import { ServerService } from "../../server.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import swal from "sweetalert2";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-list-overtime-policy",
  templateUrl: "./list-overtime-policy.component.html",
  styleUrls: ["./list-overtime-policy.component.css"],
})
export class ListOvertimePolicyComponent implements OnInit {
  data;
  lstTableData = [];
  dataSource;
  blnShowData = false;

  lstDisplayedColumns = ["policyName", "workingHr", "action"];

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
      .getData("api/OvertimePolicyAPI/OvertimePolicyList/")
      .subscribe(
        (res) => {
          // if (res['status'] == 1)
          // {

          this.data = res["overtimeMasterList"];
          console.log(this.data, "data");

          if (this.data.length > 0) {
            this.blnShowData = true;
          }
          this.lstTableData = this.data;
          this.dataSource = new MatTableDataSource(this.lstTableData);
          // else if(this.lstTableData.length > 0){
          //   this.blnShowData = true;
          // }

          // this.dataSource.paginator = this.paginator;
          // this.dataSource.paginator.firstPage();
          // this.dataSource.sort = this.sort;

          // }
          // else if (res['status'] == 0) {
          //   swal.fire('Error!','Something went wrong!!', 'error');
          //   this.blnShowData = true;

          // }
        },
        (error) => {
          swal.fire("Error!", "Server Error!!", "error");
        }
      );
  }

  editCompany(item) {
    localStorage.setItem("overtimePolicyId", item.overtimePolicyId);
    this.router.navigate(["overtime-policy/edit-overtime-policy/"]);
  }
  deleteCompany(item) {
    console.log(item, item.overtimePolicyId, "item delete");

    this.serviceObject
      .getData(
        "api/OvertimePolicyAPI/DeleteOvertimePolicy/?overtimePolicyId=" +
          item.overtimePolicyId
      )
      .subscribe(
        (res) => {
          swal.fire("Success", "Data Deleted Successfully", "success");
          this.searchData();
        },
        (error) => {
          swal.fire("Error!", "Server Error!!", "error");
        }
      );
  }
}
