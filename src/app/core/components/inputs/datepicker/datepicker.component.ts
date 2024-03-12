import { Component, Input } from '@angular/core';
import { FormControlComponent } from '../form-control/form-control.component';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInput, MatSuffix } from '@angular/material/input';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [
    FormControlComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatepickerInput,
    MatInput,
    MatDatepicker,
    MatSuffix,
    ReactiveFormsModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss'
})
export class DatepickerComponent {
  @Input() control: UntypedFormControl | any = new UntypedFormControl();
  @Input() withError: boolean = true;
  @Input() title: string = '';
  @Input() showError: boolean = true;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() placeholder: string = ''
}
