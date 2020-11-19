import { Component, OnInit, ViewChild } from "@angular/core";
import * as moment from "moment";
import { ServerService } from "../../server.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import swal from "sweetalert2";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-list-shift-policy",
  templateUrl: "./list-shift-policy.component.html",
  styleUrls: ["./list-shift-policy.component.css"],
})
export class ListShiftPolicyComponent implements OnInit {
  data;
  lstTableData = [];
  dataSource;
  blnShowData = false;

  lstDisplayedColumns = ["shiftName", "shiftType", "noOfTiming", "action"];

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
    this.serviceObject.getData("api/ShiftPolicyAPI/getShiftPolicy/").subscribe(
      (res) => {
        // if (res['status'] == 1)
        // {

        this.data = res["shiftPolicyList"];
        console.log(this.data, "data");

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
    localStorage.setItem("shiftPolicyID", item.shiftPolicyID);
    this.router.navigate(["shift-policy/edit-shift-policy/"]);
  }
  deleteCompany(item) {
    this.serviceObject
      .getData(
        "api/ShiftPolicyAPI/DeleteShiftPolicy?shiftPolicyID=" +
          item.shiftPolicyID
      )
      .subscribe(
        (res) => {
          swal.fire("Success", "Delete Successfully", "success");
          this.searchData();
        },
        (error) => {
          swal.fire("Error!", "Server Error!!", "error");
        }
      );
  }
}
