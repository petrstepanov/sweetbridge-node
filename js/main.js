$(document).ready(function() {
  // Gets the video src from the data-src on each button
  var $videoSrc;
  $('.video-btn').click(function() {
      $videoSrc = $(this).data( "src" );
  });

  // When the modal is opened autoplay it
  $('#myModal').on('shown.bs.modal', function (e) {
    // Set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
    $("#video").attr('src',$videoSrc + "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1" );
  });

  // stop playing the youtube video when I close the modal
  $('#myModal').on('hide.bs.modal', function (e) {
      // a poor man's stop video
      $("#video").attr('src',$videoSrc);
  });

  // Switch jumbotron images
  // $('.jumbotron-sweetbridge').click(function(){
  //   $(this).toggleClass('jumbotron-sweetbridge--mod');
  // });

  // Initialize swiper
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
});
