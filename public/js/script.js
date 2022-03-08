$(document).ready(function () {
  $(function () {
    function readURL(input) {
      if (input.files) {
        var fileAmount = input.files.length;
        for (i = 0; i < fileAmount; i++) {
          var reader = new FileReader();

          reader.onload = function (e) {
            // $($.parseHTML('<div>')).attr('class', 'image-item').appendTo('.images-box');
            // $($.parseHTML('<img>')).attr('src', e.target.result).appendTo('.images-box');

            $($.parseHTML('<img>')).attr('src', e.target.result).appendTo($($.parseHTML('<div>')).attr('class', 'image-item').appendTo('.images-box'));
            //$($.parseHTML('<i>')).addClass('fa fa-times').appendTo('image-item');

            // <div onclick="return confirm('Bạn thực sự muốn xóa?');" class="remove-btn"><i class="fa fa-times"></i></div>
          }
          reader.readAsDataURL(input.files[i]);
        }
      }
    }
    $('#avatar').on('change', function () {
      readURL(this);
    });
  });


  CKEDITOR.replace('description', {
    //đường dẫn đến file ckfinder.html của ckfinder
    filebrowserBrowseUrl: 'assets/ckfinder/ckfinder.html',
    //đường dẫn đến file connector.php của ckfinder
    filebrowserUploadUrl: 'assets/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files'
  });



  CKEDITOR.replace('content', {
    filebrowserBrowseUrl: 'assets/ckfinder/ckfinder.html',
    //đường dẫn đến file connector.php của ckfinder
    filebrowserUploadUrl: 'assets/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files'
  })

  $('.description').ckeditor({
    toolbar: 'Full',
    enterMode : CKEDITOR.ENTER_BR,
    shiftEnterMode: CKEDITOR.ENTER_P
  });

  $('.image-item img').mouseover(function () {
    var href = $(this).attr('src');
    $('.preview-box .preview-image img').attr('src', href);

    $('.preview-box .images-box .preview-image img').css({
      'height': $(this).attr('height', $(this).height())

    });


    var abc = $('.preview-box .preview-image img').attr('src');
    console.log(abc);

    $('.preview-box .preview-image').css({
      'visibility': 'visible',

    });

    // setInterval(function(){ 
    //   $('.preview-box .preview-image').css('visibility','hidden');
    // }, 5000);
  });

  $('.preview-box .preview-image', this).mouseout(function () {
    $('.preview-box .preview-image').css('visibility', 'hidden');

  });


  // $('.product-grid .product-image img').each(function(){
    // var width = this.width;
    // var height = this.height;

    // if (width > height){
    //   $(this).height(width);
    //   $(this).width(height);

    //   $(this).css('width', '100%');
      //$(this).css('height', '100%');
  //   }
  // });
  





  // ajax pagination

  $('.add').click(function (){
    var product_id = $(this).attr('data-id');
    // console.log(product_id);

    // $.ajax({
    //   method: get,
    //   url: 'index.php?controller=cart&action=add',
    //   data: {
    //     product_id : product_id
    //   },
    //   success: function (data){
    //     alert('Success');
    //   }
    // });
  });




  $('.page-item').click(function (){
    var page = $(this).text();
    
    var link = 'index.php?controller=home&action=index&page=';
    link += page;

    $('.test').load(link);
    
  });



  // end ajax pagination




 




});
