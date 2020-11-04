import { Component, OnInit } from '@angular/core';
import { SocialloginService } from '../../../webservice/joinfree/sociallogin.service';
import { CountryService } from '../../../webservice/location/country.service';
import { ValidationService } from '../../../webservice/validation/validation.service';
import { NgxSpinnerService } from "ngx-spinner";
import { retry } from 'rxjs/operators'; 
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { enGbLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService, defineLocale, AlertComponent } from 'ngx-bootstrap';
import { RxwebValidators, fileSize } from '@rxweb/reactive-form-validators';
import Swal from 'sweetalert2';
import { retryWhen, delay, take } from 'rxjs/operators'
import * as $ from 'jquery';



@Component({
  selector: 'app-consumeraccountsetup',
  templateUrl: './consumeraccountsetup.component.html',
  styleUrls: ['./consumeraccountsetup.component.css']
})
export class ConsumeraccountsetupComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  public country = [];
  public states = [];
  public phonecode = [
    {
      "phonecode": "Ac",
      "country_codes": "IN"
    },

  ];
  public cities = [];
  public errorMsg;
  public isEnabled = false;
  public ismEnabled = false;
  public username;
  public iscEnabled = false;
  public iscEnabled1;
  public iscEnabled2;
  public iscEnabled3;
  public iscEnabled4;
  public iscEnabled5;
  public iscEnabled6;
  public showlogo;
  public stype;
  public sbutton;
  public tmp_files2 = [];
  public isEditenable;
  invalidPhoneLength: boolean;
  joinfree: any;
  invalidPhoneExist: boolean;
  invalidPhoneLength1: boolean;
  invalidPhoneExist1: boolean;
  invalidEmailExist: boolean;
  invalidEmailExist1: boolean;
  industry: any;
  induselect:boolean;
  industrytext: boolean;
  constructor(private localeService: BsLocaleService, private spinner: NgxSpinnerService, private cookieService: CookieService, private _countrymodel: CountryService, private router: Router, private location: Location, private fb: FormBuilder, private _validation: ValidationService, private SocialloginService: SocialloginService) {

  }
  ngOnInit() {
  this.induselect=true;
    
    this.invalidEmailExist1=false;
    this.invalidPhoneExist1=false;
    this.invalidPhoneLength1=false;
    $(document).ready(function (e) {

      //Define Defaults - Elements to be targets by user interaction/events
      var $defaults = {
        navigation: $('nav#navigation'), overlayDiv: $('#overlay'), menuTextIcons: $('.menu-text-icons'),
        menuText: $('.menu-text'), menuItemsContainer: $('.menu-items-container')
      }

      $defaults.menuItemsContainer.add($defaults.overlayDiv).fadeIn('slow');
      $defaults.menuTextIcons.addClass("effect-menu-text-icons");
      $defaults.menuText.addClass("effect-menu-text");
      e.stopPropagation();

    });
    enGbLocale.invalidDate = 'Select date';
    defineLocale('custom locale', enGbLocale);
    this.localeService.use('custom locale');
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        dateInputFormat: 'DD/MM/YYYY'
      });
    this._countrymodel.getCountrycode()
      .subscribe(data => this.country = data,
        error => this.errorMsg = error);
   
    if (this.cookieService.check('memberid') || this.cookieService.check('oauth')) {
     
      const formData = new FormData();

      formData.append('email', this.cookieService.get('memberid'));
      formData.append('cemail', this.cookieService.get('memberid'));
      formData.append('oauth', this.cookieService.get('oauth'));
      this.SocialloginService.getindustrytype(formData)
      .subscribe( (res: any) => {
        if (res.success) {
          this.industry=res.data;
        }
      });
      this.SocialloginService.getuserdata(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(
        (res: any) => {
          if (res.success) {
            console.log(res.success);
            const formData = new FormData();
            formData.append('cemail', this.cookieService.get('memberid'));
            formData.append('oauth', this.cookieService.get('oauth'));
            formData.append('statename',res.data[0].state);
            this.SocialloginService.getcitydata(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(data => this.cities = data ,
              error => this.errorMsg = error);
           
            this.contactdetails.patchValue(res.data[0]);
            this.username = res.data[0].name;
            if (res.data[0].email != "undefined" && res.data[0].email != "") {
              this.isEnabled = true;

            }
            if (res.data[0].mobile_no != "undefined" && res.data[0].mobile_no != "") {
              this.ismEnabled = true;
            }
            if (res.data[0].country != "" && res.data[0].country != "undefined") {
              const formData = new FormData();
              formData.append('country', res.data[0].country);
           
              this.SocialloginService.getstatedata(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(data => this.states = data,
                error => this.errorMsg = error); 
                

              this.SocialloginService.getphonecodedata(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(data => this.phonecode = data,
                error => this.errorMsg = error);
            }

          };
        }
      );

      this.SocialloginService.getusercompanydata(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response => {
          if (response.success) {
            this.companydetails.patchValue(response.data);
            if(response.data.industry_type!="Agriculture & Forestry/Wildlife" || response.data.industry_type!="Business & Information" || response.data.industry_type!="Construction/Utilities/Contracting" || response.data.industry_type!="Education" || response.data.industry_type!="Finance & Insurance" || response.data.industry_type!="Food & Hospitality" || response.data.industry_type!="Health Care" || response.data.industry_type!="Automobile" || response.data.industry_type!="Natural Resources/Environmental" || response.data.industry_type!="Real Estate & Housing" || response.data.industry_type!="Safety/Security & Legal" || response.data.industry_type!="Transportation" || response.data.industry_type!="Personal Services")
            {
              this.companydetails.patchValue({industry_type:"Others"});
                $("#industext").show();
                $("#industext").val(response.data.industry_type);
            }
            $('.imaglog').attr('src',response.data.company_logo);

           
            var fileName_Index = response.data.company_logo.lastIndexOf("/");
            var  fileName = response.data.company_logo.substr(fileName_Index);
            if(fileName.substr(1)!="")
            {
            $('#imgval').text(fileName.substr(1));
            }
         
            this.stype = "edit";
            this.sbutton = "Update";
            this.isEditenable = true;
            
            this.companydetails.patchValue({company_logo:fileName.substr(1)}); 
            this.imgsrc=fileName.substr(1);
            this.cookieService.set('companymode', "edit");
            for (var i = 0; i < response.data.jtype.length; i++) {

              if (response.data.jtype[i] == "all") {
                this.iscEnabled1 = true;
                this.iscEnabled=true;
                this.handleChecked('all', true);
              }
              if (response.data.jtype[i] == "buy") {
                this.iscEnabled2 = true;
                this.handleChecked('buy', true);
              }
              if (response.data.jtype[i] == "rent") {
                this.iscEnabled3 = true;
                this.handleChecked('rent', true);
              }
              if (response.data.jtype[i] == "sale") {
                this.iscEnabled4 = true;
                this.handleChecked('sale', true);
              }
              if (response.data.jtype[i] == "rfq/bidding") {
                this.iscEnabled5 = true;
                this.handleChecked('rfq/bidding', true);
              }
              if (response.data.jtype[i] == "joinfammposoclub") {
                this.iscEnabled6 = true;
                this.handleChecked('joinfammposoclub', true);
              }
            }
           

          }
          else {
            this.stype = "post";
            this.sbutton = "Confirm";
            this.isEditenable = false;
            this.cookieService.set('companymode', "post");
          }

        },
          error => console.error('error', error));


      this.SocialloginService.getusercompanydata(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe((res: any) => {
          console.log(res.data);
          this.documentsdetails.setControl('companycertificate', this.setCertificate(res.data.certificate));
       
         

        },
          error => console.error('error', error));
      this.SocialloginService.getusercompanydata(formData)
        .subscribe((res: any) => {
          this.invalidEmailExist1=false;
          this.invalidPhoneExist1=false;
          this.invalidPhoneLength1=false;
          this.invalidEmailExist=false;
          this.invalidPhoneExist=false;
          this.invalidPhoneLength=false;
          this.contactdetails.patchValue(res.data);
          const cert2 = res.data.certificate;
          var i = 0;
          cert2.forEach(s => {
            $(".images" + i).attr("href",s.certificatefile);
            $(".previmag" + i).show();
            var fileName_Index = s.certificatefile.lastIndexOf("/");
            var  fileName = s.certificatefile.substr(fileName_Index);
            $(".certificatefile" + i).html(fileName.substr(1));
            this.certfile.push(fileName.substr(1));
            $('#imgval' + i).text(fileName.substr(1));
            i = i + 1;
          });


        },
          error => console.error('error', error));
      this.SocialloginService.getusercompanydata(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe((res: any) => {
          this.additionaldetails.setControl('field', this.setadditionalfield(res.data.additional_fields));
        },
          error => console.error('error', error));


    }
    else {
      this.router.navigate(["register", "login"]);
    }
   
  }
  companydetails = this.fb.group({
    jtype: this.fb.array([]),
    Referral_code: [''],
    company_name: ['', Validators.required],
    company_reg_no: ['', Validators.required],
    annual_revenue: [''],
    Inauguration_year: [''],
    manpower: [''],
    company_logo: ['', [ValidationService.fileValidator, RxwebValidators.fileSize({ maxSize: 25000 })]],
    business_type: [''],
    industry_type: [''],
    industry_type1: [''],
    product_name: [''],
    product_details: [''],
  }, { validator: [ValidationService.referralcodecheck, ValidationService.companyregvalidator, ValidationService.companynamevalidator] });
  contactdetails = this.fb.group({
    contact_person_name: ['', Validators.required],
    address1: ['', Validators.required],
    address2: [''],
    country: ['', Validators.required],
    countrycode: [''],
    state: [''],
    city: [''],
    postal_code: [''],
    alternate_mobile_no: ['', [ValidationService.numberValidator]],
    mobile_no: ['', [Validators.required, ValidationService.numberValidator]],
    phonecodes: [''],
    email: ['', [Validators.required, ValidationService.emailValidator]],
    alternate_email: ['', [ValidationService.emailValidator]],
  }, { validator: [ValidationService.samemobilenoValidator, ValidationService.sameemailValidator] });
  documentsdetails = this.fb.group({
    companycertificate: this.fb.array([this.initcertificateRows()])
  });
  additionaldetails = this.fb.group({
    field: this.fb.array([this.initnewRows()])
  });

  initnewRows(): FormGroup {
    return this.fb.group({
      title: ['',Validators.required],
      value: ['',Validators.required],
    });
  }

  initcertificateRows(): FormGroup {
    return this.fb.group({
      certificateName: ['',Validators.required],
      certificatefile: ['', [Validators.required, ValidationService.fileValidator, , RxwebValidators.fileSize({ maxSize: 4000000 })]],
      images: [''],
    });
  }
  addNewRow() {
    this.formArr.push(this.initcertificateRows());
  }
  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }
  addfieldRow() {
    this.formArray.push(this.initnewRows());
  }
  deletefieldRow(index: number) {
    this.formArray.removeAt(index);
  }
  otherindustry(event:any)
  {
    const selectEl = event.target;
    const val = selectEl.options[selectEl.selectedIndex].getAttribute('data-somedata');
    if(val=='others')
    {
           
           $("#industext").show();
    }
    else
    {
      $("#industext").hide();
    }
           
  }
  get formArray() {
    return this.additionaldetails.get('field') as FormArray;
  }
  get formArr() {
    return this.documentsdetails.get('companycertificate') as FormArray;
  }
  setCertificate(cert: any[]): FormArray {
    const formArray = new FormArray([]);

    cert.forEach(s => {
      var fileName_Index =  s.certificatefile.lastIndexOf("/");
      var  fileName =  s.certificatefile.substr(fileName_Index);
      formArray.push(this.fb.group({
        certificateName:[s.certificateName,Validators.required],
        certificatefile:[fileName.substr(1),Validators.required],
      })
      );

    });
    return formArray;

  }
  setadditionalfield(addfield: any[]): FormArray {
    const formArray = new FormArray([]);
    addfield.forEach(s => {
      formArray.push(this.fb.group({
        title:[s.title,Validators.required],
        value:[s.value,Validators.required],

      })
      );
    });
    return formArray;
  }
  tab1(data: any, nav: any) {

    let bool;
    if (nav == "nxt") {
      if (data == "companydetails") {
        this.companydetails.markAllAsTouched();
        bool = this.companydetails.valid;
      }
      else if (data == "contactdetails") {
        this.contactdetails.markAllAsTouched();
        bool = this.contactdetails.valid;
      }
      else if (data == "documentsdetails") {
        this.documentsdetails.markAllAsTouched();
        bool = this.documentsdetails.valid;
      }
      else {
        this.additionaldetails.markAllAsTouched();
        bool = this.additionaldetails.valid;
      }
    }
    else {
      bool = true;
    }


    if (bool) {
      $("#company-tab").addClass("active show");
      $("#contact-tab").removeClass("active show");
      $("#document-tab").removeClass("active show")
      $("#additional-tab").removeClass("active show");
      $("#company-details").addClass("active show");
      $("#contact-details").removeClass("active show");
      $("#document-details").removeClass("active show");
      $("#additional-details").removeClass("active show");
    }
  }
  tab2(data: any, nav: any) {

    let bool2;
    if (nav == "nxt") {
      if (data == "companydetails") {
        this.companydetails.markAllAsTouched();
        bool2 = this.companydetails.valid;
      }
      else if (data == "contactdetails") {
        this.contactdetails.markAllAsTouched();
        bool2 = this.contactdetails.valid;
      }
      else if (data == "documentsdetails") {
        this.documentsdetails.markAllAsTouched();
        bool2 = this.documentsdetails.valid;
      }
      else {
        this.additionaldetails.markAllAsTouched();
        bool2 = this.additionaldetails.valid;
      }
    }
    else {
      bool2 = true;
    }

    if (bool2) {
      $("#company-tab").removeClass("active show");
      $("#contact-tab").addClass("active show");
      $("#document-tab").removeClass("active show")
      $("#additional-tab").removeClass("active show");
      $("#company-details").removeClass("active show");
      $("#contact-details").addClass("active show");
      $("#document-details").removeClass("active show");
      $("#additional-details").removeClass("active show");
    }
  }
  tab3(data: any, nav: any) {
    let bool3;
    if (nav == "nxt") {
      if (data == "companydetails") {
        this.companydetails.markAllAsTouched();
        bool3 = this.companydetails.valid;
      }
      else if (data == "contactdetails") {
        this.contactdetails.markAllAsTouched();
        bool3 = this.contactdetails.valid;
      }
      else if (data == "documentsdetails") {
        this.documentsdetails.markAllAsTouched();
        bool3 = this.documentsdetails.valid;
      }
      else {
        this.additionaldetails.markAllAsTouched();
        bool3 = this.additionaldetails.valid;
      }
    }
    else {
      bool3 = true;
    }
    if (bool3) {

      $("#company-tab").removeClass("active show");
      $("#contact-tab").removeClass("active show");
      $("#document-tab").addClass("active show")
      $("#additional-tab").removeClass("active show");
      $("#company-details").removeClass("active show");
      $("#contact-details").removeClass("active show");
      $("#document-details").addClass("active show");
      $("#additional-details").removeClass("active show");
    }

  }
  tab4(data: any, nav: any) {
    let bool4;
    if (nav == "nxt") {
      if (data == "companydetails") {
        this.companydetails.markAllAsTouched();
        bool4 = this.companydetails.valid;
      }
      else if (data == "contactdetails") {
        this.contactdetails.markAllAsTouched();
        bool4 = this.contactdetails.valid;
      }
      else if (data == "documentsdetails") {
        this.documentsdetails.markAllAsTouched();
        bool4 = this.documentsdetails.valid;
      }
      else {
        this.additionaldetails.markAllAsTouched();
        bool4 = this.additionaldetails.valid;
      }
    }
    else {
      bool4 = false;
    }
    if (bool4) {


      $("#company-tab").removeClass("active show");
      $("#contact-tab").removeClass("active show");
      $("#document-tab").removeClass("active show")
      $("#additional-tab").addClass("active show");
      $("#company-details").removeClass("active show");
      $("#contact-details").removeClass("active show");
      $("#document-details").removeClass("active show");
      $("#additional-details").addClass("active show");
    }
  }

  handleSelected($event) {
    const jtFormArray = <FormArray>this.companydetails.controls.jtype;
    if ($event.target.checked === true) {

      this.iscEnabled = true;

      jtFormArray.push(new FormControl("all"));
      jtFormArray.push(new FormControl("buy"));
      jtFormArray.push(new FormControl("rent"));
      jtFormArray.push(new FormControl("sale"));
      jtFormArray.push(new FormControl("rfq/bidding"));
      jtFormArray.push(new FormControl("joinfamposoclub"));
    }
    else {
      this.iscEnabled = false;
      let index1 = jtFormArray.controls.findIndex(x => x.value == "all")
      jtFormArray.removeAt(index1);
      let index2 = jtFormArray.controls.findIndex(x => x.value == "buy")
      jtFormArray.removeAt(index2);
      let index3 = jtFormArray.controls.findIndex(x => x.value == "rent")
      jtFormArray.removeAt(index3);
      let index4 = jtFormArray.controls.findIndex(x => x.value == "sale")
      jtFormArray.removeAt(index4);
      let index5 = jtFormArray.controls.findIndex(x => x.value == "rfq/bidding")
      jtFormArray.removeAt(index5);
      let index6 = jtFormArray.controls.findIndex(x => x.value == "joinfamposoclub")
      jtFormArray.removeAt(index6);

    }
  }

  handleChecked(jointypes: string,isChecked) {
   
      
   
    const jtFormArray = <FormArray>this.companydetails.controls.jtype;
 
    if (isChecked.target.checked) {
      console.log(jtFormArray);
     if(jointypes=="all")
     {
        this.iscEnabled=true;
     }
     else
     {
      this.iscEnabled1=false;
      this.iscEnabled=false;
     }
      jtFormArray.push(new FormControl(jointypes));


    } else {
      if(jointypes=="all")
      {
          this.iscEnabled1=false;
         this.iscEnabled=false;
      }
      else
      {
        $("#select-all").prop("checked", false);
        this.iscEnabled1=false;
        this.iscEnabled=false;
      }
      console.log(jtFormArray);
      let index = jtFormArray.controls.findIndex(x => x.value == jointypes)
      jtFormArray.removeAt(index);

    }
  }
  phonevalidation1()
  {
    if (this.contactdetails.value.countrycode != "" && this.contactdetails.value.mobile_no != "") {
      const formData = new FormData();
      formData.append('phone_number', this.contactdetails.value.mobile_no);
      formData.append('country_code', this.contactdetails.value.countrycode);

      this.SocialloginService.phonelengthvalidator(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response => {
        if (response.success) {
          this.invalidPhoneLength = false;
          const formData = new FormData();
          formData.append('cemail',this.cookieService.get('memberid'));
          formData.append('oauth',this.cookieService.get('oauth'));
          formData.append('mobile_no', this.contactdetails.value.mobile_no);
          this.SocialloginService.mobilexist(formData).subscribe(response => {
            if (response.success) {
              this.invalidPhoneExist = false;
            }
            else {
              this.invalidPhoneExist = true;
            }
          }, error => console.error('error', error));
        }
        else {
          this.invalidPhoneLength = true;
          
        }
      }, error => console.error('error', error));
    }
  }
  phonevalidation2()
  {
    if (this.contactdetails.value.countrycode != "" && this.contactdetails.value.alternate_mobile_no != "") {
      const formData = new FormData();
      formData.append('phone_number', this.contactdetails.value.alternate_mobile_no);
      formData.append('country_code', this.contactdetails.value.countrycode);

      this.SocialloginService.phonelengthvalidator(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response => {
        if (response.success) {
          this.invalidPhoneLength1 = false;
          const formData = new FormData();
          formData.append('mobile_no', this.contactdetails.value.alternate_mobile_no);
          this.SocialloginService.mobilexist(formData).subscribe(response => {
            if (response.success) {
              this.invalidPhoneExist1 = false;
            }
            else {
              this.invalidPhoneExist1 = true;
            }
          }, error => console.error('error', error));
        }
        else {
          this.invalidPhoneLength1 = true;
          
        }
      }, error => console.error('error', error));
    }
  }
  emailvalidation1()
  {
    if (this.contactdetails.value.email != "") {
      const formData = new FormData();
      formData.append('email', this.contactdetails.value.email);
      formData.append('cemail',this.cookieService.get('memberid'));
      formData.append('oauth',this.cookieService.get('oauth'));
      this.SocialloginService.emailexist(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response => {
        if (response.success) {
          this.invalidEmailExist = false;
        }
        else {
          this.invalidEmailExist = true;
        }
      }, error => console.error('error', error));
    }
  }
  emailvalidation2()
  {
    if (this.contactdetails.value.alternate_email != "") {
      const formData = new FormData();
      formData.append('email', this.contactdetails.value.alternate_email);
  
      this.SocialloginService.emailexist(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(response => {
        if (response.success) {
          this.invalidEmailExist1 = false;
        }
        else {
          this.invalidEmailExist1 = true;
        }
      }, error => console.error('error', error));
    }
  }

  selectedcountry: string = '';
  selectedstates: string = '';
  selectChangeCountry(event: any) {
    this.selectedcountry = event.target.value;
    const selectEl = event.target;
    const val = selectEl.options[selectEl.selectedIndex].getAttribute('data-somedata');
    this._countrymodel.getStates(val).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(data => this.states = data,
        error => this.errorMsg = error);
    this._countrymodel.getCode(val).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(data => this.phonecode = data,
        error => this.errorMsg = error);
  }
  selectChangeStates(event: any) {
    this.selectedstates = event.target.value;
    const selectEl = event.target;
    const val = selectEl.options[selectEl.selectedIndex].getAttribute('data-somedata');
    this._countrymodel.getCity(val).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(data => this.cities = data,
        error => this.errorMsg = error);
  }
  logout() {
    this.cookieService.delete('memberid');
    this.cookieService.delete('password');
    this.cookieService.delete('oauth');
    this.cookieService.delete('remember');
    localStorage.removeItem('token');
    $("#signedin").show();
    $("#loggedin").hide();
    $("#cartcount").html("0");
    this.router.navigate(["register", "login"]);
  }
  tmp_files: File[] = [];
  public imgsrc;
  onSelectedlogo(event, index) {
    //  this.imgsrc=event.target.files;
    this.tmp_files.push(event.target.files);
    this.imgsrc = event.target.files[0].name;
    var reader = new FileReader();
    $('#imgval').text(event.target.files[0].name);
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      console.log(reader.result);
      $('.imaglog').attr('src', reader.result);
    }
  }
  logofile() {
    $("#companylo").trigger('click');
  }
  logofil(index) {
    $("#certificatefile" + index).trigger('click');
  }
  public certfile = [];
  onSelectedFile(event, index) {
    this.tmp_files.push(event.target.files);
    var fileName = event.target.files[0].name;

    this.certfile.push(fileName);
    $('#imgval' + index).text(event.target.files[0].name);
    $(".certificatefile" + index).html(fileName);
    var reader = new FileReader();
    
    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      console.log(reader.result);
     $('.images' + index).attr("href",reader.result);
      $('.previmag' + index).show();
      
    }
  }
  completeregistration() {


    var companyindate = (new Date(this.companydetails.value.Inauguration_year)).toLocaleDateString();

    this.companydetails.markAllAsTouched();

    if (this.companydetails.valid) {
      this.contactdetails.markAllAsTouched();

      if (this.contactdetails.valid && this.invalidPhoneExist == false && this.invalidPhoneLength == false && this.invalidEmailExist == false && this.invalidPhoneExist1 == false && this.invalidPhoneLength1 == false && this.invalidEmailExist1 == false) {
        this.documentsdetails.markAllAsTouched();
        if (this.documentsdetails.valid) {
          for (let i = 0; i < this.tmp_files.length; i++) {
            const formData = new FormData();
            formData.append('Imagefile', this.tmp_files[i][0]);
            formData.append('dirname', this.companydetails.value.company_reg_no);
            this.SocialloginService.uploadImage(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe((res: any) => {
              if (res.success == false) {

              }
            });
          }
          this.additionaldetails.markAllAsTouched();
          if (this.additionaldetails.valid) {
            const newcertjson = [];
            const cert3 = this.documentsdetails.value.companycertificate;
            if (this.stype == "post") {
            var i = 0;
            cert3.forEach(s => {
              newcertjson.push({
                certificateName: s.certificateName,
                certificatefile: this.certfile[i],
                
              });
             
              i = i + 1;
            });
          }
          else
          {

            cert3.forEach(s => {
              var path =s.certificatefile;
              var filename = path.replace(/^.*\\/, "");
              console.log(filename);
              newcertjson.push({
                certificateName: s.certificateName,
                certificatefile: filename,
                
              });
             
              i = i + 1;
            });

          }
        
            const formData = new FormData();
            formData.append('cemail', this.cookieService.get('memberid'));
            formData.append('oauth', this.cookieService.get('oauth'));
            formData.append('jtype', JSON.stringify(this.companydetails.value.jtype));
            formData.append('referral_code', this.companydetails.value.Referral_code);
            formData.append('company_name', this.companydetails.value.company_name);
            formData.append('company_reg_no', this.companydetails.value.company_reg_no);
            formData.append('annual_revenue', this.companydetails.value.annual_revenue);
            formData.append('Inauguration_year', companyindate);
            formData.append('manpower', this.companydetails.value.manpower);
            formData.append('company_logo', this.imgsrc);
            formData.append('business_type', this.companydetails.value.business_type);
            if(this.companydetails.value.industry_type=="Others")
            {
              formData.append('industry_type', this.companydetails.value.industry_type1);
            }
            else
            {
              formData.append('industry_type', this.companydetails.value.industry_type);
            }
            formData.append('product_name', this.companydetails.value.product_name);
            formData.append('product_details', this.companydetails.value.product_details);
            formData.append('contact_person_name', this.contactdetails.value.contact_person_name);
            formData.append('address1', this.contactdetails.value.address1);
            formData.append('address2', this.contactdetails.value.address2);
            formData.append('country', this.contactdetails.value.country);
            formData.append('countrycode', this.contactdetails.value.countrycode);
            formData.append('state', this.contactdetails.value.state);
            formData.append('city', this.contactdetails.value.city);
            formData.append('postal_code', this.contactdetails.value.postal_code);
            formData.append('alternate_mobile_no', this.contactdetails.value.alternate_mobile_no);
            formData.append('mobile_no', this.contactdetails.value.mobile_no);
            formData.append('phonecodes', this.contactdetails.value.phonecodes);
            formData.append('email', this.contactdetails.value.email);
            formData.append('alternate_email', this.contactdetails.value.alternate_email);
            formData.append('companydocuments', JSON.stringify(newcertjson));
            formData.append('dirname', this.companydetails.value.company_reg_no);
            formData.append('additionalfields', JSON.stringify(this.additionaldetails.value.field));
            this.spinner.show();
            if (this.stype == "post") {
              this.SocialloginService.consumeraccountsetup(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(
                (res: any) => {
                  if (res.success) {
                    this.spinner.hide();

                    Swal.fire({
                      title: 'Company details received successfully!',
                      titleText: 'Company details received successfully!\n Reference_no   ' + res.reference_no + '\n Thank you',
                      width: 600,
                      allowOutsideClick: false,
                    }).then((result) => {
                      if (result.value) {
                        this.router.navigate(['home']);
                      }
                    })

                  }
                  else {
                    Swal.fire("Unable to process your request");
                  }
                }
              );
            }
            else {
              this.SocialloginService.consumeraccountupdate(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(
                (res: any) => {
                  this.spinner.hide();
                  if (res.success) {

                    Swal.fire({
                      allowOutsideClick: false,
                      title: 'Given Details are Updated successfully  \n Thank you',
                      width: 600,
                    }).then((result) => {
                      if (result.value) {
                        this.router.navigate(['home']);
                      }
                    })

                  }
                  else {
                    Swal.fire("Unable to process your request");
                  }
                }
              );
            }
          }
          else {
            Swal.fire({
              allowOutsideClick: false,
              title: 'Error in additional details form',
              width: 600,
            }).then((result) => {
              if (result.value) {
                $("#company-tab").removeClass("active show");
                $("#contact-tab").removeClass("active show");
                $("#document-tab").removeClass("active show")
                $("#additional-tab").addClass("active show");
                $("#company-details").removeClass("active show");
                $("#contact-details").removeClass("active show");
                $("#document-details").removeClass("active show");
                $("#additional-details").addClass("active show");
              }
            })

          }
        }
        else {
          Swal.fire({
            allowOutsideClick: false,
            title: 'Error in document details form',
            width: 600,
          }).then((result) => {
            if (result.value) {
              $("#company-tab").removeClass("active show");
              $("#contact-tab").removeClass("active show");
              $("#document-tab").addClass("active show")
              $("#additional-tab").removeClass("active show");
              $("#company-details").removeClass("active show");
              $("#contact-details").removeClass("active show");
              $("#document-details").addClass("active show");
              $("#additional-details").removeClass("active show");
            }
          })
        }
      }
      else {
        Swal.fire({
          allowOutsideClick: false,
          title: 'Error in contact details form',
          width: 600,
        }).then((result) => {
          if (result.value) {
            $("#company-tab").removeClass("active show");
            $("#contact-tab").addClass("active show");
            $("#document-tab").removeClass("active show")
            $("#additional-tab").removeClass("active show");
            $("#company-details").removeClass("active show");
            $("#contact-details").addClass("active show");
            $("#document-details").removeClass("active show");
            $("#additional-details").removeClass("active show");
          }
        })
      }

    }
    else {
      Swal.fire({
        allowOutsideClick: false,
        title: 'Error in company details form',
        width: 600,
      }).then((result) => {
        if (result.value) {
          $("#company-tab").addClass("active show");
          $("#contact-tab").removeClass("active show");
          $("#document-tab").removeClass("active show")
          $("#additional-tab").removeClass("active show");
          $("#company-details").addClass("active show");
          $("#contact-details").removeClass("active show");
          $("#document-details").removeClass("active show");
          $("#additional-details").removeClass("active show");
        }
      })
    }
  }
  updateregistration() {

  }
}
