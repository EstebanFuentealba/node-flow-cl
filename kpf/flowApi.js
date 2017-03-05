const htmlentities = require('locutus/php/strings/htmlentities');
const crypto = require("crypto");
const fs = require("fs");

class flowAPI {
    constructor(options) {
        let defaults = {
            "FLOW_URL_EXITO": "http://www.comercio.cl/kpf/exito.php",
            "FLOW_URL_FRACASO": "http://www.comercio.cl/kpf/fracaso.php",
            "FLOW_URL_CONFIRMACION": "http://www.comercio.cl/kpf/confirma.php",
            "FLOW_URL_RETORNO": "http://www.comercio.cl",
            "FLOW_URL_PAGO": "http://flow.tuxpan.com/app/kpf/pago.php",
            "FLOW_KEY": "/keys",
            "FLOW_LOGPATH": "/logs",
            "FLOW_COMERCIO": "emailFlow@comercio.com",
            "FLOW_MEDIOPAGO": "9",
            "FLOW_TIPO_INTEGRACION": "f"
        };
        this.config = Object.assign({}, defaults, options );
    }
    flow_pack() {
		var tipo_integracion = encodeURIComponent(this.config.FLOW_TIPO_INTEGRACION);
		var comercio = encodeURIComponent(this.config.FLOW_COMERCIO);
		var orden_compra = encodeURIComponent(this.order.OrdenNumero);
		var monto = encodeURIComponent(this.order.Monto);
		var medioPago = encodeURIComponent(this.order.MedioPago);
		var email = encodeURIComponent(this.order.Pagador);

        var hConcepto = htmlentities(this.order.Concepto);
        if (!hConcepto) hConcepto = htmlentities(this.order.Concepto, 2, 'UTF-8');
        if (!hConcepto) hConcepto = htmlentities(this.order.Concepto, 2, 'ISO-8859-1');
        if (!hConcepto) hConcepto = `Orden de Compra ${orden_compra}`;
		var concepto = encodeURIComponent(hConcepto);
		
		var url_exito = encodeURIComponent(this.config.FLOW_URL_EXITO);
		var url_fracaso = encodeURIComponent(this.config.FLOW_URL_FRACASO);
		var url_confirmacion = encodeURIComponent(this.config.FLOW_URL_CONFIRMACION);
		var url_retorno = encodeURIComponent(this.config.FLOW_URL_RETORNO);


        var p = `c=${comercio}&oc=${orden_compra}&mp=${medioPago}&m=${monto}&o=${concepto}&ue=${url_exito}&uf=${url_fracaso}&uc=${url_confirmacion}&ti=${tipo_integracion}&e=${email}&v=kit_1_4&ur=${url_retorno}`;
        
		var signature = this.flow_sign(p);
		return p + `&s=${signature}`;

    }
    flow_sign(data) {
        var privateKey = fs.readFileSync(`${this.config.FLOW_KEY}`,"utf8");
        var signature = encodeURIComponent(crypto.createSign('sha256').update(data).sign(privateKey,"base64"));   
		return signature;
	}
    new_order(orden_compra, monto,  concepto, email_pagador, medioPago = "Non") {
		if(medioPago == "Non") {
			medioPago = this.config.FLOW_MEDIOPAGO;
		}
		this.order.OrdenNumero = orden_compra;
		this.order.Concepto = concepto;
		this.order.Monto = monto;
		this.order.MedioPago = medioPago;
		this.order.Pagador = email_pagador;
		return this.flow_pack();
	}

}
module.exports = flowAPI;