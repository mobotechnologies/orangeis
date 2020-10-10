import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-clients-slider',
  templateUrl: './clients-slider.component.html',
  styleUrls: ['./clients-slider.component.css']
})
export class ClientsSliderComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $(document).ready(function ($) {
      // client logo
      $(function () {
        // vars for clients list carousel
        var $clientcarousel = $('#clients-list');
        var clients = $clientcarousel.children().length;
        var clientwidth = (clients * 230); // 140px width for each client item 
        $clientcarousel.css('width', clientwidth);

        var rotating = true;
        var clientspeed = 0;
        var seeclients = setInterval(rotateClients, clientspeed);

        $(document).on({
          mouseenter: function () {
            rotating = false; // turn off rotation when hovering
          },
          mouseleave: function () {
            rotating = true;
          }
        }, '#clients');

        function rotateClients() {
          if (rotating != false) {
            var $first = $('#clients-list li:first');
            $first.animate({ 'margin-left': '-280px' }, 3000, "linear", function () {
              $first.remove().css({ 'margin-left': '0px' });
              $('#clients-list li:last').after($first);
            });
          }
        }
      });
    });

  }

}
