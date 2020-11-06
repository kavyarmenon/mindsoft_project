import { Component, OnInit, ViewChild } from "@angular/core";
import { ServerService } from "../../server.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import swal from "sweetalert2";
import { MatTableDataSource } from "@angular/material/table";
@Component({
  selector: "app-list-deduction-policy",
  templateUrl: "./list-deduction-policy.component.html",
  styleUrls: ["./list-deduction-policy.component.css"],
})
export class ListDeductionPolicyComponent implements OnInit {
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
    this.serviceObject
      .getData("api/DeductionPolicyAPI/getDeductionPolicy/")
      .subscribe(
        (res) => {
          // if (res['status'] == 1)
          // {

          this.data = res["deductFromList"];
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
    localStorage.setItem("deductionPolicyID", item.deductionPolicyID);
    this.router.navigate(["deduction-policy/edit-deduction-policy/"]);
  }
  deleteCompany(item) {
    this.serviceObject
      .getData(
        "api/DeductionPolicyAPI/DeleteDeductionPolicy/?deductionPolicyID=" +
          item.deductionPolicyID
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
