sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast) {
        "use strict";
        var oController;
        return Controller.extend("pampa.portalclientes.asientoscontables.controller.DetalleAsientos", {
        onInit: function (){
            oController = this;
            oController.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oController.oRouter.attachRouteMatched(oController._onRouteMatched, oController);
            var oViewModel;
            oViewModel = new JSONModel({
                detailCount: 0,
                attatchmentCount: 0,
                bindingPath: null,
                nroDocDetail: null,
                sociedadDetail: null,
                ejercicioDetail: null,
            });
            this.getView().setModel(oViewModel, "detailModel");
        },
        
        _onRouteMatched: function (oEvent){
            var NroDocumento = oEvent.getParameter("arguments").NroDocumento;
            var Sociedad = oEvent.getParameter("arguments").Sociedad;
            var Ejercicio = oEvent.getParameter("arguments").Ejercicio;

            this._setCabecera(NroDocumento,Sociedad,Ejercicio);

            if (NroDocumento && Sociedad && Ejercicio)
            {
                var oModel = this.getView().getModel();
                var sPath = oModel.createKey("/AsientosSet", {
                    Sociedad: Sociedad,
                    NroDocumento: NroDocumento,
                    Ejercicio: Ejercicio,
				});
                oModel = this.getView().getModel();
                var sPath2 = sPath + "/ToPosiciones";
                this.getView().getModel("detailModel").setProperty("/bindingPath", sPath2);
				oModel.read(sPath2, {
					error: function (error) {
						var mensaje = "Error al obtener cabecera de " + NroDocumento;
						MessageToast.show(mensaje);
					}
				});
            }
        },
        _setCabecera: function (NroDocumento,Sociedad,Ejercicio) {
			this.getView().getModel("detailModel").setProperty("/nroDocDetail", NroDocumento);
			this.getView().getModel("detailModel").setProperty("/sociedadDetail", Sociedad);
            this.getView().getModel("detailModel").setProperty("/ejercicioDetail", Ejercicio);
		},
        onTableUpdateFinished: function (){
            var oModel = this.getView().getModel("detailModel");
            var detailNumber = this.getView().byId("tablaDetalle").getBinding("items").getLength();
            oModel.setProperty("/detailCount", detailNumber);
        },
        });
    });