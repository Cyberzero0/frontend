
/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
VISUALIZAR LA CESTA DEL CARRITO DE COMPRAS
=============================================*/

if(localStorage.getItem("cantidadCesta") != null){

	$(".cantidadCesta").html(localStorage.getItem("cantidadCesta"));
	$(".sumaCesta").html(localStorage.getItem("sumaCesta"));

}else{

	$(".cantidadCesta").html("0");
	$(".sumaCesta").html("0");
}
/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
VISUALIZAR LOS PRODUCTOS EN LA PÁGINA CARRITO DE COMPRAS
=============================================*/
if(localStorage.getItem("listaProductos") != null){

	var listaCarrito = JSON.parse(localStorage.getItem("listaProductos"));
}else{

	$(".cuerpoCarrito").html('<div class="well">Aún no hay productos en el carrito de compras.</div>');
	$(".sumaCarrito").hide();
	$(".cabeceraCheckout").hide();
}

for(var i = 0; i < indice.length; i++){

	if(indice[i] == "carrito-de-compras"){

	listaCarrito.forEach(funcionForEach);

		function funcionForEach(item, index){

			var datosProducto = new FormData();
			var precio = 0;

			datosProducto.append("id", item.idProducto);

			$.ajax({

				url:rutaOculta+"ajax/producto.ajax.php",
				method:"POST",
				data: datosProducto,
				cache: false,
				contentType: false,
				processData:false,
				dataType: "json",
				success: function(respuesta){

					if(respuesta["precioOferta"] == 0){

						precio = respuesta["precio"];

					}else{

						precio = respuesta["precioOferta"];
						
					}

					$(".cuerpoCarrito").append(

						'<div clas="row itemCarrito">'+
							
							'<div class="col-sm-1 col-xs-12">'+
								
								'<br>'+

								'<center>'+
									
									'<button class="btn btn-default backColor quitarItemCarrito" idProducto="'+item.idProducto+'" peso="'+item.peso+'">'+
										
										'<i class="fa fa-times"></i>'+

									'</button>'+

								'</center>'+	

							'</div>'+
							'<div class="col-sm-1 col-xs-12">'+
								
								'<figure>'+
									
									'<img src="'+item.imagen+'" class="img-thumbnail">'+

								'</figure>'+

							'</div>'+

							'<div class="col-sm-4 col-xs-12">'+

								'<br>'+

								'<p class="tituloCarritoCompra text-left">'+item.titulo+'</p>'+

							'</div>'+

							'<div class="col-md-2 col-sm-1 col-xs-12">'+

								'<br>'+

								'<p class="precioCarritoCompra text-center">MXN $<span>'+precio+'</span></p>'+

							'</div>'+

							'<div class="col-md-2 col-sm-3 col-xs-8">'+

								'<br>'+	

								'<div class="col-xs-8">'+

									'<center>'+
									
										'<input type="number" class="form-control cantidadItem" min="1" value="'+item.cantidad+'" tipo="'+item.tipo+'" precio="'+precio+'" idProducto="'+item.idProducto+'" item="'+index+'">'+	

									'</center>'+

								'</div>'+

							'</div>'+

							'<div class="col-md-2 col-sm-1 col-xs-4 text-center">'+
								
								'<br>'+

								'<p class="subTotal'+index+' subtotales">'+
									
									'<strong>MXN $<span>'+(Number(item.cantidad)*Number(precio))+'</span></strong>'+

								'</p>'+

							'</div>'+
							
						'</div>'+

						'<div class="clearfix"></div>'+

						'<hr>');

					/*=============================================
					EVITAR MANIPULAR LA CANTIDAD EN PRODUCTOS VIRTUALES
					=============================================*/

					$(".cantidadItem[tipo='virtual']").attr("readonly","true");

					// /*=============================================
					// /*=============================================
					// /*=============================================
					// /*=============================================
					// /*=============================================
					// ACTUALIZAR SUBTOTAL
					// =============================================*/
					var precioCarritoCompra = $(".cuerpoCarrito .precioCarritoCompra span");

					cestaCarrito(precioCarritoCompra.length);

					sumaSubtotales();
				}
			})
		}

	}
}
/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
AGREGAR AL CARRITO
=============================================*/

$(".agregarCarrito").click(function(){

	var idProducto = $(this).attr("idProducto");
	var imagen = $(this).attr("imagen");
	var titulo = $(this).attr("titulo");
	var precio = $(this).attr("precio");
	var tipo = $(this).attr("tipo");
	var peso = $(this).attr("peso");

	var agregarAlCarrito = true;

	/*=============================================
	CAPTURAR DETALLES
	=============================================

	if(tipo == "virtual"){

		agregarAlCarrito = true;

	}else{

		var seleccionarDetalle = $(".seleccionarDetalle");
		
		for(var i = 0; i < seleccionarDetalle.length; i++){

			console.log("seleccionarDetalle", $(seleccionarDetalle[i]).val());

			if($(seleccionarDetalle[i]).val() == ""){

				swal({
					  title: "Debe seleccionar Talla y Color",
					  text: "",
					  type: "warning",
					  showCancelButton: false,
					  confirmButtonColor: "#DD6B55",
					  confirmButtonText: "¡Seleccionar!",
					  closeOnConfirm: false
					})

				return;

			}else{

				titulo = titulo + "-" + $(seleccionarDetalle[i]).val();

				agregarAlCarrito = true;

			}

		}		

	}*/

	/*=============================================
	ALMACENAR EN EL LOCALSTARGE LOS PRODUCTOS AGREGADOS AL CARRITO
	=============================================*/

	if(agregarAlCarrito){

		/*=============================================
		RECUPERAR ALMACENAMIENTO DEL LOCALSTORAGE
		=============================================*/

		if(localStorage.getItem("listaProductos") == null){

			listaCarrito = [];

		}else{

			var listaProductos = JSON.parse(localStorage.getItem("listaProductos"));

			for(var i = 0; i < listaProductos.length; i++){

				if(listaProductos[i]["idProducto"] == idProducto && listaProductos[i]["tipo"] == "virtual"){

					swal({
					  title: "El producto ya está agregado al carrito de compras",
					  text: "",
					  type: "warning",
					  showCancelButton: false,
					  confirmButtonColor: "#DD6B55",
					  confirmButtonText: "¡Volver!",
					  closeOnConfirm: false
					})

					return;

				}

			}

			listaCarrito.concat(localStorage.getItem("listaProductos"));

		}

		listaCarrito.push({"idProducto":idProducto,
						   "imagen":imagen,
						   "titulo":titulo,
						   "precio":precio,
					       "tipo":tipo,
				           "peso":peso,
				           "cantidad":"1"});

		localStorage.setItem("listaProductos", JSON.stringify(listaCarrito));

		/*=============================================
		ACTUALIZAR LA CESTA
		=============================================*/

		var cantidadCesta = Number($(".cantidadCesta").html()) + 1;
		var sumaCesta = Number($(".sumaCesta").html()) + Number(precio);

		$(".cantidadCesta").html(cantidadCesta);
		$(".sumaCesta").html(sumaCesta);

		localStorage.setItem("cantidadCesta", cantidadCesta);
		localStorage.setItem("sumaCesta", sumaCesta);
		
		/*=============================================
		MOSTRAR ALERTA DE QUE EL PRODUCTO YA FUE AGREGADO
		=============================================*/

		swal({
			  title: "",
			  text: "¡Se ha agregado un nuevo producto al carrito de compras!",
			  type: "success",
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  cancelButtonText: "¡Continuar comprando!",
			  confirmButtonText: "¡Ir a mi carrito de compras!",
			  closeOnConfirm: false
			},
			function(isConfirm){
				if (isConfirm) {	   
					 window.location = rutaOculta+"carrito-de-compras";
				} 
		});

	}

})

/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
QUITAR PRODUCTOS DEL CARRITO
=============================================*/

$(document).on("click", ".quitarItemCarrito", function(){

	$(this).parent().parent().parent().remove();

	var idProducto = $(".cuerpoCarrito button");
	var imagen = $(".cuerpoCarrito img");
	var titulo = $(".cuerpoCarrito .tituloCarritoCompra");
	var precio = $(".cuerpoCarrito .precioCarritoCompra span");
	var cantidad = $(".cuerpoCarrito .cantidadItem");

	/*=============================================
	SI AÚN QUEDAN PRODUCTOS VOLVERLOS AGREGAR AL CARRITO (LOCALSTORAGE)
	=============================================*/

	listaCarrito = [];

	if(idProducto.length != 0){

		for(var i = 0; i < idProducto.length; i++){

			var idProductoArray = $(idProducto[i]).attr("idProducto");
			var imagenArray = $(imagen[i]).attr("src");
			var tituloArray = $(titulo[i]).html();
			var precioArray = $(precio[i]).html();
			var pesoArray = $(idProducto[i]).attr("peso");
			var tipoArray = $(cantidad[i]).attr("tipo");
			var cantidadArray = $(cantidad[i]).val();

			listaCarrito.push({"idProducto":idProductoArray,
						   "imagen":imagenArray,
						   "titulo":tituloArray,
						   "precio":precioArray,
					       "tipo":tipoArray,
				           "peso":pesoArray,
				           "cantidad":cantidadArray});

		}

		localStorage.setItem("listaProductos",JSON.stringify(listaCarrito));

		sumaSubtotales();
		cestaCarrito(listaCarrito.length);


	}else{

		/*=============================================
		SI YA NO QUEDAN PRODUCTOS HAY QUE REMOVER TODO
		=============================================*/	

		localStorage.removeItem("listaProductos");

		localStorage.setItem("cantidadCesta","0");
		
		localStorage.setItem("sumaCesta","0");

		$(".cantidadCesta").html("0");
		$(".sumaCesta").html("0");

		$(".cuerpoCarrito").html('<div class="well">Aún no hay productos en el carrito de compras.</div>');
		$(".sumaCarrito").hide();
		$(".cabeceraCheckout").hide();

	}

})

/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
GENERAR SUBTOTAL DESPUES DE CAMBIAR CANTIDAD
=============================================*/
$(document).on("change", ".cantidadItem", function(){

	var cantidad = $(this).val();
	var precio = $(this).attr("precio");
	var idProducto = $(this).attr("idProducto");
	var item = $(this).attr("item");

	$(".subTotal"+item).html('<strong>MXN $<span>'+(cantidad*precio)+'</span></strong>');

	/*=============================================
	ACTUALIZAR LA CANTIDAD EN EL LOCALSTORAGE
	=============================================*/

	var idProducto = $(".cuerpoCarrito button");
	var imagen = $(".cuerpoCarrito img");
	var titulo = $(".cuerpoCarrito .tituloCarritoCompra");
	var precio = $(".cuerpoCarrito .precioCarritoCompra span");
	var cantidad = $(".cuerpoCarrito .cantidadItem");

	listaCarrito = [];

	for(var i = 0; i < idProducto.length; i++){

			var idProductoArray = $(idProducto[i]).attr("idProducto");
			var imagenArray = $(imagen[i]).attr("src");
			var tituloArray = $(titulo[i]).html();
			var precioArray = $(precio[i]).html();
			var pesoArray = $(idProducto[i]).attr("peso");
			var tipoArray = $(cantidad[i]).attr("tipo");
			var cantidadArray = $(cantidad[i]).val();

			listaCarrito.push({"idProducto":idProductoArray,
						   "imagen":imagenArray,
						   "titulo":tituloArray,
						   "precio":precioArray,
					       "tipo":tipoArray,
				           "peso":pesoArray,
				           "cantidad":cantidadArray});

		}

		localStorage.setItem("listaProductos",JSON.stringify(listaCarrito));

		sumaSubtotales();
		cestaCarrito(listaCarrito.length);
})


/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
SUMA DE TODOS LOS SUBTOTALES
=============================================*/
function sumaSubtotales(){

	var subtotales = $(".subtotales span");
	var arraySumaSubtotales = [];
	
	for(var i = 0; i < subtotales.length; i++){

		var subtotalesArray = $(subtotales[i]).html();
		arraySumaSubtotales.push(Number(subtotalesArray));
		
	}

	
	function sumaArraySubtotales(total, numero){

		return total + numero;

	}

	var sumaTotal = arraySumaSubtotales.reduce(sumaArraySubtotales);
	
	$(".sumaSubTotal").html('<strong>MXN $<span>'+(sumaTotal).toFixed(2)+'</span></strong>');

	$(".sumaCesta").html((sumaTotal).toFixed(2));

	localStorage.setItem("sumaCesta", (sumaTotal).toFixed(2));


}

/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
ACTUALIZAR CESTA AL CAMBIAR CANTIDAD
=============================================*/
function cestaCarrito(cantidadProductos){

	/*=============================================
	SI HAY PRODUCTOS EN EL CARRITO
	=============================================*/

	if(cantidadProductos != 0){
		
		var cantidadItem = $(".cuerpoCarrito .cantidadItem");

		var arraySumaCantidades = [];
	
		for(var i = 0; i < cantidadItem .length; i++){

			var cantidadItemArray = $(cantidadItem[i]).val();
			arraySumaCantidades.push(Number(cantidadItemArray));
			
		}
	
		function sumaArrayCantidades(total, numero){

			return total + numero;

		}

		var sumaTotalCantidades = arraySumaCantidades.reduce(sumaArrayCantidades);
		
		$(".cantidadCesta").html(sumaTotalCantidades );
		localStorage.setItem("cantidadCesta", sumaTotalCantidades);

	}

}

/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
CHECKOUT
=============================================*/

$("#btnCheckout").click(function(){

	$(".listaProductos table.tablaProductos tbody").html("");

	$("#checkPaypal").prop("checked",true);
	$("#checkMP").prop("checked", false);

	var idUsuario = $(this).attr("idUsuario");
	var peso = $(".cuerpoCarrito button, .comprarAhora button");
	var titulo = $(".cuerpoCarrito .tituloCarritoCompra, .comprarAhora .tituloCarritoCompra");
	var cantidad = $(".cuerpoCarrito .cantidadItem, .comprarAhora .cantidadItem");
	var subtotal = $(".cuerpoCarrito .subtotales span, .comprarAhora .subtotales span");
	var tipoArray =[];
	var cantidadPeso = [];

	/*=============================================
	SUMA SUBTOTAL
	=============================================*/

	var sumaSubTotal = $(".sumaSubTotal span")
	
	$(".valorSubtotal").html($(sumaSubTotal).html());
	$(".valorSubtotal").attr("valor",$(sumaSubTotal).html());

	/*=============================================
	TASAS DE IMPUESTO
	=============================================*/

	var impuestoTotal = ($(".valorSubtotal").html() * $("#tasaImpuesto").val()) /100;
	
	$(".valorTotalImpuesto").html((impuestoTotal).toFixed(2));
	$(".valorTotalImpuesto").attr("valor",(impuestoTotal).toFixed(2));

	sumaTotalCompra();

	/*=============================================
	TASAS DE ENVIO
	=============================================*/

	$(".valorTotalEnvio").html($("#envioNacional").val());
	$(".valorTotalEnvio").attr("valor", $("#envioNacional").val());

	sumaTotalCompra();

	/*=============================================
	VARIABLES ARRAY 
	=============================================*/

	for(var i = 0; i < titulo.length; i++){

		var pesoArray = $(peso[i]).attr("peso");
		var tituloArray = $(titulo[i]).html();
		var cantidadArray = $(cantidad[i]).val();		
		var subtotalArray = $(subtotal[i]).html();

		/*=============================================
		MOSTRAR PRODUCTOS DEFINITIVOS A COMPRAR
		=============================================*/

		$(".listaProductos table.tablaProductos tbody").append('<tr>'+
															   '<td class="valorTitulo">'+tituloArray+'</td>'+
															   '<td class="valorCantidad">'+cantidadArray+'</td>'+
															   '<td>$<span class="valorItem" valor="'+subtotalArray+'">'+subtotalArray+'</span></td>'+
															   '<tr>');


	}
})

/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
SUMA TOTAL DE LA COMPRA
=============================================*/
function sumaTotalCompra(){

	var sumaTotalTasas = Number($(".valorSubtotal").html())+ 
	                     Number($(".valorTotalEnvio").html())+ 
	                     Number($(".valorTotalImpuesto").html());


	$(".valorTotalCompra").html((sumaTotalTasas).toFixed(2));
	$(".valorTotalCompra").attr("valor",(sumaTotalTasas).toFixed(2));

	localStorage.setItem("total",hex_md5($(".valorTotalCompra").html()));
}

/*=============================================
/*=============================================
/*=============================================
/*=============================================
MÉTODO DE PAGO PARA CAMBIO DE DIVISA
=============================================*/

var metodoPago = "paypal";
//divisas(metodoPago);

$("input[name='pago']").change(function(){

	var metodoPago = $(this).val();

	//divisas(metodoPago);

	$(".btnPagar").click(function(){

	if (metodoPago == "mp"){

		//$(".btnPagar").hide();
		//$(".formMP").show();
		$("#modalCheckout").hide();
		pagaConMP();

	}else if(metodoPago == "paypal"){

		//$(".btnPagar").show();
		//$(".formPayu").hide();

		pagaConPP();

	}

	})

})
/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
BOTÓN PAGAR PAYPAL $(".btnPagar").click(function(){
=============================================*/
function pagaConPP(){

	var divisa = $("#cambiarDivisa").val();

	var total = $(".valorTotalCompra").html();

	var totalEncriptado = localStorage.getItem("total");
	var impuesto = $(".valorTotalImpuesto").html();

	var envio = $(".valorTotalEnvio").html();

	var subtotal = $(".valorSubtotal").html();

	var titulo = $(".valorTitulo");

	var cantidad = $(".valorCantidad");

	var valorItem = $(".valorItem");
	var idProducto = $('.cuerpoCarrito button, .comprarAhora button');

	var tituloArray = [];
	var cantidadArray = [];
	var valorItemArray = [];
	var idProductoArray = [];

	for(var i = 0; i < titulo.length; i++){

		tituloArray[i] = $(titulo[i]).html();
		
		cantidadArray[i] = $(cantidad[i]).html();
		
		valorItemArray[i] = $(valorItem[i]).html();
		
		idProductoArray[i] = $(idProducto[i]).attr("idProducto");
		

	}

	var datos = new FormData();

	datos.append("divisa", divisa);
	datos.append("total",total);
	datos.append("totalEncriptado",totalEncriptado);
	datos.append("impuesto",impuesto);
	datos.append("envio",envio);
	datos.append("subtotal",subtotal);
	datos.append("tituloArray",tituloArray);
	datos.append("cantidadArray",cantidadArray);
	datos.append("valorItemArray",valorItemArray);
	datos.append("idProductoArray",idProductoArray);

	$.ajax({
		 url:rutaOculta+"ajax/carrito.ajax.php",
		 method:"POST",
		 data: datos,
		 cache: false,
         contentType: false,
         processData: false,
         success:function(respuesta){
         	   	
               window.location = respuesta;

         }

	})
}

/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
BOTÓN PAGAR PAYU
=============================================*/

function pagarConPayu(){

	var divisa = $("#cambiarDivisa").val();

	var total = $(".valorTotalCompra").html();

	var impuesto = $(".valorTotalImpuesto").html();

	var envio = $(".valorTotalEnvio").html();

	var subtotal = $(".valorSubtotal").html();

	var titulo = $(".valorTitulo");

	var cantidad = $(".valorCantidad");

	var valorItem = $(".valorItem");
	var idProducto = $('.cuerpoCarrito button, .comprarAhora button');

	var tituloArray = [];
	var cantidadArray = [];
	var valorItemArray = [];
	var idProductoArray = [];

	for(var i = 0; i < titulo.length; i++){

		tituloArray[i] = $(titulo[i]).html();
		
		cantidadArray[i] = $(cantidad[i]).html();
		
		valorItemArray[i] = $(valorItem[i]).html();
		
		idProductoArray[i] = $(idProducto[i]).attr("idProducto");
		

	}

	var valorItemString = valorItemArray.toString();
	var pago = valorItemString.replace(",","-");

	var datos = new FormData();
	datos.append("metodoPago", "payu");

	if(hex_md5(total) == localStorage.getItem("total")){

			$.ajax({
			      url:rutaOculta+"ajax/carrito.ajax.php",
			      method:"POST",
			      data: datos,
			      cache: false,
			      contentType: false,
			      processData: false,
			      success:function(respuesta){

			      	var merchantId = JSON.parse(respuesta).merchantIdPayu;
			      	var accountId = JSON.parse(respuesta).accountIdPayu;
			        var apiKey = JSON.parse(respuesta).apiKeyPayu;
			        var modo = JSON.parse(respuesta).modoPayu;
			        var description = tituloArray.toString();
			        var referenceCode = (Number(Math.ceil(Math.random()*1000000))+Number(total).toFixed());
			        var productosToString = idProductoArray.toString();
			        var productos = productosToString.replace(/,/g, "-");
			        var cantidadToString = cantidadArray.toString();
			        var cantidad = cantidadToString.replace(/,/g, "-");
			        var signature = hex_md5(apiKey+"~"+merchantId+"~"+referenceCode+"~"+total+"~"+divisa);

			        var taxReturnBase = (total - impuesto).toFixed(2);

			        if(modo == "sandbox"){
			      	
			      	var url = "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu";
			      	var test = 1;
			      
			      }else{

			      	  	var url = "https://gateway.payulatam.com/ppp-web-gateway/";
			      	  	var test = 0;
			      }

			      	 $(".formPayu").attr("method","POST");
			         $(".formPayu").attr("action",url);
			         	$(".formPayu input[name='merchantId']").attr("value", merchantId);
					   $(".formPayu input[name='accountId']").attr("value", accountId);
					   $(".formPayu input[name='description']").attr("value", description);
					   $(".formPayu input[name='referenceCode']").attr("value", referenceCode);
					   $(".formPayu input[name='amount']").attr("value", total);
					   $(".formPayu input[name='tax']").attr("value", impuesto); //MONTO DEL IMPUESTO
					   $(".formPayu input[name='taxReturnBase']").attr("value", taxReturnBase); //MONTO DE LA COMPRA SIN IMPUESTO
					   $(".formPayu input[name='shipmentValue']").attr("value", envio);
					   $(".formPayu input[name='currency']").attr("value", divisa);
					   $(".formPayu input[name='responseUrl']").attr("value", rutaOculta+"index.php?ruta=finalizar-compra&payu=true&productos="+productos+"&cantidad="+cantidad+"&pago="+pago);
					   $(".formPayu input[name='declinedResponseUrl']").attr("value", rutaOculta+"carrito-de-compras");
					   //$(".formPayu input[name='displayShippingInformation']").attr("value", tipoEnvio);
					   $(".formPayu input[name='test']").attr("value", test);
					   $(".formPayu input[name='signature']").attr("value", signature);
			      }
			 })
	}
}

/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
BOTÓN PAGAR MP
=============================================*/

function pagaConMP(){

	var total = $(".valorTotalCompra").html();

    const mercadopago = new MercadoPago('TEST-9c88ffe6-8a31-47b5-9f04-b721b3efbfd6');

	var formMP = `

                <form id="form-checkout" >

                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="far fa-credit-card"></i></span>
                        </div>
                        <input class="form-control" name="cardNumber" id="form-checkout__cardNumber" />
                    </div>

                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text">CVV/CVC</span>
                        </div>
                        <input class="form-control" name="CVV" id="form-checkout__CVV" />
                    </div>

                    <div class="form-row">
                        
                        <div class="col">

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                  <span class="input-group-text">MM</span>
                                </div>
                                <input class="form-control" name="expirationMonth" id="form-checkout__expirationMonth" />
                            </div>

                        </div>

                        <div class="col">

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                  <span class="input-group-text">AAAA</span>
                                </div>
                                 <input class="form-control" name="expirationYear" id="form-checkout__expirationYear" />
                            </div>

                        </div>

                    </div>

                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i class="far fa-user"></i></span>
                        </div>
                        <input class="form-control" name="cardholderName" id="form-checkout__cardholderName"/>
                    </div>

                    <div class="input-group mb-3">
                        
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-university"></i></span>
                        </div>

                        <select class="form-control" name="issuer" id="form-checkout__issuer"></select>

                    </div>

                    <select class="form-control mb-3" name="docType" id="form-checkout__docType"></select>

                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-id-card"></i></span>
                        </div>

                        <input class="form-control" name="docValue" id="form-checkout__docValue"/>

                    </div>

                    <select class="form-control mb-3" name="installments" id="form-checkout__installments"></select>

                    <button type="submit" class="btn btn-primary btn-lg btn-block" id="form-checkout__submit">Pay</button>

                </form>`;

                //fncSweetAlert("html", formMP, null);

                const cardForm = mercadopago.cardForm({
                     amount: total,
                     autoMount: true,
                     form: {
                         id: 'form-checkout',
                         cardholderName: {
                             id: 'form-checkout__cardholderName',
                             placeholder: 'Nombre completo',
                         },
                         cardNumber: {
                             id: 'form-checkout__cardNumber',
                             placeholder: 'Número de la tarjeta',
                         },
                         CVV: {
                             id: 'form-checkout__CVV',
                             placeholder: 'Código de seguridad',
                         },
                         installments: {
                             id: 'form-checkout__installments',
                             placeholder: 'Cuotas'
                         },
                         expirationMonth: {
                             id: 'form-checkout__expirationMonth',
                             placeholder: 'Mes'
                         },
                         expirationYear: {
                             id: 'form-checkout__expirationYear',
                             placeholder: 'Año'
                         },
                         docType: {
                             id: 'form-checkout__docType',
                             placeholder: 'Tipo de documento'
                         },
                         docValue: {
                             id: 'form-checkout__docValue',
                             placeholder: 'Número de documento'
                         },
                         issuer: {
                             id: 'form-checkout__issuer',
                             placeholder: 'Banco emisor'
                         }
                     },
       
                     callbacks: {
                        onFormMounted: function(error) {
                            if (error) return SweetAlert("error", `The transaction has been canceled`, null);
                        },
                        onCardTokenReceived: function(error, token) {
                            if (error) return SweetAlert("error", `The transaction has been canceled`, null);

                            const formData = cardForm.getCardFormData()
                           
                            formData.then( resp=>{

                                var response = resp;

                                response["total"] = newTotal;
                                
                                newOrder("mercado-pago", "test", null, response);

                            })
                        },
                    }
                 })

                 document.getElementById('form-checkout').addEventListener('submit', function(e) {
                     e.preventDefault();
                     cardForm.createCardToken()
                })
}

/*
swal({
			  title: "",
			  text: "¡Se ha agregado un nuevo producto al carrito de compras!",
			  type: "success",
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  cancelButtonText: "¡Continuar comprando!",
			  confirmButtonText: "¡Ir a mi carrito de compras!",
			  closeOnConfirm: false
			},
			function(isConfirm){
				if (isConfirm) {	   
					 window.location = rutaOculta+"carrito-de-compras";
				} 
		});
*/