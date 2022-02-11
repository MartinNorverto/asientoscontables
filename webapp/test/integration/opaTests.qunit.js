/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require(["pampa/portalclientes/asientoscontables/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
