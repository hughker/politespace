/* global Politespace:true */
(function( $ ) {
	"use strict";

	// jQuery Plugin

	var componentName = "politespace",
		initSelector = "[data-" + componentName + "]";

	$.fn[ componentName ] = function(){
		return this.each( function(){
			var $t = $( this );
			if( $t.data( componentName ) ) {
				return;
			}

			var polite = new Politespace( this );
			if( polite.useProxy() ) {
				polite.createProxy();
			}


			$( this )
				.bind( "politespace-hide-proxy", function() {
					$( this ).closest( ".politespace-proxy" ).removeClass( "active" );
				})
				.bind( "politespace-show-proxy", function() {
					$( this ).closest( ".politespace-proxy" ).addClass( "active" );

					if( polite.useProxy() ) {
						polite.update();
						polite.updateProxy();
					}
				})
				.bind( "input keydown", function() {
					polite.updateProxy();
				})
				.bind( "blur", function() {
					polite.update();

					if( polite.useProxy() ){
						$( this ).closest( ".politespace-proxy" ).addClass( "active" );
						polite.updateProxy();
					}
				})
				.bind( "focus", function() {
					$( this ).closest( ".politespace-proxy" ).removeClass( "active" );
					polite.reset();
				})
				.data( componentName, polite );

			polite.update();
		});
	};

	// auto-init on enhance (which is called on domready)
	$( document ).bind( "enhance", function( e ) {
		var $sel = $( e.target ).is( initSelector ) ? $( e.target ) : $( initSelector, e.target );
		$sel[ componentName ]();
	});

}( jQuery ));
