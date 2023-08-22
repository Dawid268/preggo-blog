import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';

const materials = [
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  FlexLayoutModule,
  MatCardModule,
];
@NgModule({
  imports: [CommonModule, ...materials],
  exports: [...materials],
})
export class MaterialModule {}
