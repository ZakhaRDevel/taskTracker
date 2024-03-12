import { Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { FormInput } from '../../../abstract/form-input.abstract';
import { ErrorReplacePipe } from '../../../pipe/error-replace.pipe';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrl: './form-control.component.scss',
  imports: [
    ErrorReplacePipe,
    NgClass
  ],
  standalone: true
})
export class FormControlComponent extends FormInput {
  @Input() withError: boolean = false;
  @Input() title: string = '';
  @Input() control: UntypedFormControl = new UntypedFormControl();
  @Input() placeholder: string = '';
  @Input() showErrors: boolean = true;
  @Input() variant: string = '';
  @Input() typeError: string = '';
}
