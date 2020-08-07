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

  lstTableData= [];
  dataSource;
  blnShowData = false;

  lstDisplayedColumns =['date','branch','journalId','debitType','debitDetails','creditType','creditDetails','amount','action'];



  constructor(private serviceObject : ServerService,
    private toastr: ToastrService,
    public router: Router,
     ) { }

  ngOnInit() {
    this.datFrom = new Date();
    this.datTo = new Date();

    this.searchData();
  }


  searchData(){
    this.serviceObject.getData('api/CompanyAPI/CompanyList/').subscribe(res => {

      // if (res['status'] == 1)
      // {
        
        let data= res;
        console.log(data,"data");
        
        // this.lstTableData=data
        // if(res == null){
          this.blnShowData = false;
        // }
       
        // else if(this.lstTableData.length > 0){
        //   this.blnShowData = true;
        // }

        this.dataSource = new MatTableDataSource(
          this.lstTableData
        );
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

  viewJournal(item){

    localStorage.setItem('journalId',item.pk_bint_id);
    this.router.navigate(['journal/viewjournal/']);
  

  }

}
