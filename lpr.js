$(document).ready(function() {
  var MaxSizeKb = 10*1024*1024;
    valid_extensions = ["jpg", "jpeg"];
    uploader = new ss.SimpleUpload({
          button: $(" button.btn_car-t"), // HTML element used as upload button
          url: "/fileRegistProc.do", // URL of server-side upload handler
          dropzone: $(" .car_box"),
          cors: true,
          //debug: true,
          responseType: "json",
          maxSize: MaxSizeKb, // kilobytes
          allowedExtensions: valid_extensions,
          name: 'uploadFile',
          onSubmit: function(filename, extension, uploadBtn, filesize) {
       
              $("#errmsg").hide();
			  $(".demo_preview_info").empty();
          },
          onComplete: function(filename, response, uploadBtn, filesize) {
             //alert(response.result);
				if(response.result =='ok'){
							 var arrNumber = new Array(); 
							 var arrType = new Array(); 

							
							var infohtml =""; 
							$.each(response.carnum, function(idx, result) {
								if(result.num !='null'){
								   arrNumber[idx] =result.num;
								//   alert(result.num);
								}
							});

							$.each(response.cartype, function(idx, result) {
								if(result.val !='null'){
								   arrType[idx] =result.val;
								//   alert(result.val);
								}
							});

							if(arrNumber.length > 0 ){


								for(var i=0;i<arrNumber.length;i++){ //배열 출력
									infohtml +=   "<span>"+ arrType[i]+" 번호판 : "+arrNumber[i] + "</span> &nbsp;"; 
									//document.write(arrNumber[i]+"<br>");
								}

							}



						  // alert(response.tempName);
						   $(".demo_preview_img").empty();
						   $(".demo_preview_info").empty();

						  $(".demo_preview_img").append('<img src="/tmp_img/'+response.tempName+'">');
						   $(".demo_preview_info").append(infohtml);
				}else {

				show_error(response.errmsg);
				}

          },
          onSizeError: function(filename, fileSize)
          {
            show_error("파일용량을 확인해주세요.  Maximum upload size for the demo is " + MaxSizeKb + " kB");
          },
          onExtError: function(filename, extension)
          {
            show_error("이미지 타입을 확인해주세요.  Allowed image extensions: " + valid_extensions.join(", "));
          },
          onError: function(filename, errorType, status, statusText, response, uploadBtn, filesize) {
            show_error(statusText);
          }
    });




	function show_error(errortext){
	
		  $("#errmsg").show();
		  $("#errmsg").text(errortext);
	 
	}

	});	