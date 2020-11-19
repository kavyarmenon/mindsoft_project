import { Component, OnInit, ViewChild } from "@angular/core";
import { ServerService } from "../../server.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import swal from "sweetalert2";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-list-salary-template",
  templateUrl: "./list-salary-template.component.html",
  styleUrls: ["./list-salary-template.component.css"],
})
export class ListSalaryTemplateComponent implements OnInit {
  data;
  lstTableData = [];
  dataSource;
  blnShowData = false;

  lstDisplayedColumns = ["templateName", "action"];

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
      .getData("api/SalaryTemplateAPI/getSalaryTemplate/")
      .subscribe(
        (res) => {
          // if (res['status'] == 1)
          // {

          this.data = res["templateList"];
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
    localStorage.setItem("templateID", item.templateID);
    this.router.navigate(["salary-template/edit-salary-template/"]);
  }
  deleteCompany(item) {
    this.serviceObject
      .getData(
        "api/SalaryTemplateAPI/DeleteSalaryTemplate/?salaryTemplateID=" +
          item.templateID
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
