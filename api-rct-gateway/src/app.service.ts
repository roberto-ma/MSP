import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getError401() {
    return `
      <html>
      <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
              <title>MSP</title>
      
              <link rel="stylesheet" href="https://aplicaciones.msp.gob.ec/salud/lib/css/salud.css">
      
      
          </head>
      <body>
              <div id="pagina"> 
                  <div id="header">
                      <div class="fila">
                          <div id="divNombreAplicacion" style="float: right;margin-top:40px;"> 
                              Ministerio de Salud Pública
                          </div>
                      </div>
                  </div>
                  <div id="cuerpo" style="background-color: #FFFFFF;">
            
                      <div class="fila" style="text-align: right; height: 500px;">
                          <div class="celda" style="width: 65%; text-align: center; vertical-align: middle;">
                              <img src="https://aplicaciones.msp.gob.ec/salud/lib/img/super_sanito.png" style="width: 300px;height: 350px;">
                          </div>
                          <div class="celda" style="width: 35%;">
                              <div style="height: 250px; font-size: 26px; padding-top: 163px;"> Error 401: Unautorized <br><br> </div>
                              
                          </div>
                      </div>
                  </div>
                  <div id="footer">
                      <div>
                          <hr>
                          <p style="text-align: center;"> Derechos reservados 2018 <br>Ministerio de Salud Pública del Ecuador</p>
                      </div>
                  </div>
              </div>
      
      
             </body>
      </html>
      `;
  }
}
