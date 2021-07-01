import { Component, OnInit } from '@angular/core';
import { Text } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: string;

  constructor() { }

  ngOnInit() {
    this.changeContent('historia');
  }

  changeContent(value) {
    switch (value) {
      case 'historia':
        // tslint:disable-next-line:max-line-length
        this.content = "El centro infantil “San Antonio” se origina a partir de la necesidad social, identicado por Padres y algunas señoras voluntarias que prestaban servicio en el área de Acción Social Católica del instituto Maryknoll fue entonces que en el año 1969 se abre las puertas por primera vez al público, más especificamente a personas de bajos recursos económicos, inicialmente con el nombre de Oficina de la Empleada del Hogar.\n" + 
        "\n Al observar la iniciativa la Honorable Municipalidad de Cochabamba el año 1983 (OM 2767) concedió en calidad de comodato y uso del suelo un bie inmueble de dos plantas, ubicado sobre la calle Tarat N° 116, esquina Av. Ayacucho."+ 
        'Con el transcurso de los años la institución se fue fortaleciendo, cambiado de alguna forma sus fines y objetivos iniciales y direccionando la atención para empleadas domésticas, a medida que el tiempo fue transcurriendo se identificó que hijos/as de comerciantes de la zona la Kancha San Antonio se encontraban en una situación vulerable (bajo el sol, poca atención, poco movimiento, mala alimentación, etc.) al no tener donde dejar a sus hijos los padres de familia los llevaban consigo a su fuente laboral, que en muchos casos no era apropiado para la estancia de un menor y mucho menos para cubrir las demandas que su cuidado implica, por lo que el año 2002 fue creado la guardería "Kantutita" direccionado especificamente para este sector.'
        + 'El año 2010 la Guardería firma un convenio de colaboración con la Parroquia "San Antonio" a partir de entonces se cambia el nombre a Centro Infantil "San Antonio". El 2 de agosto de 2016 por decreto Departamental de Cochabamba N° 2531 es extinguida la personería jurídica de la Oficina de la Empleada del Hogar y de acuerdo a los estatutos y el convenio Parroquial asumen la administración del Centro Infantil los padres Carmelitas Descalzos.';
        break;
      case 'mision':
        this.content = 'Contribuir al desarrollo integral de los niños/as prestando un servicio de calidad que promueva una educación activa y abierta, formándole en valores morales, éticos y culturales que le ayuden a desarrollar su potencial personal, trabajando conjuntamente con la familia con la finalidad de buscar una armonia en su formación personal fomentando los valores critsianos.';
        break;
      case 'vision':
        this.content = 'Ser un centro de referencia en calidad educativa para la comunidad de Cercado por medio del cuidado y la educación integral en los niños/as, logrando una identidad de pertenencia en nuestros niños/as y educadoras.';
        break;
    }
  }

}
