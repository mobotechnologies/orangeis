import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../webservice/validation/validation.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { SocialloginService } from '../../../webservice/joinfree/sociallogin.service';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import { retryWhen, delay, take } from 'rxjs/operators'

@Component({
  selector: 'app-financesuppport',
  templateUrl: './financesuppport.component.html',
  styleUrls: ['./financesuppport.component.css']
})
export class FinancesuppportComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private cookieService: CookieService,private router: Router,private fb: FormBuilder, private _validation: ValidationService,private SocialloginService: SocialloginService) { }

  ngOnInit() {
    const formData = new FormData();
    formData.append('email', this.cookieService.get('memberid'));
    formData.append('cemail', this.cookieService.get('memberid'));
    formData.append('oauth', this.cookieService.get('oauth'));
    this.SocialloginService.getusercompanydata(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe((res: any) =>{
        if (res.success) {
            $('.imaglog').attr('src',res.data.company_logo);
            this.companydetails.patchValue(res.data);
            this.imgsrc = res.data.company_logo;
            var fileName_Index = res.data.company_logo.lastIndexOf("/");
            var  fileName = res.data.company_logo.substr(fileName_Index);
            $('#imgval').text(fileName.substr(1));
            this.companydetails.patchValue({company_logo:fileName.substr(1)});
        }
        else
        {
          Swal.fire({
            title: '',
            titleText:'Your company is not linked to famposo account',
            width: 600,
            allowOutsideClick:false,
                                    }).then((result) => {
                  if(result.value)
                  {
                    this.router.navigate(['consumeraccountsetup']); 
                  }
          })
        }
     },
      error=>console.error('error',error));
  }
  companydetails = this.fb.group({
    Referral_code: [''],
    company_name: [''],
    company_reg_no: [''],
    annual_revenue: [''],
    Inauguration_year: [''],
    manpower: [''],
    company_logo: ['', [ValidationService.fileValidator, RxwebValidators.fileSize({ maxSize: 25000 })]],
 
  });
  financialform = this.fb.group({
    jtype: this.fb.array([]),
 
  });
documentsdetails = this.fb.group({
    companycertificate: this.fb.array([this.initcertificateRows()])
  });
additionaldetails = this.fb.group({
    field: this.fb.array([this.initnewRows()])
  });
  initnewRows(): FormGroup {
    return this.fb.group({
      title: [''],
      value: [''],
    });
  }

  initcertificateRows(): FormGroup {
    return this.fb.group({
      certificateName: ['', [Validators.required]],
      certificatefile: ['', [Validators.required, ValidationService.fileValidator, , RxwebValidators.fileSize({ maxSize: 4000000 }), RxwebValidators.file({ minFiles: 1 })]],
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
  get formArray() {
    return this.additionaldetails.get('field') as FormArray;
  }
  get formArr() {
    return this.documentsdetails.get('companycertificate') as FormArray;
  }
  tab1(data: any,nav:any) {
  
    let bool;
    if(nav=="nxt")
    {
        if (data == "financialform") {
          this.financialform.markAllAsTouched();
          bool = this.financialform.valid;
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
    else
    {
         bool=true;
    }
    if(bool)
    {
          $("#finance-tab").addClass("active show");
          $("#document-tab").removeClass("active show")
          $("#additional-tab").removeClass("active show");
          $("#finance-details").addClass("active show");
          $("#document-details").removeClass("active show")
          $("#additional-details").removeClass("active show");
    }
    else
    {
      if (data == "financialform") {
        Swal.fire("Select a financial type");
      }
    }
    
  }
  tab2(data: any,nav:any) {
    let bool;
    if(nav=="nxt")
    {
        if (data == "financialform") {
          this.financialform.markAllAsTouched();
          if(this.financialform.value.jtype!="")
          {
            bool=true;
          }
          else
          {
            bool=false;
          }
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
    else
    {
         bool=true;
    }
    if(bool)
    {
        $("#finance-tab").removeClass("active show");
        $("#document-tab").addClass("active show")
        $("#additional-tab").removeClass("active show");
        $("#finance-details").removeClass("active show");
        $("#document-details").addClass("active show")
        $("#additional-details").removeClass("active show");
    }
    else
    {
        
      if (data == "financialform") {
        Swal.fire("Select a financial type");
      }
    }
   
  
}
tab3(data: any,nav:any) {
  let bool;
  if(nav=="nxt")
  {
      if (data == "financialform") {
        this.financialform.markAllAsTouched();
        bool = this.financialform.valid;
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
  else
  {
       bool=true;
  }
 if(bool)
 {
  $("#finance-tab").removeClass("active show");
  $("#document-tab").removeClass("active show")
  $("#additional-tab").addClass("active show");
  $("#finance-details").removeClass("active show");
  $("#document-details").removeClass("active show")
  $("#additional-details").addClass("active show");
 }
 else
 {
  if (data == "financialform") {
    Swal.fire("Select a financial type");
  }
 }

}
  handleChecked(jointypes: string, isChecked: boolean) {
    const jtFormArray = <FormArray>this.financialform.controls.jtype;

    if (isChecked) {

      jtFormArray.push(new FormControl(jointypes));


    } else {
      let index = jtFormArray.controls.findIndex(x => x.value == jointypes)
      jtFormArray.removeAt(index);

    }
  }
  tmp_files: File[] = [];
  tmp_files2: File[] = [];
  public imgsrc;
  public finname=[];
  onSelectedlogo(event,index) {
    //  this.imgsrc=event.target.files;
    this.tmp_files.push(event.target.files);
    this.imgsrc = event.target.files[0].name;
    $('#imgval').text( event.target.files[0].name);
      var reader = new FileReader(); 
     reader.readAsDataURL(event.target.files[0]); // read file as data url
     reader.onload = (event) => { // called once readAsDataURL is completed
          console.log(reader.result);
          $('.imaglog').attr('src', reader.result);
       }
   }
  onSelectedFile(event,index) {
    this.tmp_files2.push(event.target.files);
    var fileName = event.target.files[0].name;
    $(".certificatefile"+index).html(fileName );
    this.finname.push(fileName);
    $('#imgval'+index).text( event.target.files[0].name);
     var reader = new FileReader();
     
    reader.readAsDataURL(event.target.files[0]); // read file as data url
  
   reader.onload = (event) => { // called once readAsDataURL is completed
         console.log(reader.result);
         $('.images'+index).attr('src', reader.result);
      }
  }
  logofile()
  {
    $("#companylo").trigger('click');
  }
  logofil(index)
  {
    $("#certificatefile"+index).trigger('click');
  }
  completeregistration()
  {
   
    this.cookieService.set('companymode',"edit");
    this.companydetails.markAllAsTouched();
    if (this.companydetails.valid) {     
          for (let i = 0; i < this.tmp_files.length; i++) {
            const formData = new FormData();
            formData.append('Imagefile', this.tmp_files[i][0]);
            formData.append('dirname',this.companydetails.value.company_reg_no);
          this.SocialloginService.uploadImage(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe((res: any) => {
              if (res.success == false) {

              }
            });
          }
          for (let i = 0; i < this.tmp_files2.length; i++) {
            const formData = new FormData();
            formData.append('findoc', this.tmp_files2[i][0]);
            formData.append('dirname',this.companydetails.value.company_reg_no);
           this.SocialloginService.uploadfinImage(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe((res: any) => {
              if (res.success == false) {

              }
            });
          }
          const newcertjson=[];
          const cert3=this.documentsdetails.value.companycertificate;
          var  i=0;
          cert3.forEach(s => {
           newcertjson.push({
             certificateName: s.certificateName,
             certificatefile: this.finname[i],
             });
             i=i+1;
         });
          const formData = new FormData();
          formData.append('cemail', this.cookieService.get('memberid'));
          formData.append('oauth', this.cookieService.get('oauth'));
          formData.append('jtype', JSON.stringify(this.companydetails.value.jtype));
          formData.append('referral_code', this.companydetails.value.Referral_code);
          formData.append('company_name', this.companydetails.value.company_name);
          formData.append('company_reg_no', this.companydetails.value.company_reg_no);
          formData.append('annual_revenue', this.companydetails.value.annual_revenue);
          formData.append('Inauguration_year', this.companydetails.value.Inauguration_year);
          formData.append('manpower', this.companydetails.value.manpower);
          formData.append('company_logo', this.imgsrc);
          formData.append('finance_type',  JSON.stringify(this.financialform.value.jtype));
          formData.append('companydocuments', JSON.stringify(newcertjson));
          formData.append('dirname',this.companydetails.value.company_reg_no);
          formData.append('additionalfields', JSON.stringify(this.additionaldetails.value.field));
          
          this.spinner.show();
          this.SocialloginService.consumeraccountupdate(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(
            (res: any) => {
              if (res.success) {
                this.SocialloginService.financesetup(formData).pipe(retryWhen(errors => errors.pipe(delay(1000), take(10)))).subscribe(
                  (res: any) => {$('#moclose').trigger('click');this.spinner.hide();
                    if (res.success) {
                            
                              Swal.fire({
                                title: 'Financial requirement received successfully !',
                                titleText:'Financial requirement received successfully  !\n Reference_no   '+res.reference_no+'\n We have sent a confirmation to your given email \n Thank you',
                                width: 600,
                                allowOutsideClick:false,
                                                        }).then((result) => {
                            if(result.value)
                            {

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
                Swal.fire("Unable to process your request");
              }
            }
          );
    }
  }
  triggermodal()
  {
    if(this.financialform.value.jtype!="")
    {
         if(this.documentsdetails.valid)
         {
             if(this.additionaldetails.valid)
             {
                
                $('#mopen').trigger('click');
             }
             else
             {

                      Swal.fire({
                        allowOutsideClick: false,
                        title: 'Error in additional details form',
                        width: 600,
                      }).then((result) => {
                        if (result.value) {
                          $("#finance-tab").removeClass("active show");
                          $("#document-tab").removeClass("active show")
                          $("#additional-tab").addClass("active show");
                          $("#finance-details").removeClass("active show");
                          $("#document-details").removeClass("active show")
                          $("#additional-details").addClass("active show");
                        }
                      })
               
             }
         }
         else
         {
              Swal.fire({
                allowOutsideClick: false,
                title: 'Error in documment details form',
                width: 600,
              }).then((result) => {
                if (result.value) {
                  $("#finance-tab").removeClass("active show");
                  $("#document-tab").addClass("active show")
                  $("#additional-tab").removeClass("active show");
                  $("#finance-details").removeClass("active show");
                  $("#document-details").addClass("active show")
                  $("#additional-details").removeClass("active show");
                }
              })
            
         }
    }
    else
    {


      Swal.fire({
        allowOutsideClick: false,
        title: 'choose a finance type',
        width: 600,
      }).then((result) => {
        if (result.value) {
          $("#finance-tab").addClass("active show");
          $("#document-tab").removeClass("active show")
          $("#additional-tab").removeClass("active show");
          $("#finance-details").addClass("active show");
          $("#document-details").removeClass("active show")
          $("#additional-details").removeClass("active show");
        }
      })
       
    }

  }
}
