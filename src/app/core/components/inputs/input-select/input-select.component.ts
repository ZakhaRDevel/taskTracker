import { booleanAttribute, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { FormInput } from '../../../abstract/form-input.abstract';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormControlComponent } from '../form-control/form-control.component';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.scss',
  imports: [
    FormControlComponent,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class InputSelectComponent extends FormInput {
  @Input() items: object[] = [];
  @Input() multiple:boolean= false;
  @Input() control: UntypedFormControl | any = new UntypedFormControl();
  @Input() title: string = '';
  @Input() withError: boolean = true;
  @Input() showError: boolean = true;
  @Input() placeholder: string = '';
  @Input() bindValue: string
  @Input() bindLabel: string = 'title';
  @Input() isInvalid!: boolean;
  @Input() showPlaceholderTop: boolean = false;
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input({ transform: booleanAttribute }) readonly: boolean = false;
  @Input({ transform: booleanAttribute }) searchable: boolean = false;
  @Output() selectEvent: EventEmitter<any> = new EventEmitter<any>();
  search = '';

  onSelect($event: any) {
    this.selectEvent.emit($event);
  }

  customSearchFn(term: string, item: any) {
    return item['title'] &&
      item['title'].toLowerCase().indexOf(term.toLowerCase()) > -1;
  }
}
