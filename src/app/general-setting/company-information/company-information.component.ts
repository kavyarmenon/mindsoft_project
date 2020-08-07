import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ServerService } from "src/app/server.service";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-company-information",
  templateUrl: "./company-information.component.html",
  styleUrls: ["./company-information.component.css"],
})
export class CompanyInformationComponent implements OnInit {
  isLinear = false;
  // firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  form: FormGroup;
  companyInfoForm: FormGroup;
  addressInfoForm: FormGroup;
  bankInfoForm: FormGroup;
  otherInfoForm: FormGroup;

  strCompanyName = "";
  strBranchName = "";
  strEmployerCode = "";
  strShortName = "";
  intCountry = null;
  intCurrency = null;
  intCompanyIndustry1 = null;
  intCompanyType = null;
  strWebsite1 = "";
  strBranch;
  intCompanyId

  strarea = "";
  strblock = "";
  strstreet = "";
  strcity = "";
  intState = null;
  strprimaryEmail = "";
  strsecondaryEmail = "";
  intCompanyIndustry2 = null;
  strOtherInformation = "";
  strWebsite2 = "";

  strHeadName;
  strFatherName;
  intDesignation;
  strPanNo;
  strTanNo;
  strCin;
  strGst;
  strRoc;
  strRegNo;
  strBank;
  strAcNo ;
  lstCountryData = [];
  lstStateData = [];
  lstDistrictData = [];
  lstIndustry = [];
  lstType = [];
  lstDesignation = [];
  lstDepartment = [];
  lstCurrency = [];
  lstBank = [];
  lstBankBranch = [];
  lstProvince = [];
  lstLeavType = [];
  lstCompany= [];
  blnSunday=true
  blnMonday=true
  blnTuesday=true
  blnWednesday=true
  blnThursday=true
  blnFriday=true
  blnSaturday=true
  base64textString = [];
  intOwnToggle="1"

  lstBankDetails=[{bank:'',acno:null}]

  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
  files = [];
  imgSrc;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public router: Router,
    private serverService: ServerService
  ) {}

  ngOnInit() {
    this.companyInfoForm = this.formBuilder.group({
      companyName: ["", Validators.required],
      branchName: ["", Validators.required],
      employerCode: ["", Validators.required],
      shortName: ["", Validators.required],
      strCountry: ["", Validators.required],
      strCurrency: ["", Validators.required],
      strCompanyIndustry: ["", Validators.required],
      strCompanyType: ["", Validators.required],
      website: [""],
      type: [""],
    });

    this.addressInfoForm = this.formBuilder.group({
      area: ["", Validators.required],
      block: ["", Validators.required],
      street: ["", Validators.required],
      city: ["", Validators.required],
      strState: ["", Validators.required],
      primaryEmail: ["", Validators.required],
      secondaryEmail: ["", Validators.required],
      strCompanyIndustry: ["", Validators.required],
      otherInformation: ["", Validators.required],
      website: [""],
      Sunday: [""],
      Monday: [""],
      Tuesday: [""],
      Wednesday: [""],
      Thursday: [""],
      Friday: [""],
      Saturday: [""],
    });

    this.bankInfoForm = this.formBuilder.group({
      finDate: ["", Validators.required],
      bookDate: ["", Validators.required],
      companyDate: ["", Validators.required],
      strPay: ["", Validators.required],
      // acno: ["", Validators.required],
      // bank: ["", Validators.required],
    });

    this.otherInfoForm = this.formBuilder.group({
      headName: ["", Validators.required],
      fatherName: ["", Validators.required],
      designation: ["", Validators.required],
      panNo: ["", Validators.required],
      tanNo: ["", Validators.required],
      cin: ["", Validators.required],
      gst: ["", Validators.required],
      roc: ["", Validators.required],
      regNo: ["", Validators.required],
    });

    this.serverService
      .getData("api/MasterListAPI/CountryList/")
      .subscribe((res: any[]) => {
        this.lstCountryData = res["countryList"];
      });

    this.serverService
      .getData("api/MasterListAPI/IndustryList/")
      .subscribe((res: any[]) => {
        this.lstIndustry = res["industryList"];
      });

    this.serverService
      .getData("api/MasterListAPI/TypeList/")
      .subscribe((res: any[]) => {
        this.lstType = res["typeList"];
      });
    this.serverService
      .getData("api/MasterListAPI/StateList/")
      .subscribe((res: any[]) => {
        this.lstStateData = res["stateList"];
      });

    this.serverService
      .getData("api/MasterListAPI/DesignationList/")
      .subscribe((res: any[]) => {
        this.lstDesignation = res["designationList"];
      });

    this.serverService
      .getData("api/MasterListAPI/DepartmentList/")
      .subscribe((res: any[]) => {
        this.lstDepartment = res["departmentList"];
      });

    this.serverService
      .getData("api/MasterListAPI/CurrencyList/")
      .subscribe((res: any[]) => {
        this.lstCurrency = res["currencyList"];
      });

    this.serverService
      .getData("api/CompanyAPI/BankList/")
      .subscribe((res: any[]) => {
        console.log(res,"dfgsdfsdfffs");
        
        this.lstBank = res["bankList"];
      });

    this.serverService
      .getData("api/MasterListAPI/BankBranchList/")
      .subscribe((res: any[]) => {
        this.lstBankBranch = res["bankbranchList"];
      });

    this.serverService
      .getData("api/MasterListAPI/ProvinceList/")
      .subscribe((res: any[]) => {
        this.lstProvince = res["provinceList"];
      });

    this.serverService
      .getData("api/MasterListAPI/LeaveTypeList/")
      .subscribe((res: any[]) => {
        this.lstLeavType = res["leaveTypeList"];
      });


    this.serverService
    .getData("api/CompanyAPI/CompanyDDList/")
    .subscribe((res: any[]) => {
      this.lstCompany = res["companyList"];
      console.log(this.lstCompany,"cmny");
      
    });
  }
  nextClicked() {}

  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      this.imgSrc = fileUpload.files[0];
    };
    fileUpload.click();
  }

  handleFileSelect(evt){
    var files = evt.target.files;
    var file = files[0];

  if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
}



_handleReaderLoaded(readerEvt) {
   var binaryString = readerEvt.target.result;
          // this.base64textString= btoa(binaryString);
          this.base64textString.push('data:image/png;base64,' + btoa(binaryString));

          console.log(this.base64textString,"image ");
  }
  saveDetail() {
    console.log(this.companyInfoForm, "aaaa");
    console.log(this.addressInfoForm, "aaaa");
    console.log(this.bankInfoForm, "b");
    console.log(this.imgSrc, "o");

    let dctData = {
      Status: "",
      companyInfo: {
        companyId: this.companyInfoForm.value.strCompanyIndustry, //?
        empCode: this.companyInfoForm.value.employerCode, // emp code key?
        companyName: this.companyInfoForm.value.companyName,
        shortName: this.companyInfoForm.value.shortName,
        pOBox: "sample string 6", //?
        area: this.addressInfoForm.value.area,
        block: this.addressInfoForm.value.block,
        road: this.addressInfoForm.value.street, //?
        city: this.addressInfoForm.value.city,
        stateId: this.addressInfoForm.value.strState,
        countryId: this.companyInfoForm.value.strCountry,
        currencyId: this.companyInfoForm.value.strCurrency,
        companyIndustryId: this.companyInfoForm.value.strCompanyIndustry,
        companyTypeId: this.companyInfoForm.value.strCompanyType,
        primaryEmail: this.addressInfoForm.value.primaryEmail,
        secondaryEmail: this.addressInfoForm.value.secondaryEmail,
        telephoneNo: "sample string 14", //?
        faxNo: "sample string 15", //?
        webSite: this.addressInfoForm.value.website,
        finYrStartDatestr: this.bankInfoForm.value.finDate,
        finYrStartDate:  this.bankInfoForm.value.finDate, //?
        daysID: [
          1,
          2,
        ],
        bookStartDatestr: this.bankInfoForm.value.bookDate,
        bookStartDate:this.bankInfoForm.value.bookDate,
        EPID: this.companyInfoForm.value.employerCode, // emp code key?
        companyStartDate:this.bankInfoForm.value.companyDate,
        companyStartDatestr: this.bankInfoForm.value.companyDate,
        unearnedPolicyId: null, //?
        OtherInfo: this.addressInfoForm.value.otherInfoForm,
        companyLogo: this.base64textString[0],
        companyLogobyte: this.imgSrc.size,
        tanNo: this.otherInfoForm.value.tanNo,
        officeHeadName: this.otherInfoForm.value.headName,
        designationId: this.otherInfoForm.value.designation,
        panNo: this.otherInfoForm.value.panNo,
        fatherName: this.otherInfoForm.value.fatherName,
        cinNo: this.otherInfoForm.value.cin,
        gstTIN: this.otherInfoForm.value.gstTIN,
        rocCode: this.otherInfoForm.value.roc,
        registrationNo: this.otherInfoForm.value.regNo,
        isSaved: null, //?
        imageType: this.imgSrc.type,
      },
      companybankInfo: {
        // CompanyBankAccountID: 1,
        // CompanyID: 2, //?
        // BankBranchID: 1,
        // BankAccountNo: "sample string 3",
      },
      companyBankList: []
      //   {
      //     CompanyBankAccountID: null,
      //     CompanyID: null,
      //     BankBranchID:this.strBankName,
      //     BankAccountNo: this.strAcNo,
      //   },
      //   // {
      //   //   CompanyBankAccountID: null,
      //   //   CompanyID: null,
      //   //   BankBranchID: 1,
      //   //   BankAccountNo: "sample string 3",
      //   // },
      // ],
    };


    if(this.intOwnToggle=="1"){
      dctData['companyInfo']['isBranch']= 1;
      dctData['companyInfo']['parentId']= this.intCompanyId ;    
    }
    else{
      dctData['companyInfo']['isBranch']= 0;
      dctData['companyInfo']['parentId']=null;
    }
    this.lstBankDetails.forEach((element,index)=> {
     let dict={}
     dict['BankBranchID']= element.bank;
     dict['BankAccountNo']= element.acno;
     dict['CompanyID']= null;
     dict['CompanyBankAccountID']= null;
     dctData['companyBankList'].push(dict)
      
    });

    console.log(dctData, this.imgSrc, "save");
    this.serverService
      .postData("api/CompanyAPI/createCompany/", dctData)
      .subscribe((res: any[]) => {
        this.lstBankBranch = res["bankbranchList"];
      });
  }
  ownToggle(){

  }
  addBank(){
    console.log(this.lstBankDetails,"befr");

    this.lstBankDetails.push({bank:'',acno:null})
    console.log(this.lstBankDetails,"aftr");
    
    }
}
