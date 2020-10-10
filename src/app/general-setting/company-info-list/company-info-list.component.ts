import { Component, OnInit,ViewChild } from '@angular/core';
import * as moment from 'moment' ;
import { ServerService } from '../../server.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-company-info-list',
  templateUrl: './company-info-list.component.html',
  styleUrls: ['./company-info-list.component.css']
})
export class CompanyInfoListComponent implements OnInit {


  datFrom ;
  datTo ;
  data
  lstTableData= [];
  dataSource;
  blnShowData = false;

  lstDisplayedColumns =['company','companyStartDate','action'];



  constructor(private serviceObject : ServerService,
    private toastr: ToastrService,
    public router: Router,
     ) {
      this.dataSource = new MatTableDataSource(
        this.lstTableData
      );
      }

  ngOnInit() {
    this.datFrom = new Date();
    this.datTo = new Date();

    this.searchData();
  }


  searchData(){
    this.serviceObject.getData('api/CompanyAPI/CompanyList/').subscribe(res => {

      // if (res['status'] == 1)
      // {
        
        this.data= res;
        console.log(this.data,"data");
        
        if( this.data.length>0){
          this.blnShowData = true;
        }
        this.lstTableData=this.data
        this.dataSource = new MatTableDataSource(
          this.lstTableData
        );
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
    swal.fire('Error!','Server Error!!', 'error');
  });



  }

  editCompany(item){

    localStorage.setItem('companyId',item.companyId);
    this.router.navigate(['general-setting/company-info-edit/']);
  

  }
  deleteCompany(item){

    this.serviceObject.getData('api/CompanyAPI/DeleteCompany/?companyId='+item.companyId).subscribe(res => {
      swal.fire('Success',res['Status'], 'success');
      this.searchData();

    },
    (error) => {
      swal.fire('Error!','Server Error!!', 'error');
    });

    }

}
