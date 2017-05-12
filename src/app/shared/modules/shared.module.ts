import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusDirective } from '../directives/focus.directive';
import { EqualValidator } from '../directives/equal-validator.directive';
import { DateformatPipe } from '../pipes/dateformat.pipe';
import { ReversePipe } from '../pipes/reverse.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FocusDirective,
    EqualValidator,
    DateformatPipe,
    ReversePipe
  ],
  exports: [
    FocusDirective,
    EqualValidator,
    DateformatPipe,
    ReversePipe
  ]
})
export class SharedModule { }
