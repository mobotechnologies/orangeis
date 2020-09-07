import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-common-pop',
  templateUrl: './common-pop.component.html',
  styleUrls: ['./common-pop.component.css']
})
export class CommonPopComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    Swal.fire({
      allowOutsideClick: false,
      title: 'Welcome!',
      text: "Choose the business type you belong to",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Consumer',
      confirmButtonText: 'Company'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['consumeraccountsetup']);
      } else {
        this.router.navigate(['home']);
      }

    })
  }

}
