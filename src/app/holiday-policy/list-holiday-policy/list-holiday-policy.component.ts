import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ServerService } from "src/app/server.service";
import swal from "sweetalert2";
@Component({
  selector: "app-list-holiday-policy",
  templateUrl: "./list-holiday-policy.component.html",
  styleUrls: ["./list-holiday-policy.component.css"],
})
export class ListHolidayPolicyComponent implements OnInit {
  data;
  lstTableData = [];
  dataSource;
  blnShowData = false;

  lstDisplayedColumns = ["policyName", "calDay", "action"];

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
      .getData("api/HolidayPolicyAPI/getHolidayPolicyList/")
      .subscribe(
        (res) => {
          this.data = res["holidayPolicyList"];
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
    localStorage.setItem("holidayPolicyID", item.holidayPolicyID);
    this.router.navigate(["holiday-policy/edit-holiday-policy/"]);
  }
  deleteCompany(item) {
    this.serviceObject
      .getData(
        "api/HolidayPolicyAPI/DeleteHolidayPolicy?holidayPolicyID=" +
          item.holidayPolicyID
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
