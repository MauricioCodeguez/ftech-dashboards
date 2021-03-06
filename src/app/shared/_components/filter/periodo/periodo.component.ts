import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import * as moment from 'moment/moment'
import { defineLocale, ptBrLocale } from 'ngx-bootstrap/chronos'
import { BsLocaleService } from 'ngx-bootstrap/datepicker'
import { IListaFranqueadoPerfil } from 'src/app/shared/interfaces/lista-franqueado-perfil.interface'
defineLocale('pt-br', ptBrLocale)

@Component({
  selector: 'ft-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.scss'],
})
export class PeriodoComponent implements OnInit {
  @Output() periodoFilterEmit = new EventEmitter()

  public formPeriodo: FormGroup
  public items: IListaFranqueadoPerfil[]
  public submitted = false

  constructor(private localeService: BsLocaleService) {
    this.formPeriodo = new FormGroup({
      dataInicio: new FormControl(
        moment(new Date()).subtract(1, 'M').format('DD/MM/YYYY'),
        [Validators.required]
      ),
      dataFim: new FormControl(moment(new Date()).format('DD/MM/YYYY'), [
        Validators.required,
      ]),
      codigoFranqueado: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.localeService.use('pt-br')
  }

  handleFilter() {
    this.submitted = true
    if (!this.formPeriodo.valid) {
      return
    }

    this.submitted = false

    const { dataInicio, dataFim, codigoFranqueado } = this.formPeriodo.value
    this.periodoFilterEmit.emit({
      dataInicio: moment(dataInicio, 'DD/MM/YYYY').format('MM/DD/YYYY'),
      dataFim: moment(dataFim, 'DD/MM/YYYY').format('MM/DD/YYYY'),
      codigoFranqueado,
    })
  }

  isFieldValid(field: string) {
    return !this.formPeriodo.get(field).valid && this.submitted
  }
}
