import { Component, OnInit,EventEmitter,Output,NgZone} from '@angular/core';
import { CategoryService } from '../../../webservice/category/category.service';
import { ProductserviceService } from '../../../webservice/product/productservice.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
declare const annyang: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output()
  menuClicked: EventEmitter<string>=new EventEmitter<string>();
   public category=[];
   public subcategory=[];
  errorMsg: any;
  islogged: boolean;
  user: string;
  voiceActiveSectionDisabled: boolean = true;
	voiceActiveSectionError: boolean = false;
	voiceActiveSectionSuccess: boolean = false;
	voiceActiveSectionListening: boolean = false;
	voiceText: any;
  
  constructor(private _category:CategoryService,private ngZone: NgZone,private productService: ProductserviceService,private cookieService: CookieService,private router: Router) { 
   
  }
   
  ngOnInit() {
    
     this._category.getcategory().subscribe(res=>this.category=res.data,
      error => this.errorMsg = error);
     this._category.getsubcategory().subscribe(res=>this.subcategory=res.data ,
      error => this.errorMsg = error);
      if (this.cookieService.check('memberid') || this.cookieService.check('oauth')) 
      {

        const formData = new FormData();
        formData.append('cemail', this.cookieService.get('memberid'));
        formData.append('oauth', this.cookieService.get('oauth'));
        this.user=this.cookieService.get('name');
        $("#signedin").hide();
        $("#loggedin").show();
        this.productService.getcart(formData).subscribe(response=>{
          if(response.success)
          {
              this.islogged=false;

               $("#cartcount").html(response.data.cartcount);
          }
        
          },error=>console.error('error',error)); 
      }
      else
      {
        $("#signedin").show();
        $("#loggedin").hide();
      }
     
  }
  
	initializeVoiceRecognitionCallback(): void {
		annyang.addCallback('error', (err) => {
      if(err.error === 'network'){
       
        $("#search-input").val("No internet");
        annyang.abort();
        this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
      } else if (this.voiceText === undefined) {
				this.ngZone.run(() => $("#search-input").val("Didn't catch that"));
				annyang.abort();
			}
		});

		annyang.addCallback('soundstart', (res) => {
      this.ngZone.run(() => this.voiceActiveSectionListening = true);
		});

		annyang.addCallback('end', () => {
      if (this.voiceText === undefined) {
        this.ngZone.run(() => this.voiceActiveSectionError = true);
				annyang.abort();
			}
		});

		annyang.addCallback('result', (userSaid) => {
			this.ngZone.run(() => this.voiceActiveSectionError = false);

			let queryText: any = userSaid[0];

			annyang.abort();

      this.voiceText = queryText;
      $("#search-input").val(queryText);
      this.router.navigate(['productlisting'], { state: {category:$("#category").val(),subcategory:$("#subategory").val(),search:queryText} });

			this.ngZone.run(() => this.voiceActiveSectionListening = false);
      this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
		});
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
  selectcategory(event: any)
  {
    const formData = new FormData();
    formData.append('category_id',$("#category").val());
    this._category.getsubcategoryfilter(formData).subscribe(response=>{
      
      this.subcategory=response.data;
    
  

  },error=>console.error('error',error));
    
  }
  selectsubcategory(event: any)
  {
  
     
  
  //  this.router.navigate(['productlisting'], { state: {category:$("#category").val(),subcategory:$("#subategory").val(),search:$("#search-input").val()} });
  }
  search()
  {
    this.router.navigate(['productlisting'], { state: {category:$("#category").val(),subcategory:$("#subategory").val(),search:$("#search-input").val()} });
  
    
  }
  onSearchChange()
  {  
    this.router.navigate(['productlisting'], { state: {category:$("#category").val(),subcategory:$("#subategory").val(),search:$("#search-input").val()} });
  }
  menu(cat,subcat)
  {
    if(cat!="")
    {
        $(".menu-cdata").val(cat);
        $(".menu-cdata").show();
        $(".menu-sdata").hide();
    }
    else
    {
      $(".menu-cdata").hide();
    }
    if(subcat!="")
    {
       $(".menu-sdata").val(subcat);
       $(".menu-sdata").show();
    }
    else
    {
      $(".menu-sdata").hide();
    }
    this.router.navigate(['contactus'], { state: {category:cat,subcategory:subcat} });
    
    
  }
  contactcs()
  {
       $(".menu-cdata").hide();
       $(".menu-sdata").hide();
       this.router.navigate(['contactus']);
  }
  startVoiceRecognition(): void {
    $("#search-input").val("Listening.....");
    this.voiceActiveSectionDisabled = false;
		this.voiceActiveSectionError = false;
		this.voiceActiveSectionSuccess = false;
    this.voiceText = undefined;

		if (annyang) {
			let commands = {
				'demo-annyang': () => { }
			};

			annyang.addCommands(commands);

      this.initializeVoiceRecognitionCallback();

			annyang.start({ autoRestart: false });
		}
	}

	closeVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = true;
		this.voiceActiveSectionError = false;
		this.voiceActiveSectionSuccess = false;
		this.voiceActiveSectionListening = false;
		this.voiceText = undefined;

		if(annyang){
      annyang.abort();
    }
	}

}

