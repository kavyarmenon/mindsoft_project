import { Component, OnInit, ViewChild } from "@angular/core";
import { ServerService } from "../../server.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import swal from "sweetalert2";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-list-leave-policy",
  templateUrl: "./list-leave-policy.component.html",
  styleUrls: ["./list-leave-policy.component.css"],
})
export class ListLeavePolicyComponent implements OnInit {
  data;
  lstTableData = [];
  dataSource;
  blnShowData = false;

  lstDisplayedColumns = ["policyName", "applicableFrom", "action"];

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
    this.serviceObject.getData("api/LeavePolicyAPI/getLeavePolicy/").subscribe(
      (res) => {
        // if (res['status'] == 1)
        // {

        this.data = res["leavePolicyList"];
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
    localStorage.setItem("leavePolicyID", item.leavePolicyID);
    this.router.navigate(["leave-policy/edit-leave-policy/"]);
  }
  deleteCompany(item) {
    this.serviceObject
      .getData(
        "apiLeavePolicyAPI/DeleteLeavePolicy/?leavePolicyID=" +
          item.leavePolicyID
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
