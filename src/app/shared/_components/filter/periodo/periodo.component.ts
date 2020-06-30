import { AdministracaoService } from './../../../../core/services/administracao.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, ptBrLocale } from 'ngx-bootstrap/chronos';
import * as moment from 'moment/moment';
import { IListaFranqueadoPerfil } from 'src/app/shared/interfaces/lista-franqueado-perfil.interface';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'ft-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.scss'],
})
export class PeriodoComponent implements OnInit {
  @Output() periodoFilterEmit = new EventEmitter();

  public formPeriodo: FormGroup;
  public items: IListaFranqueadoPerfil[];

  constructor(private localeService: BsLocaleService) {}

  ngOnInit(): void {
    this.formPeriodo = new FormGroup({
      dataInicio: new FormControl(moment(new Date()).format('DD/MM/YYYY')),
      dataFim: new FormControl(
        moment(new Date()).add(1, 'M').format('DD/MM/YYYY')
      ),
      codigoFranqueado: new FormControl(),
    });

    this.localeService.use('pt-br');
  }

  handleFilter() {
    const { dataInicio, dataFim, codigoFranqueado } = this.formPeriodo.value;
    this.periodoFilterEmit.emit({
      dataInicio: moment(dataInicio, 'DD/MM/YYYY').format('MM/DD/YYYY'),
      dataFim: moment(dataFim, 'DD/MM/YYYY').format('MM/DD/YYYY'),
      codigoFranqueado,
    });
  }
}