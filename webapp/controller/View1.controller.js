sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
        var oController;
        return Controller.extend("pampa.portalclientes.asientoscontables.controller.View1", {
            onInit: function () {

            },

            onPress: function (oEvent){
                var nroDocumento = oEvent.getSource().getBindingContext().getProperty("NroDocumento"),
                    sociedad = oEvent.getSource().getBindingContext().getProperty("Sociedad"),
                    Ejercicio = oEvent.getSource().getBindingContext().getProperty("Ejercicio");
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteDetalleAsientos", {
                    Sociedad: sociedad,
                    Ejercicio: Ejercicio,
                    NroDocumento: nroDocumento,
                });
            },
        });
    });
