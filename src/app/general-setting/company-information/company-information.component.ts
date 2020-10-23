import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ServerService } from "src/app/server.service";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import swal from "sweetalert2";
import { MatStepper } from "@angular/material/stepper";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-company-information",
  templateUrl: "./company-information.component.html",
  styleUrls: ["./company-information.component.css"],
})
export class CompanyInformationComponent implements OnInit {
  isLinear = false;
  // firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  @ViewChild("stepper") stepper: MatStepper;
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
  intCompanyId;

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
  strPanNo = "";
  strTanNo;
  strCin;
  strGst;
  strRoc;
  strRegNo;
  strBank;
  strAcNo;
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
  lstCompany = [];
  blnSunday = false;
  blnMonday = false;
  blnTuesday = false;
  blnWednesday = false;
  blnThursday = false;
  blnFriday = false;
  blnSaturday = false;
  base64textString = [];
  intOwnToggle = "1";
  strYearOrMonth = "1";
  intWrkDays = 0;

  datFinance;
  datBook;
  datCompany;
  lstBankDetails = [{ bank: "", acno: null }];

  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
  files = [];
  imgSrc;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public router: Router,
    private toastr: ToastrService,
    private serverService: ServerService
  ) {}

  ngOnInit() {
    this.datFinance = new Date();
    this.datBook = new Date();
    this.datCompany = new Date();
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
      area: [""],
      block: [""],
      street: [""],
      city: [""],
      strState: [""],
      primaryEmail: [""],
      secondaryEmail: [""],
      strCompanyIndustry: [""],
      otherInformation: [""],
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
      intWrkDays: ["", Validators.required],
      // bank: ["", Validators.required],
    });

    this.otherInfoForm = this.formBuilder.group({
      headName: [""],
      fatherName: [""],
      designation: [""],
      panNo: [""],
      tanNo: [""],
      cin: [""],
      gst: [""],
      roc: [""],
      regNo: [""],
    });

    this.serverService
      .getData("api-MasterListAPI-CountryList/")
      .subscribe((res: any[]) => {
        this.lstCountryData = res["countryList"];
      });

    this.serverService
      .getData("api-MasterListAPI-IndustryList/")
      .subscribe((res: any[]) => {
        this.lstIndustry = res["industryList"];
      });

    this.serverService
      .getData("api-MasterListAPI-TypeList/")
      .subscribe((res: any[]) => {
        this.lstType = res["typeList"];
      });
    this.serverService
      .getData("api-MasterListAPI-StateList/")
      .subscribe((res: any[]) => {
        this.lstStateData = res["stateList"];
      });

    this.serverService
      .getData("api-MasterListAPI-DesignationList/")
      .subscribe((res: any[]) => {
        this.lstDesignation = res["designationList"];
      });

    this.serverService
      .getData("api-MasterListAPI-DepartmentList/")
      .subscribe((res: any[]) => {
        this.lstDepartment = res["departmentList"];
      });

    this.serverService
      .getData("api-MasterListAPI-CurrencyList/")
      .subscribe((res: any[]) => {
        this.lstCurrency = res["currencyList"];
      });

    this.serverService
      .getData("api/CompanyAPI/BankList/")
      .subscribe((res: any[]) => {
        this.lstBank = res["bankList"];
      });

    this.serverService
      .getData("api-MasterListAPI-BankBranchList/")
      .subscribe((res: any[]) => {
        this.lstBankBranch = res["bankbranchList"];
      });

    this.serverService
      .getData("api-MasterListAPI-ProvinceList/")
      .subscribe((res: any[]) => {
        this.lstProvince = res["provinceList"];
      });

    this.serverService
      .getData("api-MasterListAPI-LeaveTypeList/")
      .subscribe((res: any[]) => {
        this.lstLeavType = res["leaveTypeList"];
      });

    this.serverService
      .getData("api/CompanyAPI/CompanyDDList/")
      .subscribe((res: any[]) => {
        this.lstCompany = res["companyList"];
      });
  }
  nextClicked(type) {
    let checkError = false;
    if (type == "bank") {
      this.lstBankDetails.forEach((element) => {
        if (!element.bank) {
          this.toastr.error("Select Bank Name", "Error!");
          checkError = true;
          return false;
        } else if (!element.acno) {
          this.toastr.error("Enter Account No", "Error!");
          checkError = true;
          return false;
        } else if (element.acno.toString().length > 10) {
          this.toastr.error("Enter Account No.", "Error!");
          return false;
        }
      });
      if (this.datBook < this.datFinance) {
        this.toastr.error(
          "Book start date must be greater than the financial year start date",
          "Error!"
        );
        return false;
      } else if (
        this.strYearOrMonth == "1" &&
        (this.intWrkDays < 100 || this.intWrkDays > 366)
      ) {
        this.toastr.error(
          "The no. of working days must be within the range 100-366",
          "Error!"
        );
        return false;
      } else if (
        this.strYearOrMonth == "2" &&
        (this.intWrkDays == 0 || this.intWrkDays > 31)
      ) {
        this.toastr.error(
          "The no.of working days must be greater than zero and less than or equal to 31",
          "Error!"
        );
        return false;
      } else if (!checkError) {
        this.stepper.selected.completed = true;
        this.stepper.next();
      }
    } else if (type == "other") {
      if (this.strPanNo.toString().length != 10) {
        this.toastr.error("Enter Valid Pan No.", "Error!");
        return false;
      }
      if (!/^[a-zA-Z]{4}/.test(this.strPanNo)) {
        this.toastr.error(
          "First four digits of PAN No. should be letter",
          "Error!"
        );
        return false;
      } else {
        this.stepper.selected.completed = true;
        this.stepper.next();
      }
    }
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      this.imgSrc = fileUpload.files[0];
    };
    fileUpload.click();
  }

  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    // this.base64textString= btoa(binaryString);
    this.base64textString.push("data:image/png;base64," + btoa(binaryString));
  }
  saveDetail() {
    let dctData = {
      Status: "",
      companyInfo: {
        companyId: null, //?
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
        finYrStartDate: this.bankInfoForm.value.finDate, //?
        daysID: [],
        bookStartDatestr: this.bankInfoForm.value.bookDate,
        bookStartDate: this.bankInfoForm.value.bookDate,
        EPID: this.companyInfoForm.value.employerCode, // emp code key?
        companyStartDate: this.bankInfoForm.value.companyDate,
        companyStartDatestr: this.bankInfoForm.value.companyDate,
        unearnedPolicyId: null, //?
        OtherInfo: this.addressInfoForm.value.otherInformation,
        companyLogo: this.base64textString[0],
        companyLogobyte: this.imgSrc.size,
        tanNo: this.otherInfoForm.value.tanNo,
        officeHeadName: this.otherInfoForm.value.headName,
        designationId: this.otherInfoForm.value.designation,
        panNo: this.otherInfoForm.value.panNo,
        fatherName: this.otherInfoForm.value.fatherName,
        cinNo: this.otherInfoForm.value.cin,
        gstTIN: this.otherInfoForm.value.gst,
        rocCode: this.otherInfoForm.value.roc,
        registrationNo: this.otherInfoForm.value.regNo,
        isSaved: null, //?
        imageType: this.imgSrc.type,
        strYearOrMonth: this.strYearOrMonth,
        workingDays: this.intWrkDays,
      },
      companybankInfo: {
        // CompanyBankAccountID: 1,
        // CompanyID: 2, //?
        // BankBranchID: 1,
        // BankAccountNo: "sample string 3",
      },
      companyBankList: [],
    };

    if (this.intOwnToggle == "1") {
      dctData["companyInfo"]["isBranch"] = 1;
      dctData["companyInfo"]["parentId"] = this.intCompanyId;
    } else {
      dctData["companyInfo"]["isBranch"] = 0;
      dctData["companyInfo"]["parentId"] = null;
    }
    if (this.blnSunday) {
      dctData["companyInfo"]["daysID"].push(1);
    }
    if (this.blnMonday) {
      dctData["companyInfo"]["daysID"].push(2);
    }
    if (this.blnTuesday) {
      dctData["companyInfo"]["daysID"].push(3);
    }
    if (this.blnWednesday) {
      dctData["companyInfo"]["daysID"].push(4);
    }
    if (this.blnThursday) {
      dctData["companyInfo"]["daysID"].push(5);
    }
    if (this.blnFriday) {
      dctData["companyInfo"]["daysID"].push(6);
    }
    if (this.blnSaturday) {
      dctData["companyInfo"]["daysID"].push(7);
    }
    this.lstBankDetails.forEach((element, index) => {
      let dict = {};
      dict["BankBranchID"] = element.bank;
      dict["BankAccountNo"] = element.acno;
      dict["CompanyID"] = null;
      //  dict['CompanyBankAccountID']= null;
      dctData["companyBankList"].push(dict);
    });

    this.serverService
      .postData("api/CompanyAPI/createCompany/", dctData)
      .subscribe((res: any[]) => {
        swal.fire("Success", "Data Saved Successfully", "success");
        this.router.navigate(["general-setting/company-info-list/"]);
      });
  }
  ownToggle() {}
  addBank() {
    this.lstBankDetails.push({ bank: "", acno: null });
  }
  deleteBank(index) {
    this.lstBankDetails.splice(index, 1);
  }
}
