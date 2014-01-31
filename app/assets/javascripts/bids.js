# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

(function(){
  var Streamauction = window.Streamauction = new Object();  
  (Streamauction._init = function(){
    Streamauction.source = new EventSource('/bids/events');
    var _s = Streamauction.source;
    
    _s.addEventListener( 'bid', function(e){
      var _b = $.parseJSON(e.data);
      console.dir( _b );
      $('#chat').append($("<li>" + _b.amount));
      $('#chat').animate({ scrollTop: $('#chat').prop('scrollHeight') - $('#chat').height() }, 400);
      new app.clearBidInputs(_b.connection_id);
    }, false);    
  }());

  $(function(){
    var _ele = $('#bid_amount'),
        _eleh = $('#bid_connection_id'),
        _store = window.sessionStorage || null;
    
    var app = window.app = {
      clearBidInputs: function(connection_id){
        if( connection_id == _store.connection_id ){
          _ele.val('');
        }
      },
      setConnectionId: function(){
        console.log( _store );
        if( !!_store && typeof _store.connectionId === 'undefined' ){
          var rand = Math.round( Math.random() * 100000000 );
          _store.connection_id = rand;
        }
        return _eleh.val(_store.connection_id);
      }()
    };
  });

}(window));


