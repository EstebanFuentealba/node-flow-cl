# node-flow-cl
NodeJS package para la integración de pagos con Flow (https://www.flow.cl)

# usage

```javascript
const Flow = require("node-flow-cl");
var flowAPI = new Flow({
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
});
var flow_pack = flowAPI.new_order("123", "4500", "", "efuentealba@json.cl");

//  use flow_pack in form post
```