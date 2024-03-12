/* eslint-disable */
import { booleanAttribute, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { FormInput } from '../../../abstract/form-input.abstract';
import { FormControlComponent } from '../form-control/form-control.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  imports: [
    FormControlComponent,
    ReactiveFormsModule
  ],
  standalone: true
})
export class InputComponent extends FormInput {
  @Input() withError: boolean = true;
  @Input() showError: boolean = true;
  @Input() title: string = '';
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input() control: UntypedFormControl | any = new UntypedFormControl();
  @Input({ transform: booleanAttribute }) readonly: boolean = false;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() patternType: string = '';
  @Input() maxlength: number = 5000;
  @Input() onlyDigits: boolean = false;

  @ViewChild('input') input: ElementRef;
  @Output() changeEvent = new EventEmitter();

  required() {
    return this.control && this.control.hasValidator(Validators.required);
  }

  email() {
    return this.control && this.control.hasValidator(Validators.email);
  }

  onChange() {
    this.changeEvent.emit();
  }

  onKeyPress(evt: any) {
    if (this.disabled || this.readonly) {
      evt.preventDefault();
      return false;
    }

    if (this.onlyDigits) {
      let charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode < (48) || charCode > 57) {
        evt.preventDefault();
        return false;
      }
    }
    this.changeEvent.emit();
    return true;
  }
}
