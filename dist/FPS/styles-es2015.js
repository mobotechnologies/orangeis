(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["styles"],{

/***/ "./node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!./node_modules/postcss-loader/src/index.js?!./src/styles.css":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!./node_modules/postcss-loader/src??embedded!./src/styles.css ***!
  \*****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = [[module.i, "\r\n\r\n@import url(//fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300ita‌​lic,400italic,500,500italic,700,700italic,900italic,900);\n/* You can add global styles to this file, and also import other style files */\n@charset \"UTF-8\";\nhtml, body, html * {\r\n  font-family: 'Roboto', sans-serif;\r\n}\nhtml, body {\r\n  max-width: 100%;\r\n  overflow-x: hidden;\r\n\tbackground: #eee;\r\n\twidth: 100%;\r\n}\n::-webkit-scrollbar {\r\n  width: 12px;\r\n}\n::-webkit-scrollbar-track {\r\n  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); \r\n  border-radius: 10px;\r\n}\n::-webkit-scrollbar-thumb {\r\n  border-radius: 10px;\r\n  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); \r\n}\na:hover\r\n{\r\n  text-decoration: none;\r\n}\n.header-categoryPC:hover .header-categoryPC-content {\r\n    display: flex;\r\n  }\n.J-categoryPC-level1 a\r\n  {\r\n    color:#222 !important;\r\n    cursor: pointer !important;\r\n  }\n.J-categoryPC-level1:hover\r\n  {\r\n    color:#10176e !important;\r\n  }\n.J-categoryPC-level2 a:hover\r\n  {\r\n    color:#10176e !important;\r\n  }\n.J-categoryPC-level2 a\r\n  {\r\n    color:#222 !important;\r\n    cursor: pointer !important;\r\n  }\n.header-categoryPC .header-categoryPC-content {\r\n    position: absolute;\r\n    box-sizing: border-box;\r\n    border-radius: 6px;\r\n    box-shadow: rgba(0,0,0,0.247) 0 2px 10px 0;\r\n    left: 0;\r\n    top: 40px;\r\n    background: #fff;\r\n    display: none;\r\n  }\n.header-categoryPC .categoryPC-col {\r\n    box-sizing: border-box;\r\n    width: 260px;\r\n    min-width: 260px;\r\n    display: none;\r\n    height: 370px;\r\n    overflow: auto;\r\n    border-left: 1px solid #dae0e5;\r\n    padding: 10px 0;\r\n    line-height: 2.5;\r\n  }\n.header-categoryPC .categoryPC-col:first-child {\r\n    border-left: 0;\r\n  }\n.header-categoryPC a {\r\n    display: block;\r\n    padding: 5px 20px;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n    color: #555;\r\n  }\n.header-categoryPC .categoryPC-item {\r\n    position: relative;\r\n  }\n.header-categoryPC .categoryPC-item.hover {\r\n    background: #e6ecf2;\r\n  }\n.header-categoryPC .icon-right {\r\n    position: absolute;\r\n    font-size: 16px;\r\n    color: #888;\r\n    right: 10px;\r\n    top: 7px;\r\n  }\n.header-categoryPC .categoryPC-group {\r\n    display: none;\r\n  }\n.main-btn-rect,\r\n.main-btn-circle{\r\n     position: relative;\r\n     margin: 0;\r\n     color: #ffffff;\r\n     font-weight: bold;\r\n     background-color: #10176e;\r\n     text-transform: uppercase;\r\n     font-size: 25px;\r\n     letter-spacing: 1px;     \r\n     outline: none;\r\n     cursor: pointer;\r\n     z-index: 100;\r\n}\n.main-btn-rect {\r\n     padding: 10px 80px;\r\n     line-height: 30px;\r\n}\n.main-btn-rect:before, \r\n.main-btn-rect:after{\r\n  position: absolute;\r\n  content: '';\r\n  top:0;\r\n  width: 0%;\r\n  height: 100%;\r\n  background-color: rgba(255, 255, 240, 0.2);\r\n  transition: width 0.3s;\r\n}\n.main-btn-rect:before {\r\n  left: 0;\r\n}\n.main-btn-rect:after {\r\n  right: 0;\r\n}\n.main-btn-rect:hover:before, \r\n.main-btn-rect:hover:after{\r\n  width: 50%;\r\n}\n.main-btn-circle{\r\n     height: 40px;\r\n     width: 40px;\r\n     border-radius: 100%;\r\n     line-height: 40px;\r\n  transition: box-shadow 0.3s;\r\n  background-color: rgb(252, 79, 79);\r\n  color: #FFFFF0;\r\n}\n.main-btn-circle:hover{\r\n  box-shadow: inset 2px 1px 0px 20px rgba(255, 255, 240, 0.2);\r\n}\n.popup{\r\n  position: fixed;\r\n     top: 100%;\r\n  width: 100%;\r\n  height: 100%;\r\n  z-index: 10001;\r\n}\n.popup.active{\r\n  top:0;\r\n  background-color: rgba(97, 89, 89, 0.52); \r\n  transition: background-color .6s ,opacity .6s;\r\n}\n.popup .main-btn-rect{\r\n  padding: 10px 100px;\r\n}\n.popup .popup-content{\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  max-height: 568px;\r\n  min-width: 320px;\r\n  margin-top: 150px;\r\n  padding: 25px;\r\n  background-color: #FFFFF0;\r\n  color: #070000;\r\n  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);\r\n  transform: translateX(-50%) translateY(-50%);\r\n  -webkit-transform: translateX(-50%) translateY(-50%);\r\n  -moz-transform: translateX(-50%) translateY(-50%);\r\n  -o-transform: translateX(-50%) translateY(-50%);\r\n  transition: margin .6s;\r\n  -webkit-transition: margin .6s;\r\n  -moz-transition: margin .6s;\r\n  -o-transition: margin .6s;\r\n}\n.popup.active .popup-content{\r\n  margin-top: 0px;\r\n}\n.popup-content h6{\r\n  display: table;\r\n  font-size: 16px;\r\n  text-align: center;\r\n  margin: 10px auto;\r\n  text-transform: uppercase;\r\n  font-weight: 500;  \r\n}\n.form-group{\r\n     position: relative;\r\n     width: 90%;\r\n     margin: 0px auto;\r\n}\nform.send-form input, form.send-form textarea{\r\n     position: relative;\r\n     margin-bottom: 32px;\r\n     width: 100%;\r\n     height: 29px;\r\n     text-indent: 20px;\r\n  font-size: 10pt;\r\n  background-color: transparent;\r\n     outline: 0;\r\n     border: none;\r\n     border-bottom: 1px solid #070000;\r\n     transition: border 0.6s;\r\n}\nform.send-form input:focus,\r\nform.send-form textarea:focus{\r\n     border-bottom: 1px solid #10176e; \r\n}\nform.send-form label{\r\n     position: absolute;\r\n     top: 0;\r\n     line-height: 28px;\r\n     transition: color .5s;\r\n}\nform.send-form input:focus + label,\r\nform.send-form textarea:focus + label{\r\n  color:#10176e;\r\n}\nform.send-form .txt{\r\n     line-height: 22px;\r\n     left: 2px;\r\n}\nform.send-form .main-btn-rect {\r\n     position: relative;\r\n     display: block;\r\n     padding: 12px 80px;\r\n     margin: 0px auto;\r\n     font-size: 14px;\r\n}\nform.send-form .main-btn-rect i {\r\n     margin-right: 5px;\r\n}\n.popup .fade-out{\r\n  position: absolute;\r\n  top: -20px;\r\n  right: -20px;\r\n  text-align: center;\r\n  font-size: 15px;\r\n}\n@media only screen and (max-width: 768px){\r\n  .send-form .main-btn-rect {padding: 7px 60px; font-size: 14px;}\r\n  .popup .main-btn-rect{\r\n    padding: 10px 50px;\r\n  }\r\n}\n#navigation ul {\r\n  margin: 0;\r\n  padding: 0;\r\n}\n/* Parent div */\n#navigation {\r\n  position: fixed;\r\n  display: block;\r\n  width: 0px;\r\n  height: auto;\r\n  margin: 20% 0 0px 0;\r\n}\n.menu-items-container {\r\n  position: fixed;\r\n  width: 50px;\r\n  margin: 0 auto;\r\n  overflow: hidden;\r\n  top: 85%;\r\n  transform: translateY(-50%);\r\n  left: 0;\r\n  right: 0;\r\n}\n.menu-items-container a\r\n{\r\n  cursor: pointer;\r\n}\n.menu-items-container li {\r\n  padding: 0 0 0 0;\r\n  list-style-type: none;\r\n}\n.menu-items-container li:hover {\r\n  cursor: pointer;\r\n  color: #fff;\r\n}\n/* circular background for the icons*/\n.circle-icon {\r\n  color: #fff;\r\n  text-align: center;\r\n  width: 32px;\r\n  height: 32px;\r\n  line-height: 32px;\r\n  border-radius: 100%;\r\n}\n.home-icon {\r\n  background-color: #3bb1f4;\r\n  border: #3bb1f4;\r\n}\n.about-icon {\r\n  background-color: #0cc011;\r\n  border: #0cc011;\r\n}\n.profile-icon {\r\n  background-color: #dd4b39;\r\n  border: #dd4b39;\r\n}\n.menu-text-icons {\r\n  font-size: 1.2em;\r\n  display: block;\r\n  margin: 10px 0 10px -50px;\r\n  float: left;\r\n  transition: all 1s ease;\r\n}\n/* transition for the icons to move from left side*/\n.effect-menu-text-icons {\r\n  margin-left: 10px;\r\n}\n/* text next to icons */\n.menu-text {\r\n  font-size: 1em;\r\n  width: 150px;\r\n  line-height: 32px;\r\n  display: block;\r\n  float: right;\r\n  margin: 10px -200px 10px 0;\r\n  transition: all 1s ease;\r\n}\n/* transition for the text to move from right side*/\n.effect-menu-text {\r\n  margin-right: 75px;\r\n}\n.main-container\r\n{\r\n    margin-top: 30pt;\r\n    margin-bottom: 30pt;\r\n    margin-left:30pt;\r\n    margin-right:30pt;\r\n}\n@media only screen \r\n and (device-width : 768px) \r\n and (device-height : 1024px) \r\n and (-webkit-device-pixel-ratio : 2) {\r\n  #navigation\r\n  {\r\n      display:none;\r\n  }\r\n  .main-container\r\n{\r\n    margin-left:0pt;\r\n    margin-right:0pt;\r\n}\r\n}\n@media only screen \r\n and (device-width : 1024px) \r\n and (device-height : 1366px) \r\n and (-webkit-device-pixel-ratio : 2) {\r\n  #navigation\r\n  {\r\n      display:none;\r\n      \r\n  }\r\n  .main-container\r\n  {\r\n      margin-left:0pt;\r\n      margin-right:0pt;\r\n  }\r\n  \r\n}\n@media (max-width: 768px)\r\n{\r\n  #navigation\r\n  {\r\n      display:none;\r\n  }\r\n  .main-container\r\n  {\r\n      margin-left:0pt;\r\n      margin-right:0pt;\r\n  }\r\n}\na,\r\na label {\r\n    cursor: pointer;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,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QkFBbUI7QUFDckI7QUFDQTtFQUNFLHlCQUF5QjtFQUN6QixlQUFlO0FBQ2pCO0FBQ0E7RUFDRSx5QkFBeUI7RUFDekIsZUFBZTtBQUNqQjtBQUNBO0VBQ0UseUJBQXlCO0VBQ3pCLGVBQWU7QUFDakI7QUFHQTtFQUNFLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2QseUJBQXlCO0VBQ3pCLFdBQVc7RUFDWCx1QkFBdUI7QUFDekI7QUFDQSxtREFBbUQ7QUFDbkQ7RUFDRSxpQkFBaUI7QUFDbkI7QUFDQSx1QkFBdUI7QUFDdkI7RUFDRSxjQUFjO0VBQ2QsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixjQUFjO0VBQ2QsWUFBWTtFQUNaLDBCQUEwQjtFQUMxQix1QkFBdUI7QUFDekI7QUFDQSxtREFBbUQ7QUFDbkQ7RUFDRSxrQkFBa0I7QUFDcEI7QUFDQTs7SUFFSSxnQkFBZ0I7SUFDaEIsbUJBQW1CO0lBQ25CLGdCQUFnQjtJQUNoQixpQkFBaUI7QUFDckI7QUFDQzs7OztFQUlDOztNQUVJLFlBQVk7RUFDaEI7RUFDQTs7SUFFRSxlQUFlO0lBQ2YsZ0JBQWdCO0FBQ3BCO0FBQ0E7QUFDQTs7OztFQUlFOztNQUVJLFlBQVk7O0VBRWhCO0VBQ0E7O01BRUksZUFBZTtNQUNmLGdCQUFnQjtFQUNwQjs7QUFFRjtBQUNBOztFQUVFOztNQUVJLFlBQVk7RUFDaEI7RUFDQTs7TUFFSSxlQUFlO01BQ2YsZ0JBQWdCO0VBQ3BCO0FBQ0Y7QUFDQTs7SUFFSSxlQUFlO0FBQ25CIiwiZmlsZSI6InNyYy9zdHlsZXMuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogWW91IGNhbiBhZGQgZ2xvYmFsIHN0eWxlcyB0byB0aGlzIGZpbGUsIGFuZCBhbHNvIGltcG9ydCBvdGhlciBzdHlsZSBmaWxlcyAqL1xyXG5AY2hhcnNldCBcIlVURi04XCI7XHJcblxyXG5AaW1wb3J0IHVybCgvL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9Um9ib3RvOjQwMCwxMDAsMTAwaXRhbGljLDMwMCwzMDBpdGHigIzigItsaWMsNDAwaXRhbGljLDUwMCw1MDBpdGFsaWMsNzAwLDcwMGl0YWxpYyw5MDBpdGFsaWMsOTAwKTtcclxuaHRtbCwgYm9keSwgaHRtbCAqIHtcclxuICBmb250LWZhbWlseTogJ1JvYm90bycsIHNhbnMtc2VyaWY7XHJcbn1cclxuaHRtbCwgYm9keSB7XHJcbiAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcclxuXHRiYWNrZ3JvdW5kOiAjZWVlO1xyXG5cdHdpZHRoOiAxMDAlO1xyXG59XHJcbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gIHdpZHRoOiAxMnB4O1xyXG59XHJcblxyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcclxuICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLDAsMCwwLjMpOyBcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG59XHJcblxyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsMCwwLDAuNSk7IFxyXG59XHJcbmE6aG92ZXJcclxue1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxufVxyXG4gXHJcbiAgXHJcbiAgXHJcbiAgLmhlYWRlci1jYXRlZ29yeVBDOmhvdmVyIC5oZWFkZXItY2F0ZWdvcnlQQy1jb250ZW50IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgfVxyXG4gIC5KLWNhdGVnb3J5UEMtbGV2ZWwxIGFcclxuICB7XHJcbiAgICBjb2xvcjojMjIyICFpbXBvcnRhbnQ7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXIgIWltcG9ydGFudDtcclxuICB9XHJcbiAgLkotY2F0ZWdvcnlQQy1sZXZlbDE6aG92ZXJcclxuICB7XHJcbiAgICBjb2xvcjojMTAxNzZlICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIC5KLWNhdGVnb3J5UEMtbGV2ZWwyIGE6aG92ZXJcclxuICB7XHJcbiAgICBjb2xvcjojMTAxNzZlICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIC5KLWNhdGVnb3J5UEMtbGV2ZWwyIGFcclxuICB7XHJcbiAgICBjb2xvcjojMjIyICFpbXBvcnRhbnQ7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXIgIWltcG9ydGFudDtcclxuICB9XHJcbiAgXHJcbiAgLmhlYWRlci1jYXRlZ29yeVBDIC5oZWFkZXItY2F0ZWdvcnlQQy1jb250ZW50IHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgICBib3gtc2hhZG93OiByZ2JhKDAsMCwwLDAuMjQ3KSAwIDJweCAxMHB4IDA7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgdG9wOiA0MHB4O1xyXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgfVxyXG4gIFxyXG4gIC5oZWFkZXItY2F0ZWdvcnlQQyAuY2F0ZWdvcnlQQy1jb2wge1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIHdpZHRoOiAyNjBweDtcclxuICAgIG1pbi13aWR0aDogMjYwcHg7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgaGVpZ2h0OiAzNzBweDtcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjZGFlMGU1O1xyXG4gICAgcGFkZGluZzogMTBweCAwO1xyXG4gICAgbGluZS1oZWlnaHQ6IDIuNTtcclxuICB9XHJcbiAgXHJcbiAgLmhlYWRlci1jYXRlZ29yeVBDIC5jYXRlZ29yeVBDLWNvbDpmaXJzdC1jaGlsZCB7XHJcbiAgICBib3JkZXItbGVmdDogMDtcclxuICB9XHJcbiAgXHJcbiAgLmhlYWRlci1jYXRlZ29yeVBDIGEge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBwYWRkaW5nOiA1cHggMjBweDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICAgIGNvbG9yOiAjNTU1O1xyXG4gIH1cclxuICBcclxuICAuaGVhZGVyLWNhdGVnb3J5UEMgLmNhdGVnb3J5UEMtaXRlbSB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgfVxyXG4gIFxyXG4gIC5oZWFkZXItY2F0ZWdvcnlQQyAuY2F0ZWdvcnlQQy1pdGVtLmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQ6ICNlNmVjZjI7XHJcbiAgfVxyXG4gIFxyXG4gIC5oZWFkZXItY2F0ZWdvcnlQQyAuaWNvbi1yaWdodCB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICBjb2xvcjogIzg4ODtcclxuICAgIHJpZ2h0OiAxMHB4O1xyXG4gICAgdG9wOiA3cHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5oZWFkZXItY2F0ZWdvcnlQQyAuY2F0ZWdvcnlQQy1ncm91cCB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gIH1cclxuICAubWFpbi1idG4tcmVjdCxcclxuLm1haW4tYnRuLWNpcmNsZXtcclxuICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgbWFyZ2luOiAwO1xyXG4gICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgIGJhY2tncm91bmQtY29sb3I6ICMxMDE3NmU7XHJcbiAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICAgbGV0dGVyLXNwYWNpbmc6IDFweDsgICAgIFxyXG4gICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgIHotaW5kZXg6IDEwMDtcclxufVxyXG4ubWFpbi1idG4tcmVjdCB7XHJcbiAgICAgcGFkZGluZzogMTBweCA4MHB4O1xyXG4gICAgIGxpbmUtaGVpZ2h0OiAzMHB4O1xyXG59XHJcbi5tYWluLWJ0bi1yZWN0OmJlZm9yZSwgXHJcbi5tYWluLWJ0bi1yZWN0OmFmdGVye1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBjb250ZW50OiAnJztcclxuICB0b3A6MDtcclxuICB3aWR0aDogMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI0MCwgMC4yKTtcclxuICAtd2Via2l0LXRyYW5zaXRpb246IHdpZHRoIDAuM3M7XHJcbiAgLW8tdHJhbnNpdGlvbjogd2lkdGggMC4zcztcclxuICB0cmFuc2l0aW9uOiB3aWR0aCAwLjNzO1xyXG59XHJcbi5tYWluLWJ0bi1yZWN0OmJlZm9yZSB7XHJcbiAgbGVmdDogMDtcclxufVxyXG4ubWFpbi1idG4tcmVjdDphZnRlciB7XHJcbiAgcmlnaHQ6IDA7XHJcbn1cclxuLm1haW4tYnRuLXJlY3Q6aG92ZXI6YmVmb3JlLCBcclxuLm1haW4tYnRuLXJlY3Q6aG92ZXI6YWZ0ZXJ7XHJcbiAgd2lkdGg6IDUwJTtcclxufVxyXG4ubWFpbi1idG4tY2lyY2xle1xyXG4gICAgIGhlaWdodDogNDBweDtcclxuICAgICB3aWR0aDogNDBweDtcclxuICAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xyXG4gICAgIGxpbmUtaGVpZ2h0OiA0MHB4O1xyXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYm94LXNoYWRvdyAwLjNzO1xyXG4gIC1vLXRyYW5zaXRpb246IGJveC1zaGFkb3cgMC4zcztcclxuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDAuM3M7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1MiwgNzksIDc5KTtcclxuICBjb2xvcjogI0ZGRkZGMDtcclxufVxyXG4ubWFpbi1idG4tY2lyY2xlOmhvdmVyeyAgIFxyXG4gIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMnB4IDFweCAwcHggMjBweCByZ2JhKDI1NSwgMjU1LCAyNDAsIDAuMik7XHJcbiAgLW1vei1ib3gtc2hhZG93OiBpbnNldCAycHggMXB4IDBweCAyMHB4IHJnYmEoMjU1LCAyNTUsIDI0MCwgMC4yKTtcclxuICBib3gtc2hhZG93OiBpbnNldCAycHggMXB4IDBweCAyMHB4IHJnYmEoMjU1LCAyNTUsIDI0MCwgMC4yKTtcclxufVxyXG5cclxuLnBvcHVwe1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgICB0b3A6IDEwMCU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIHotaW5kZXg6IDEwMDAxO1xyXG59XHJcbi5wb3B1cC5hY3RpdmV7XHJcbiAgdG9wOjA7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg5NywgODksIDg5LCAwLjUyKTsgXHJcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAuNnMgLG9wYWNpdHkgLjZzO1xyXG59XHJcbi5wb3B1cCAubWFpbi1idG4tcmVjdHtcclxuICBwYWRkaW5nOiAxMHB4IDEwMHB4O1xyXG59XHJcbi5wb3B1cCAucG9wdXAtY29udGVudHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiA1MCU7XHJcbiAgbGVmdDogNTAlO1xyXG4gIG1heC1oZWlnaHQ6IDU2OHB4O1xyXG4gIG1pbi13aWR0aDogMzIwcHg7XHJcbiAgbWFyZ2luLXRvcDogMTUwcHg7XHJcbiAgcGFkZGluZzogMjVweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkYwO1xyXG4gIGNvbG9yOiAjMDcwMDAwO1xyXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMCwwLDAsMC4xMiksIDAgMXB4IDJweCByZ2JhKDAsMCwwLDAuMjQpO1xyXG4gIGJveC1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsMCwwLDAuMTIpLCAwIDFweCAycHggcmdiYSgwLDAsMCwwLjI0KTtcclxuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoLTUwJSk7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoLTUwJSk7XHJcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgdHJhbnNsYXRlWSgtNTAlKTtcclxuICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSB0cmFuc2xhdGVZKC01MCUpO1xyXG4gIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSB0cmFuc2xhdGVZKC01MCUpO1xyXG4gIHRyYW5zaXRpb246IG1hcmdpbiAuNnM7XHJcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBtYXJnaW4gLjZzO1xyXG4gIC1tb3otdHJhbnNpdGlvbjogbWFyZ2luIC42cztcclxuICAtby10cmFuc2l0aW9uOiBtYXJnaW4gLjZzO1xyXG59XHJcbi5wb3B1cC5hY3RpdmUgLnBvcHVwLWNvbnRlbnR7XHJcbiAgbWFyZ2luLXRvcDogMHB4O1xyXG59XHJcbi5wb3B1cC1jb250ZW50IGg2e1xyXG4gIGRpc3BsYXk6IHRhYmxlO1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgbWFyZ2luOiAxMHB4IGF1dG87XHJcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICBmb250LXdlaWdodDogNTAwOyAgXHJcbn1cclxuLmZvcm0tZ3JvdXB7XHJcbiAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgIHdpZHRoOiA5MCU7XHJcbiAgICAgbWFyZ2luOiAwcHggYXV0bztcclxufVxyXG5mb3JtLnNlbmQtZm9ybSBpbnB1dCwgZm9ybS5zZW5kLWZvcm0gdGV4dGFyZWF7XHJcbiAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgIG1hcmdpbi1ib3R0b206IDMycHg7XHJcbiAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgaGVpZ2h0OiAyOXB4O1xyXG4gICAgIHRleHQtaW5kZW50OiAyMHB4O1xyXG4gIGZvbnQtc2l6ZTogMTBwdDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICAgICBvdXRsaW5lOiAwO1xyXG4gICAgIGJvcmRlcjogbm9uZTtcclxuICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzA3MDAwMDtcclxuICAgICAtd2Via2l0LXRyYW5zaXRpb246IGJvcmRlciAwLjZzO1xyXG4gICAgIC1vLXRyYW5zaXRpb246IGJvcmRlciAwLjZzO1xyXG4gICAgIHRyYW5zaXRpb246IGJvcmRlciAwLjZzO1xyXG59XHJcblxyXG5mb3JtLnNlbmQtZm9ybSBpbnB1dDpmb2N1cyxcclxuZm9ybS5zZW5kLWZvcm0gdGV4dGFyZWE6Zm9jdXN7XHJcbiAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMxMDE3NmU7IFxyXG59XHJcbmZvcm0uc2VuZC1mb3JtIGxhYmVse1xyXG4gICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICB0b3A6IDA7XHJcbiAgICAgbGluZS1oZWlnaHQ6IDI4cHg7XHJcbiAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBjb2xvciAuNXM7XHJcbiAgICAgLW8tdHJhbnNpdGlvbjogY29sb3IgLjVzO1xyXG4gICAgIHRyYW5zaXRpb246IGNvbG9yIC41cztcclxufVxyXG5mb3JtLnNlbmQtZm9ybSBpbnB1dDpmb2N1cyArIGxhYmVsLFxyXG5mb3JtLnNlbmQtZm9ybSB0ZXh0YXJlYTpmb2N1cyArIGxhYmVse1xyXG4gIGNvbG9yOiMxMDE3NmU7XHJcbn1cclxuZm9ybS5zZW5kLWZvcm0gLnR4dHtcclxuICAgICBsaW5lLWhlaWdodDogMjJweDtcclxuICAgICBsZWZ0OiAycHg7XHJcbn1cclxuZm9ybS5zZW5kLWZvcm0gLm1haW4tYnRuLXJlY3Qge1xyXG4gICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICBwYWRkaW5nOiAxMnB4IDgwcHg7XHJcbiAgICAgbWFyZ2luOiAwcHggYXV0bztcclxuICAgICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxuZm9ybS5zZW5kLWZvcm0gLm1haW4tYnRuLXJlY3QgaSB7XHJcbiAgICAgbWFyZ2luLXJpZ2h0OiA1cHg7XHJcbn1cclxuLnBvcHVwIC5mYWRlLW91dHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAtMjBweDtcclxuICByaWdodDogLTIwcHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGZvbnQtc2l6ZTogMTVweDtcclxufVxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KXtcclxuICAuc2VuZC1mb3JtIC5tYWluLWJ0bi1yZWN0IHtwYWRkaW5nOiA3cHggNjBweDsgZm9udC1zaXplOiAxNHB4O31cclxuICAucG9wdXAgLm1haW4tYnRuLXJlY3R7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDUwcHg7XHJcbiAgfVxyXG59XHJcbiNuYXZpZ2F0aW9uIHVsIHtcclxuICBtYXJnaW46IDA7XHJcbiAgcGFkZGluZzogMDtcclxufVxyXG4vKiBQYXJlbnQgZGl2ICovXHJcbiNuYXZpZ2F0aW9uIHtcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgd2lkdGg6IDBweDtcclxuICBoZWlnaHQ6IGF1dG87XHJcbiAgbWFyZ2luOiAyMCUgMCAwcHggMDtcclxufVxyXG5cclxuLm1lbnUtaXRlbXMtY29udGFpbmVyIHtcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgd2lkdGg6IDUwcHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0b3A6IDg1JTtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XHJcbiAgbGVmdDogMDtcclxuICByaWdodDogMDtcclxufVxyXG4ubWVudS1pdGVtcy1jb250YWluZXIgYVxyXG57XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcbi5tZW51LWl0ZW1zLWNvbnRhaW5lciBsaSB7XHJcbiAgcGFkZGluZzogMCAwIDAgMDtcclxuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcbn1cclxuLm1lbnUtaXRlbXMtY29udGFpbmVyIGxpOmhvdmVyIHtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgY29sb3I6ICNmZmY7XHJcbn1cclxuXHJcbi8qIGNpcmN1bGFyIGJhY2tncm91bmQgZm9yIHRoZSBpY29ucyovXHJcbi5jaXJjbGUtaWNvbiB7XHJcbiAgY29sb3I6ICNmZmY7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIHdpZHRoOiAzMnB4O1xyXG4gIGhlaWdodDogMzJweDtcclxuICBsaW5lLWhlaWdodDogMzJweDtcclxuICBib3JkZXItcmFkaXVzOiAxMDAlO1xyXG59XHJcbi5ob21lLWljb24ge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMzYmIxZjQ7XHJcbiAgYm9yZGVyOiAjM2JiMWY0O1xyXG59XHJcbi5hYm91dC1pY29uIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGNjMDExO1xyXG4gIGJvcmRlcjogIzBjYzAxMTtcclxufVxyXG4ucHJvZmlsZS1pY29uIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGQ0YjM5O1xyXG4gIGJvcmRlcjogI2RkNGIzOTtcclxufVxyXG5cclxuXHJcbi5tZW51LXRleHQtaWNvbnMge1xyXG4gIGZvbnQtc2l6ZTogMS4yZW07XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgbWFyZ2luOiAxMHB4IDAgMTBweCAtNTBweDtcclxuICBmbG9hdDogbGVmdDtcclxuICB0cmFuc2l0aW9uOiBhbGwgMXMgZWFzZTtcclxufVxyXG4vKiB0cmFuc2l0aW9uIGZvciB0aGUgaWNvbnMgdG8gbW92ZSBmcm9tIGxlZnQgc2lkZSovXHJcbi5lZmZlY3QtbWVudS10ZXh0LWljb25zIHtcclxuICBtYXJnaW4tbGVmdDogMTBweDtcclxufVxyXG4vKiB0ZXh0IG5leHQgdG8gaWNvbnMgKi9cclxuLm1lbnUtdGV4dCB7XHJcbiAgZm9udC1zaXplOiAxZW07XHJcbiAgd2lkdGg6IDE1MHB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAzMnB4O1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIGZsb2F0OiByaWdodDtcclxuICBtYXJnaW46IDEwcHggLTIwMHB4IDEwcHggMDtcclxuICB0cmFuc2l0aW9uOiBhbGwgMXMgZWFzZTtcclxufVxyXG4vKiB0cmFuc2l0aW9uIGZvciB0aGUgdGV4dCB0byBtb3ZlIGZyb20gcmlnaHQgc2lkZSovXHJcbi5lZmZlY3QtbWVudS10ZXh0IHtcclxuICBtYXJnaW4tcmlnaHQ6IDc1cHg7XHJcbn1cclxuLm1haW4tY29udGFpbmVyXHJcbntcclxuICAgIG1hcmdpbi10b3A6IDMwcHQ7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAzMHB0O1xyXG4gICAgbWFyZ2luLWxlZnQ6MzBwdDtcclxuICAgIG1hcmdpbi1yaWdodDozMHB0O1xyXG59XHJcbiBAbWVkaWEgb25seSBzY3JlZW4gXHJcbiBhbmQgKGRldmljZS13aWR0aCA6IDc2OHB4KSBcclxuIGFuZCAoZGV2aWNlLWhlaWdodCA6IDEwMjRweCkgXHJcbiBhbmQgKC13ZWJraXQtZGV2aWNlLXBpeGVsLXJhdGlvIDogMikge1xyXG4gICNuYXZpZ2F0aW9uXHJcbiAge1xyXG4gICAgICBkaXNwbGF5Om5vbmU7XHJcbiAgfVxyXG4gIC5tYWluLWNvbnRhaW5lclxyXG57XHJcbiAgICBtYXJnaW4tbGVmdDowcHQ7XHJcbiAgICBtYXJnaW4tcmlnaHQ6MHB0O1xyXG59XHJcbn1cclxuQG1lZGlhIG9ubHkgc2NyZWVuIFxyXG4gYW5kIChkZXZpY2Utd2lkdGggOiAxMDI0cHgpIFxyXG4gYW5kIChkZXZpY2UtaGVpZ2h0IDogMTM2NnB4KSBcclxuIGFuZCAoLXdlYmtpdC1kZXZpY2UtcGl4ZWwtcmF0aW8gOiAyKSB7XHJcbiAgI25hdmlnYXRpb25cclxuICB7XHJcbiAgICAgIGRpc3BsYXk6bm9uZTtcclxuICAgICAgXHJcbiAgfVxyXG4gIC5tYWluLWNvbnRhaW5lclxyXG4gIHtcclxuICAgICAgbWFyZ2luLWxlZnQ6MHB0O1xyXG4gICAgICBtYXJnaW4tcmlnaHQ6MHB0O1xyXG4gIH1cclxuICBcclxufVxyXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpXHJcbntcclxuICAjbmF2aWdhdGlvblxyXG4gIHtcclxuICAgICAgZGlzcGxheTpub25lO1xyXG4gIH1cclxuICAubWFpbi1jb250YWluZXJcclxuICB7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OjBwdDtcclxuICAgICAgbWFyZ2luLXJpZ2h0OjBwdDtcclxuICB9XHJcbn1cclxuYSxcclxuYSBsYWJlbCB7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuIl19 */", '', '']]

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stylesInDom = {};

var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

function listToStyles(list, options) {
  var styles = [];
  var newStyles = {};

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      css: css,
      media: media,
      sourceMap: sourceMap
    };

    if (!newStyles[id]) {
      styles.push(newStyles[id] = {
        id: id,
        parts: [part]
      });
    } else {
      newStyles[id].parts.push(part);
    }
  }

  return styles;
}

function addStylesToDom(styles, options) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i];
    var domStyle = stylesInDom[item.id];
    var j = 0;

    if (domStyle) {
      domStyle.refs++;

      for (; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j]);
      }

      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j], options));
      }
    } else {
      var parts = [];

      for (; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j], options));
      }

      stylesInDom[item.id] = {
        id: item.id,
        refs: 1,
        parts: parts
      };
    }
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');

  if (typeof options.attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      options.attributes.nonce = nonce;
    }
  }

  Object.keys(options.attributes).forEach(function (key) {
    style.setAttribute(key, options.attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  var styles = listToStyles(list, options);
  addStylesToDom(styles, options);
  return function update(newList) {
    var mayRemove = [];

    for (var i = 0; i < styles.length; i++) {
      var item = styles[i];
      var domStyle = stylesInDom[item.id];

      if (domStyle) {
        domStyle.refs--;
        mayRemove.push(domStyle);
      }
    }

    if (newList) {
      var newStyles = listToStyles(newList, options);
      addStylesToDom(newStyles, options);
    }

    for (var _i = 0; _i < mayRemove.length; _i++) {
      var _domStyle = mayRemove[_i];

      if (_domStyle.refs === 0) {
        for (var j = 0; j < _domStyle.parts.length; j++) {
          _domStyle.parts[j]();
        }

        delete stylesInDom[_domStyle.id];
      }
    }
  };
};

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!../node_modules/postcss-loader/src??embedded!./styles.css */ "./node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!./node_modules/postcss-loader/src/index.js?!./src/styles.css");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),

/***/ 3:
/*!******************************!*\
  !*** multi ./src/styles.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\Dhanus\arun_pack\Famposolaunch\src\styles.css */"./src/styles.css");


/***/ })

},[[3,"runtime"]]]);
//# sourceMappingURL=styles-es2015.js.map